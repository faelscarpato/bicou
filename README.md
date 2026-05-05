# Bicou Unificado

Projeto React unificado criado a partir da base Lovable, com melhorias pontuais inspiradas no protótipo GPT para o fluxo do prestador.

## Como rodar

```bash
npm install
npm run dev
```

Build de produção:

```bash
npm run build
```

Preview local do build:

```bash
npm run preview
```

## Stack

- Vite + React + TypeScript
- Tailwind CSS com tokens visuais da base Lovable
- shadcn/ui para componentes de interface
- lucide-react para ícones
- react-router-dom para rotas
- zustand com `persist` para estado local da demonstração
- TanStack Query mantido da base Lovable

## Arquitetura

- `src/App.tsx`: rotas públicas, empresa, prestador e admin.
- `src/components/AppShell.tsx`: shell por perfil, sidebar desktop e bottom-nav mobile por role.
- `src/components/ui`: componentes shadcn/ui herdados da base Lovable.
- `src/lib/store.ts`: estado persistido de bicos, favoritos, carteira demo, saques e flag de migração.
- `src/lib/bicoFilters.ts`: filtros e ordenação de bicos com saída pronta para futura consulta parametrizada.
- `src/lib/legacyMigration.ts`: migração única das chaves antigas `acceptedJobs` e `jobStatuses`.
- `src/lib/wallet.ts`: seleção e cálculo de saldo, recebíveis e pagamentos.
- `src/components/prestador/BicosAdvancedFilters.tsx`: filtros reativos por categoria, data, valor/hora e ordenação.
- `src/components/ThemeProvider.tsx` e `src/components/ThemeToggle.tsx`: alternância claro/escuro com classe Tailwind.
- `src/pages/prestador`: painel, bicos, check-in/out, carteira/histórico e perfil do prestador.
- `src/legacy_gpt`: registro da área temporária usada para documentar as referências do protótipo GPT.

## O que veio do Lovable

- Identidade visual, Tailwind, shadcn/ui, lucide-react e estrutura geral.
- Landing, simulador, painel empresa, painel prestador e admin.
- Fluxos de criação de bico, confirmação de prestador, acompanhamento, pagamento demo e store zustand persist.

## O que foi inspirado no GPT

- Carteira do prestador com saldo disponível, próximos recebíveis e saque simulado.
- Stepper compacto do prestador com fluxo: Aceito, Check-in, Em andamento, Finalizado e Pago.
- Filtros rápidos em formato de chips usando `Button` shadcn, sem biblioteca paralela.
- Bottom-nav mobile específico para prestador: Painel, Bicos, Histórico e Perfil.

## Melhorias atuais

- Filtros avançados em `/prestador/bicos`: categorias por checkbox, calendário, faixa de valor/hora e ordenação por publicação, proximidade, valor ou data.
- Preferências de filtro persistidas no zustand para manter a busca ao navegar.
- Tema claro/escuro com `next-themes`, usando as variáveis Tailwind já existentes.
- Labels ARIA nos controles de tema, navegações e filtros principais.

## Migração de dados antigos

Na inicialização, o app verifica se a migração GPT já foi executada no `bicou-store`.

Se ainda não foi, ele tenta ler:

- `acceptedJobs`
- `jobStatuses`

Quando existem dados válidos, eles são convertidos para o tipo `Bico` do projeto unificado e inseridos no store com prefixo `gpt-`. A flag `legacyGptMigrated` é marcada como `true` para evitar repetição. Se não houver dados antigos, apenas a flag é marcada e o app segue normalmente.

## Observações

Este projeto é demonstrativo. Pagamentos, saques, contratos, validações jurídicas e integrações financeiras são simulados.
