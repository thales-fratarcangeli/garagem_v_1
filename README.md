# Concessionária — site de veículos

[![Deploy](https://github.com/thales-fratarcangeli/garagem_v_1/actions/workflows/deploy-github-pages.yml/badge.svg)](https://github.com/thales-fratarcangeli/garagem_v_1/actions/workflows/deploy-github-pages.yml) ![Next.js](https://img.shields.io/badge/Next.js-15-000000?logo=nextdotjs&logoColor=white) ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white) ![Tailwind](https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?logo=tailwindcss&logoColor=white)

Site de uma concessionária, **mobile-first**, com página inicial e listagem de
veículos com filtros avançados. Gerado como site estático e publicado no
GitHub Pages.

**🔗 Demo:** https://thales-fratarcangeli.github.io/garagem_v_1/

## Funcionalidades

- **Home:** carrossel de destaques próprio (sem bibliotecas pesadas), categorias,
  notícias e chamada para venda do veículo
- **Listagem `/carros`** com filtros reativos — a lista atualiza na hora:
  - condição, marca, ano, preço e quilometragem (sliders duplos)
  - itens de série, cor, portas, final da placa e combustível
  - ordenação por relevância, preço, km e ano
- **Mobile:** menu hambúrguer e filtros em drawer lateral com "Ver X resultados"
- **Acessibilidade:** componentes sobre Radix UI (padrão shadcn/ui)

## Stack

Next.js 15 (App Router, `output: "export"`) · React 19 · TypeScript ·
Tailwind CSS 3 · Radix UI / shadcn/ui · lucide-react · GitHub Actions

## Estrutura

```
app/
├── page.tsx               Home
└── carros/page.tsx        listagem com filtros
components/
├── home/                  carrossel, categorias, notícias, CTA
├── carros/                painel e drawer de filtros, card e grade de resultados
├── layout/                header e footer
└── ui/                    componentes base (button, sheet, slider, select...)
lib/
├── mock-cars.ts           veículos de exemplo
├── filter-options.ts      opções dos filtros
└── car-filters.ts         applyFilters, sortCars, countActiveFilters
```

A cor da marca fica centralizada em `brand-{50..900}` no `tailwind.config.ts`:
trocar a identidade visual é editar um bloco só.

## Rodando localmente

```bash
npm install
npm run dev          # http://localhost:3000
```

Build estático (gera `out/`):

```bash
# PowerShell: $env:NEXT_PUBLIC_BASE_PATH="garagem_v_1"; npm run build
NEXT_PUBLIC_BASE_PATH=garagem_v_1 npm run build
```

O deploy é automático: cada push na `main` dispara o workflow
`deploy-github-pages.yml`, que faz o build e publica `out/` no GitHub Pages.

## Próximos passos

- [ ] Página de detalhe do veículo, contato e "venda seu carro"
- [ ] API real no lugar de `lib/mock-cars.ts`
- [ ] Filtros persistidos na URL para compartilhar buscas
- [ ] Fotos reais com `next/image`
