# FIT.AI (Front)

O FIT.AI e uma aplicacao mobile-first para pessoas que querem treinar com consistencia. Ela combina uma experiencia de treino diario (o que fazer hoje, como fazer, e registrar conclusao) com acompanhamento visual de consistencia (heatmap/streak) e um coach por chat para ajudar no onboarding e na criacao de planos.

Este repositorio (`bootcamp-treinos-front`) e o front-end em Next.js (App Router) que consome a `bootcamp-treinos-api`.

## Produto

O app e centrado em 3 coisas:

- **Treino do dia**: a home mostra o treino planejado para hoje e leva direto para a pagina de exercicios.
- **Consistencia**: um tracker visual mostra dias iniciados/concluidos e a sequencia atual (streak).
- **Coach AI**: um chat que orienta o usuario e pode ajudar a montar um plano (via integracao com a rota `/ai` no backend).

## Features

- **Autenticacao**: login via Google (Better Auth), sessao baseada em cookie.
- **Onboarding**: coleta dados basicos (peso/altura/idade/% gordura) e garante que existe plano ativo antes de liberar a home.
- **Home**: saudacao, consistencia semanal, streak e card do treino de hoje com imagem/tempo/exercicios.
- **Planos**: visualizar plano ativo e dias da semana, com detalhes do dia e lista de exercicios.
- **Sessao de treino**: iniciar treino e concluir treino (gera/atualiza sessoes no backend).
- **Stats**: heatmap de consistencia no periodo e cards com metricas (tempo total, treinos feitos, taxa de conclusao, streak).
- **Chat**: chat embutido no onboarding e chat “overlay” em outras telas, com mensagens sugeridas.

## Tecnologias

- **Next.js 16** (App Router) + **React 19**
- **TailwindCSS v4** + **shadcn/ui** (Radix + class-variance-authority)
- **better-auth** (client) para sessao e login social
- **Orval** (client gerado) consumindo o Swagger da API
- **AI SDK** (`@ai-sdk/react` + `ai`) para UX de chat e streaming
- **zod** + **react-hook-form** para formularios (chat input)
- **nuqs** para estado via querystring (abrir/fechar chat, mensagens iniciais)

## Arquitetura (como o app se organiza)

- `app/`: rotas (Next App Router)
- `app/_lib/auth-client.ts`: client do Better Auth apontando para `NEXT_PUBLIC_API_URL`
- `app/_lib/api/fetch-generated/`: client Orval (fetch) gerado a partir de `/swagger.json`
- `app/_lib/fetch.ts`: mutator do Orval (inclui cookies e `credentials: "include"`)
- `app/_components/`: componentes reutilizaveis (bottom nav, chat, consistencia, cards)

Pontos importantes do fluxo:

- A maioria das paginas principais sao **Server Components** e validam sessao no servidor via `authClient.getSession({ headers })`.
- Se nao houver sessao: redireciona para `/auth`.
- Se houver sessao mas faltar onboarding/plano ativo: redireciona para `/onboarding`.
- A consistencia e o streak sao lidos da API (home/stats) e renderizados no front.

## Rotas principais

- `/auth`: tela de login (Google)
- `/onboarding`: chat embutido para orientar o usuario e destravar o uso
- `/`: home (treino do dia + consistencia)
- `/stats`: estatisticas + heatmap + streak
- `/profile`: perfil + logout
- `/workout-plans/:id`: detalhes do plano
- `/workout-plans/:id/days/:dayId`: pagina do treino do dia (exercicios + iniciar/concluir)

## Variaveis de ambiente

Arquivo: `bootcamp-treinos-front/.env`

```bash
NEXT_PUBLIC_API_URL=http://localhost:8080
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

- `NEXT_PUBLIC_API_URL`: base URL da API (precisa bater com o `PORT` da API).
- `NEXT_PUBLIC_BASE_URL`: base URL do front (usado no callback do login social).

## Rodar localmente

Requisitos:

- pnpm + Node
- API rodando e acessivel

Comandos:

```bash
pnpm install
pnpm dev
```

Abre em `http://localhost:3000`.

## Client gerado (Orval)

O client e gerado a partir do Swagger da API:

- Config: `orval.config.ts`
- Output: `app/_lib/api/fetch-generated/index.ts`
- Mutator: `app/_lib/fetch.ts`

Para regenerar apos mudar a API:

```bash
pnpm exec orval
```

## Troubleshooting

- `ECONNREFUSED` / `TypeError: fetch failed`:
  - API nao esta rodando, ou `NEXT_PUBLIC_API_URL` aponta para a porta errada.
  - Se o erro for em `authClient.getSession`, normalmente e API fora do ar.
- Login Google nao volta pro app:
  - confira no backend `FRONTEND_URL` (CORS) e `trustedOrigins` (Better Auth).
  - confira no Google Cloud as URLs autorizadas de callback do Better Auth.
- Imagens em cards:
  - `next/image` exige hosts remotos permitidos em `next.config.ts`.
  - para imagens locais, use paths como `/home-banner.jpg` (em `public/`).
