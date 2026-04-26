# Handoff — Concessionária (Site + Deploy VPS Locaweb)

> Documento para outra IA / dev assumir o projeto. Lê isso primeiro antes de qualquer coisa.

## Visão geral

Estamos construindo o site de uma concessionária. Duas partes:

1. **Frontend (PRONTO)** — Next.js 15 + TS + Tailwind + shadcn/ui, com 2 telas implementadas: Home (`/`) e Lista de Carros (`/carros`). Build de produção testado e passando.
2. **Deploy em VPS da Locaweb (EM ANDAMENTO — BLOQUEADO)** — falhou no SSH por possível fail2ban; precisa retomar.

O usuário se comunica em **português**. Sempre responder em pt-BR.

---

## Parte 1 — Frontend (concluído)

### Stack escolhida
- Next.js 15.1.4 (App Router) + React 19 + TypeScript
- Tailwind CSS 3 (não v4) — tokens em [tailwind.config.ts](tailwind.config.ts) (cor `brand` = azul `#2563eb`)
- Componentes acessíveis sobre Radix UI (padrão shadcn/ui), criados manualmente em [components/ui/](components/ui/)
- lucide-react para ícones
- **Sem libs de carrossel pesadas** — carrossel próprio em [components/home/hero-carousel.tsx](components/home/hero-carousel.tsx)

### Decisões importantes
- **Paleta**: azul + branco (cor primária `bg-brand-500`). Tokens centralizados, trocar paleta = editar `tailwind.config.ts`.
- **Mobile-first**: foi a especificação do usuário ("predominantemente celular"). Header vira hambúrguer em `<lg`, filtros viram drawer (`Sheet`) em `<lg`.
- **Placeholders de mídia**: usuário NÃO quer imagens reais ainda. Componente `<MediaPlaceholder label="..." aspect="..." />` em [components/common/media-placeholder.tsx](components/common/media-placeholder.tsx) marca cada local com label descritivo (ex: "Banner principal 1", "Foto Honda HR-V"). Quando o usuário enviar imagens, basta substituir por `<Image />` do next/image.
- **Carros mock**: 14 carros em [lib/mock-cars.ts](lib/mock-cars.ts) só pra ter conteúdo nos filtros. Substituir por API real depois.
- **Filtros 100% client-side**: estado em `useState` no [app/carros/page.tsx](app/carros/page.tsx), filtragem em [lib/car-filters.ts](lib/car-filters.ts) (`applyFilters`, `sortCars`, `countActiveFilters`).

### Estrutura
```
versao_nena/
├── app/
│   ├── layout.tsx            # RootLayout: Header + Footer + main
│   ├── page.tsx              # Home
│   ├── carros/page.tsx       # Lista de carros (client component)
│   └── globals.css           # Tailwind + variáveis CSS
├── components/
│   ├── layout/{header,footer}.tsx
│   ├── home/{hero-carousel,categories-grid,news-grid,sell-cta}.tsx
│   ├── carros/{filters-panel,filters-drawer,car-card,results-grid}.tsx
│   ├── common/media-placeholder.tsx
│   └── ui/{button,sheet,accordion,checkbox,slider,input,select,card,badge}.tsx
├── lib/
│   ├── utils.ts              # cn(), formatBRL(), formatKm()
│   ├── mock-cars.ts          # 14 carros fake
│   ├── filter-options.ts     # BRANDS, FUELS, COLORS, etc.
│   └── car-filters.ts        # CarFilters type, DEFAULT_FILTERS, applyFilters, sortCars
├── types/car.ts
├── tailwind.config.ts
├── tsconfig.json
├── next.config.ts
├── postcss.config.mjs
├── components.json           # config shadcn
├── package.json
└── README.md
```

### Páginas implementadas

#### Home (`/`)
- `HeroCarousel` — autoplay 5s, pausa no hover, dots clicáveis, setas em ≥sm. 3 slides com placeholders.
- `CategoriesGrid` — 6 categorias (SUV, Sedan, Hatch, Picape, Elétrico, Esportivo). Grid 2→3→6 cols.
- `NewsGrid` — 3 cards de notícias com placeholder de capa.
- `SellCta` — faixa azul "Quer vender seu carro?".

#### Lista de Carros (`/carros`)
- Layout grid `[280px_1fr]` em `lg+`, single column em mobile.
- Filtros (todos em `Accordion`):
  - Condição (Novo/Usado) — checkboxes
  - Marca (9 marcas) — checkboxes
  - Ano — 2 selects (De/Até)
  - Preço — slider duplo + inputs `min`/`max`
  - Quilometragem — slider duplo + inputs
  - Itens (9 features) — checkboxes
  - Cor (8 cores com swatch) — chips
  - Portas (2/4) — chips
  - Final da placa (0–9) — chips
  - Combustível (Flex/Gasolina/Diesel/Híbrido/Elétrico) — checkboxes
- Ordenação: relevância, menor preço, maior preço, menor km, mais novo
- Mobile: filtro vira `Sheet` lateral via `FiltersDrawer` (com badge contador)
- Estado vazio com ícone `SearchX` quando filtros zeram resultados

### Como rodar localmente
```bash
npm install
npm run dev
# build de produção (já testado, passa):
npm run build
npm run start
```

### O que ainda NÃO foi feito (combinado com o usuário)
- Backend / API real
- Páginas: detalhe do carro (`/carros/[id]`), vender, serviços, login, contato
- Auth real
- Imagens reais (esperando o usuário enviar)
- SEO avançado, analytics, i18n, testes

---

## Parte 2 — Deploy na VPS Locaweb

### ⚠️ INCIDENTE DE SEGURANÇA — 26/abr/2026 13:30

A primeira tentativa de deploy foi concluída com sucesso (~12:45) e o site entrou no ar.
Cerca de **9 minutos depois (12:54)** a VPS foi comprometida via brute-force SSH:

- Senha root antiga (`sdjfhsdhj@#AS2`) era fraca/descartável e foi exposta em chat e arquivos locais → **deve ser tratada como QUEIMADA, nunca mais usar**
- Atacante instalou `xmrig` (criptominer Monero — pool `pool.supportxmr.com`) rodando como root
- Auth log mostrava centenas de tentativas de brute-force/min de IPs diversos (45.148.10.141, 87.251.64.145, 92.118.39.197, 213.209.159.159, 92.118.39.196, 2.57.122.x...) — fail2ban NÃO estava ativo na VPS
- Login bem-sucedido detectado vindo de `189.15.225.117` (não confirmado se era usuário ou atacante)
- Processo suspeito `cloudflared tunnel --url http://localhost:5000` (PID 806) rodando desde antes do deploy — provável canal C2 do atacante (usuário não reconheceu)
- Logs do PM2 mostravam outputs de comandos shell aparecendo como `digest` em `NEXT_REDIRECT` (saídas de `wget xmrig.tar.gz`, `tar xzf`, `ps -ef | grep xmrig`)

**Decisão (combinada com usuário)**: reinstalar o SO via painel da Locaweb. Quando uma máquina é comprometida com root, não dá pra confiar em nada (rootkit/PAM modificado/binários trocados são possibilidades reais).

### Estado pós-incidente
- ✅ xmrig morto via `pkill -9 -f xmrig`
- ✅ Arquivos `.bat` locais com senha apagados (`C:\temp_deploy\ssh_*.bat`, `test_ssh.bat`, `ssh_input.txt`)
- ⏳ Aguardando usuário reinstalar SO via painel Locaweb
- ⏳ Refazer deploy com hardening (ver checklist abaixo)

### Dados da VPS (Locaweb Public Cloud)
- **Painel**: https://painel.locaweb.com.br/
- **Domínio**: `vps65559.publiccloud.com.br`
- **IP Público**: `191.252.101.138`
- **Usuário SSH**: `root` (após reinstalar; idealmente migrar pra usuário não-root)
- **Senha SSH**: ❌ **NÃO COLOCAR EM TEXTO PLANO AQUI** — após reinstalar, peça ao usuário em mensagem efêmera, configure chave SSH e desabilite senha
- **Zona**: vps
- **OS**: Ubuntu 24.04.3 LTS (kernel 6.8.0)
- **Hardware**: ~454MB RAM + 1GB swap (limitado, mas suficiente pra Next.js + nginx)
- **HTTPS**: não vai ter inicialmente (domínio `*.publiccloud.com.br` da Locaweb não permite emitir Let's Encrypt; quando o usuário tiver domínio próprio, usar Certbot)

### Checklist de segurança OBRIGATÓRIO no novo deploy
1. **Senha root forte** (20+ caracteres aleatórios, gerada por gerenciador, NUNCA em chat/arquivo)
2. **Chave SSH** (criar par no Windows com `ssh-keygen -t ed25519`, copiar `.pub` pra `~/.ssh/authorized_keys` na VPS via `ssh-copy-id` ou pscp)
3. **`/etc/ssh/sshd_config`**:
   ```
   PasswordAuthentication no
   PermitRootLogin prohibit-password   # ou 'no' se criar usuário não-root
   PubkeyAuthentication yes
   ```
   Reiniciar com `systemctl restart ssh`
4. **fail2ban**: `apt install -y fail2ban` + ativar jail `sshd` (default já é decente)
5. **UFW**: só portas 22, 80, 443 (já fazíamos)
6. **Idealmente**: usuário não-root pra rodar a app (ex: `appuser`), root só pra emergência
7. **Atualizações automáticas de segurança**: `apt install -y unattended-upgrades`

### Plano de deploy (combinado com o usuário)
1. ✅ Setup local (Next.js build OK)
2. ⏳ SSH na VPS, identificar OS
3. ⏳ Instalar Node 20+, PM2, Nginx
4. ⏳ Verificar/abrir porta 80 (`ufw allow 80/tcp` se for Ubuntu)
5. ⏳ Empacotar projeto (sem `node_modules`/`.next`) e enviar via `pscp`/`scp`
6. ⏳ Na VPS: `npm ci && npm run build && pm2 start npm --name concessionaria -- start && pm2 save && pm2 startup`
7. ⏳ Configurar Nginx reverse proxy (`:80` → `localhost:3000`)
8. ⏳ Validar em `http://vps65559.publiccloud.com.br`

### Forma de transferência combinada
**SCP direto da minha máquina pra VPS** (sem GitHub).

### Ferramentas instaladas na máquina local
- Node 22.22.0 + npm 11.6.2
- **PuTTY 0.83** (instalado via `winget install PuTTY.PuTTY`) → fornece `plink.exe` e `pscp.exe` em `C:\Program Files\PuTTY\` (já no PATH)
- OpenSSH nativo do Windows (`ssh`/`scp` em `C:\Windows\System32\OpenSSH\`)

### Tentativas e o que aconteceu
1. **Test-NetConnection na porta 22**: ✅ Funcionou (`TcpTestSucceeded: True`)
2. **Tentativa 1 — `echo y | plink -ssh -pw <senha> root@IP "..."`**: travou indefinidamente. Suspeita: PowerShell não envia o `y\n` corretamente pro plink quando usa pipeline.
3. **Tentativa 2 — `cmd /c 'echo y | plink ...'` via PowerShell**: PowerShell parseou `&&` no comando do servidor e quebrou. Substituí por `;` mas seguiu travando.
4. **Tentativa 3 — arquivo `.bat` com `echo y | plink ...`**: começou a dar `FATAL ERROR: Network error: Connection timed out`.
5. **Re-teste de conectividade**: `Test-NetConnection ... Port 22` agora retorna **`False`**.

**Diagnóstico provável**: fail2ban (ou similar) na VPS Locaweb baniu temporariamente o IP da minha máquina depois das primeiras tentativas falhadas. Tipicamente desbloqueia em 5–15 min.

### Como retomar (próximos passos para a IA que pegar isso)

**Antes de qualquer coisa**, testar conectividade:
```powershell
Test-NetConnection -ComputerName 191.252.101.138 -Port 22 -InformationLevel Quiet
```
- Se `True` → tentar conectar de novo (ver abaixo).
- Se `False` → ainda banido. Esperar 10–15 min ou pedir pro usuário ir no painel da Locaweb e desbanir o IP do PC dele (caso haja essa opção).

**Como conectar (abordagem que funcionou)**:

```bat
:: NUNCA hardcodar senha. Apos chave SSH configurada, usar:
@echo off
"C:\Program Files\PuTTY\plink.exe" -ssh -batch -i C:\caminho\chave.ppk root@191.252.101.138 "uname -a"
```

> O `-batch` rejeita conexões com host key não cacheada. Pra primeiro contato, passar `-hostkey "SHA256:..."` no comando (fingerprint registrada na primeira conexão manual).

Se ainda travar:
- Tentar **sem `-batch`** e com `echo y |` (a primeira conexão precisa aceitar o host fingerprint).
- Tentar conectar manualmente no terminal **fora do agente** (interativamente) primeiro pra cachear a host key. O usuário pode rodar `plink -ssh root@191.252.101.138`, digitar `y` e a senha, sair. Depois agente usa `-batch`.
- Alternativa: usar `ssh` nativo do Windows + `sshpass` via WSL, ou pedir pro usuário fornecer a saída de comandos e a IA orienta.

**Quando conectar com sucesso, executar este pipeline na VPS** (provável Ubuntu):

```bash
# 1. Atualizar pacotes
apt update && apt upgrade -y

# 2. Instalar Node 20 (NodeSource)
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt install -y nodejs

# 3. Instalar Nginx e PM2
apt install -y nginx
npm install -g pm2

# 4. Firewall — abrir 80 (e manter 22)
ufw allow OpenSSH
ufw allow 80/tcp
ufw --force enable

# 5. Criar pasta da app
mkdir -p /var/www/concessionaria
```

**Empacotar e enviar do Windows**:

```powershell
# 1. Limpar artefatos pesados antes de enviar
Remove-Item -Recurse -Force node_modules, .next -ErrorAction SilentlyContinue

# 2. Compactar tudo (PowerShell tem Compress-Archive nativo)
Compress-Archive -Path * -DestinationPath C:\temp_deploy\app.zip -Force

# 3. Enviar via pscp (use chave SSH, nao senha)
pscp -i C:\caminho\chave.ppk C:\temp_deploy\app.zip root@191.252.101.138:/var/www/concessionaria/app.zip
```

**Na VPS, finalizar deploy**:

```bash
cd /var/www/concessionaria
apt install -y unzip
unzip -o app.zip
rm app.zip
npm ci
npm run build
pm2 start npm --name concessionaria -- start
pm2 save
pm2 startup systemd -u root --hp /root  # exibe um comando, copiar e rodar
```

**Configurar Nginx reverse proxy**:

```bash
cat > /etc/nginx/sites-available/concessionaria <<'EOF'
server {
    listen 80;
    server_name vps65559.publiccloud.com.br 191.252.101.138;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
EOF

ln -sf /etc/nginx/sites-available/concessionaria /etc/nginx/sites-enabled/concessionaria
rm -f /etc/nginx/sites-enabled/default
nginx -t && systemctl restart nginx
```

**Validar**:
- Abrir `http://vps65559.publiccloud.com.br/` no navegador
- Abrir `http://vps65559.publiccloud.com.br/carros`
- Logs do app: `pm2 logs concessionaria`
- Logs do Nginx: `tail -f /var/log/nginx/{access,error}.log`

### Como atualizar o site depois (script futuro)

Criar um script `deploy.ps1` na raiz que:
1. Roda `npm run build` localmente (opcional — também dá pra buildar na VPS)
2. `Compress-Archive` excluindo `node_modules`, `.next`, `.git`
3. `pscp` pra `/var/www/concessionaria/`
4. `plink` rodando: `unzip -o app.zip && npm ci && npm run build && pm2 restart concessionaria`

Não foi criado ainda. Sugestão: criar quando o deploy inicial estiver funcionando.

### Riscos / pontos de atenção
- **Senha do root em chat e neste arquivo**: trocar depois do primeiro deploy. Ideal migrar pra chave SSH.
- **Sem HTTPS**: navegadores podem dar warning. Aceitar por enquanto. Quando o usuário comprar domínio próprio, usar Certbot.
- **PM2 vs systemd**: estamos usando PM2 (mais simples). Alternativa: criar service unit do systemd diretamente.
- **`npm run start` vs server standalone**: usei `npm run start` (modo padrão Next.js). Se quiser otimizar, configurar `output: 'standalone'` no `next.config.ts` e rodar só o `server.js` com Node. Não é necessário agora.
- **Tamanho do upload**: o projeto compactado sem `node_modules` deve ter <2MB. Rápido.
- **Mensagem de erro do PowerShell parseando `&&`**: ao montar comandos pra `cmd /c` ou `plink`, sempre passar a string em **aspas simples** ou escapar; ou usar `;` separador.

---

## Histórico de mensagens-chave do usuário

1. Pediu site de concessionária com 2 telas (Home + Lista de Carros), barra superior compartilhada (logo, Comprar, Vender, Serviços, Login, Contato), filtros laterais com sub-opções, mobile-first.
2. Escolheu paleta **azul + branco** e stack **TypeScript + shadcn/ui + lucide**.
3. Aprovou o plano original (em [.cursor/plans/site_concessionária_-_telas_iniciais_1ec299be.plan.md](.cursor/plans/site_concessionária_-_telas_iniciais_1ec299be.plan.md)).
4. Disse pra subir na VPS Locaweb dele, achava que precisava de tunnel — esclareci que não.
5. ~~Forneceu senha por chat~~ → essa abordagem foi abandonada após o incidente de segurança. Daqui pra frente: chave SSH e senha forte gerenciada pelo usuário sem expor em chat.
6. Combinou: transferência por scp (sem GitHub), eu verifico firewall.
7. (Pós-incidente) Decidiu reinstalar VPS do zero ao invés de tentar limpeza manual.

---

## Estado dos to-dos (do plano original)

Todos completos:
- ✅ Inicializar projeto Next.js 15
- ✅ Configurar tokens de cor
- ✅ Header + Footer compartilhados
- ✅ MediaPlaceholder
- ✅ Home: HeroCarousel, CategoriesGrid, NewsGrid
- ✅ Mocks (types/car.ts, mock-cars.ts, filter-options.ts)
- ✅ FiltersPanel + FiltersDrawer
- ✅ CarCard + ResultsGrid + página /carros
- ✅ Responsividade
- ✅ README

Pendente (novo, fora do plano original):
- ⏳ Deploy na VPS Locaweb (bloqueado por fail2ban — aguardar destrava)
