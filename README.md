# Concessionária - Site (export estático / GitHub Pages)

Esta pasta é a variante **estática** do mesmo app em `versao_nena/`: gera a pasta `out/` com `next build` e `output: "export"`, pronta para o GitHub Pages. Não use `next start` após o build; sirva `out/` com qualquer host estático.

## Deploy no GitHub Pages

1. Crie um repositório cujo conteúdo em **raiz** seja esta pasta (ou suba esta pasta para a raiz do repo).
2. No GitHub: **Settings** → **Pages** → **Build and deployment** → **Source: GitHub Actions**.
3. Faça push na branch `main` (ou `master`); o workflow [`.github/workflows/deploy-github-pages.yml`](.github/workflows/deploy-github-pages.yml) faz `npm ci`, define `NEXT_PUBLIC_BASE_PATH` com o **nome do repositório** (para `https://<user>.github.io/<repo>/`) e publica `out/`.

**Domínio customizado / site na raiz** (`https://<user>.github.io/`): defina a variável de ambiente vazia no build (ou no workflow, `NEXT_PUBLIC_BASE_PATH: ""`).

### `NEXT_PUBLIC_BASE_PATH` (local)

- **Padrão (GitHub `…github.io/nome-do-repo/`)** — use o **nome do repo** (com ou sem barra inicial; o `next.config` normaliza):

  PowerShell: `$env:NEXT_PUBLIC_BASE_PATH="meu-repo"; npm run build`

  bash: `NEXT_PUBLIC_BASE_PATH=meu-repo npm run build`

- **Sem prefixo (raiz do domínio)** — omita a variável ou deixe vazia, depois `npm run build`.

Testar: `npx --yes serve out` e abrir a URL que o `serve` indicar. Com `basePath` (ex.: repositório `meu-repo`), o app responde em `http://localhost:3000/meu-repo` (a pasta `out` em disco continua com `index.html` e `img/` na raiz; o primeiro segmento da URL imita o GitHub Pages).

---

Site institucional + busca de carros para uma concessionária. Esta entrega contempla apenas as **telas** (UI), sem backend.

> Implementação focada em mobile-first, responsividade e fácil manutenção. Áreas de mídia (banners, ícones, fotos de carros) são exibidas como placeholders para serem preenchidos depois.

## Stack

- [Next.js 15](https://nextjs.org/) — App Router
- [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS 3](https://tailwindcss.com/) com tokens de cor centralizados
- Componentes acessíveis sobre [Radix UI](https://www.radix-ui.com/) (padrão shadcn/ui)
- [lucide-react](https://lucide.dev/) para ícones

## Como rodar

Requisitos: Node.js 20+ (testado com Node 22).

```bash
npm install
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000).

Para gerar o export estático (pasta `out/`):

```bash
npm run build
```

Nesta variante, **não** use `next start` (não há servidor Node em produção). Para pré-visualizar: `npx --yes serve out`.

## Páginas implementadas

| Rota | Arquivo | Descrição |
|------|---------|-----------|
| `/` | [app/page.tsx](app/page.tsx) | Home com carrossel automático, categorias e notícias |
| `/carros` | [app/carros/page.tsx](app/carros/page.tsx) | Lista de carros com filtros laterais (drawer no mobile) |

Ambas compartilham o mesmo header e footer definidos em [app/layout.tsx](app/layout.tsx).

## Estrutura de pastas

```
.
├── app/
│   ├── layout.tsx           # Layout raiz (header + footer)
│   ├── page.tsx             # Home
│   ├── carros/page.tsx      # Lista de carros
│   └── globals.css          # Variáveis de tema + Tailwind
├── components/
│   ├── layout/              # Header e Footer compartilhados
│   ├── home/                # Componentes da home (carrossel, categorias, notícias, CTA)
│   ├── carros/              # Filtros (painel + drawer), card e grid de resultados
│   ├── common/              # MediaPlaceholder (área reservada para imagens)
│   └── ui/                  # Componentes base (Button, Sheet, Accordion, etc.)
├── lib/
│   ├── utils.ts             # cn(), formatBRL(), formatKm()
│   ├── mock-cars.ts         # Lista mock de ~14 carros
│   ├── filter-options.ts    # Opções dos filtros (marcas, cores, combustíveis…)
│   └── car-filters.ts       # Tipos, defaults, applyFilters() e sortCars()
├── types/
│   └── car.ts               # Tipos de domínio (Car, CarFuel, CarColor…)
├── tailwind.config.ts       # Paleta brand (azul) e tokens
└── components.json          # Config shadcn/ui
```

## Onde colocar suas imagens / ícones

Todos os pontos onde o usuário precisa adicionar mídia usam o componente
[`MediaPlaceholder`](components/common/media-placeholder.tsx). Cada ocorrência
tem um `label` que descreve exatamente o que entra ali. Procure pelo componente
no projeto para localizar e substituir:

- `Banner principal 1/2/3` — slides do carrossel da home
- `Ícone SUV/Sedan/Hatch/...` — ícones das categorias
- `Capa notícia 1/2/3` — capas dos cards de notícia
- `Foto {marca} {modelo}` — fotos dos carros na lista
- `LOGO` — logos no header e footer (no momento são divs com texto)

Quando for substituir por imagens reais, troque `<MediaPlaceholder ... />` por
`<Image src=... alt=... fill className="object-cover" />` do `next/image`.

## Paleta / tema

A cor principal (azul) está centralizada como `brand-{50..900}` em
[`tailwind.config.ts`](tailwind.config.ts). Para mudar a identidade visual
basta editar esse bloco — todos os componentes usam essas classes
(`bg-brand-500`, `text-brand-600`, etc.).

## Filtros disponíveis em `/carros`

- Condição (Novo / Usado)
- Marca (multi-seleção)
- Ano (faixa de "De" / "Até")
- Preço (slider duplo + inputs)
- Quilometragem (slider duplo + inputs)
- Itens (Ar-condicionado, ABS, Multimídia, etc.)
- Cor (chips com swatch)
- Portas (2 / 4)
- Final da placa (0–9)
- Combustível (Flex, Gasolina, Diesel, Híbrido, Elétrico)
- Ordenação (relevância, preço, km, ano)

Os filtros são reativos: a lista atualiza imediatamente conforme o usuário
seleciona opções. Em mobile, abrem em um drawer lateral com botão "Ver X resultados".

## Próximos passos sugeridos (não implementados)

- Páginas internas: detalhe do carro, vender, serviços, login, contato
- Backend / API real para listar carros (substituir `lib/mock-cars.ts`)
- Persistir filtros na URL (search params) para compartilhar buscas
- Integrar autenticação (NextAuth, Clerk, etc.)
- Imagens reais via `next/image` + CDN
- Métricas (Vercel Analytics) e SEO avançado
