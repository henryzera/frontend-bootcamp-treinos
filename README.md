# Bootcamp Treinos (Front)

Aplicacao web em Next.js (App Router) que consome a `bootcamp-treinos-api`.

## Stack

- Next.js 16 (React 19)
- TailwindCSS v4 + shadcn/ui
- Better Auth (client)
- Orval (client gerado para a API)
- AI SDK (chat em `app/_components/chat.tsx`)

## Requisitos

- Node.js + pnpm
- API rodando e acessivel (por padrao `http://localhost:8080`)

## Rodar localmente

```bash
pnpm install
pnpm dev
```

Abre em `http://localhost:3000`.

## Variaveis de ambiente

Arquivo: `bootcamp-treinos-front/.env`

- `NEXT_PUBLIC_API_URL`: base da API (ex: `http://localhost:8080`)
- `NEXT_PUBLIC_BASE_URL`: base do front (ex: `http://localhost:3000`)

## Rotas principais

- `/auth`: login (Google via Better Auth)
- `/onboarding`: coleta/confirmacao de dados do usuario + chat embutido
- `/`: home (treino do dia + consistencia)
- `/stats`: estatisticas + streak + heatmap
- `/workout-plans/:id`: detalhes do plano
- `/workout-plans/:id/days/:dayId`: pagina do treino do dia

## Como a API e consumida

- O client Orval fica em `app/_lib/api/fetch-generated/`.
- `NEXT_PUBLIC_API_URL` aponta para a API; requests usam cookies (sessao) com `credentials: "include"`.

## Troubleshooting

- `ECONNREFUSED`/`TypeError: fetch failed`: API nao esta rodando ou `NEXT_PUBLIC_API_URL` esta apontando para a porta errada.
- Login Google falhando: confira `FRONTEND_URL` e `trustedOrigins` no backend e as URLs autorizadas no Google Cloud.
