# FocusFlow

> Uma aplicação de gerenciamento de sprints e tarefas para organizar ciclos de trabalho, acompanhar progresso e priorizar atividades.

O FocusFlow é um projeto full-stack de estudo desenvolvido para praticar fluxos CRUD, gerenciamento de dados no cliente, formulários, componentes reutilizáveis e construção de uma experiência de dashboard. A aplicação permite criar, editar, excluir e acompanhar sprints e tarefas em uma interface React conectada a uma API mock com JSON Server.

## Demonstração

- Frontend: [URL](https://focusflow-ten-rho.vercel.app/)
- API: `https://focusflow-backend-vngy.onrender.com/`

## Funcionalidades

### Gerenciamento de sprints

- Criar sprints com título, descrição, data de início e data de término
- Editar informações de uma sprint
- Excluir sprints e as tarefas relacionadas
- Filtrar sprints por status
- Visualizar o progresso da sprint com base nas tarefas concluídas
- Exibir a duração estimada da sprint a partir do intervalo de datas selecionado

### Gerenciamento de tarefas

- Criar tarefas dentro de uma sprint
- Editar título, descrição, prioridade e período preferido para execução
- Excluir tarefas
- Alterar o status das tarefas pelo fluxo do checkbox
- Acompanhar tarefas pendentes, em andamento e concluídas
- Exibir badges de prioridade, status e período da tarefa

### Dashboard

- Cards de visão geral de sprints e tarefas
- Seção de sprints atuais
- Seção de tarefas de alta prioridade
- Indicadores de progresso e estatísticas das sprints

### Experiência do usuário

- Skeletons de carregamento em telas e blocos assíncronos
- Validação de formulários, campos obrigatórios e intervalo de datas
- Feedback de sucesso e erro com notificações toast
- Modais animados renderizados por portal
- Layout priorizado para desktop/notebook, com comportamento mínimo para evitar estouro de conteúdo em telas menores

## Tecnologias utilizadas

### Frontend

- React
- Vite
- React Router DOM
- TanStack Query (React Query)
- React Hook Form
- Axios
- Tailwind CSS
- Sonner
- React Transition Group
- Vercel

### Backend / API mock

- Node.js
- JSON Server
- Express middleware (`cors`)
- `db.json` como fonte de dados
- Render Web Service

## Arquitetura

O projeto separa componentes focados na interface de componentes responsáveis por buscar, filtrar e transformar dados.

- **Componentes de apresentação:** renderizam elementos reutilizáveis, como cards, badges, inputs, botões, skeletons e modais.
- **Páginas e containers:** coordenam hooks, filtros, cálculos, callbacks de mutations e os dados enviados aos componentes visuais.
- **Hooks de dados:** encapsulam queries e mutations usando TanStack Query.
- **Utilitários:** centralizam formatação de datas, transição de status, labels, variantes e opções de tarefas.

Essa organização ajuda a manter os componentes mais legíveis, reutilizáveis e fáceis de evoluir.

## Estrutura do projeto

```text
src/
├── assets/          # Ícones SVG e recursos visuais
├── components/      # Componentes reutilizáveis e componentes de funcionalidades
├── hooks/
│   └── data/        # Hooks de queries e mutations com React Query
├── layouts/         # Layout compartilhado da aplicação
├── pages/           # Telas associadas às rotas
├── services/        # Funções de acesso à API com Axios
├── utils/           # Utilitários de data, status, prioridade e tarefas
└── App.jsx
```

## Endpoints da API

A API mock disponibiliza recursos do JSON Server para sprints e tarefas:

| Recurso | Endpoint   | Finalidade                                 |
| ------- | ---------- | ------------------------------------------ |
| Sprints | `/sprints` | Criar, listar, atualizar e excluir sprints |
| Tarefas | `/tasks`   | Criar, listar, atualizar e excluir tarefas |

Exemplos de endpoints:

```text
GET    /sprints
POST   /sprints
PATCH  /sprints/:id
DELETE /sprints/:id

GET    /tasks
POST   /tasks
PATCH  /tasks/:id
DELETE /tasks/:id
```

## Como executar o projeto

### Pré-requisitos

- Node.js
- npm
- API JSON Server local ou URL da API publicada

### 1. Clone o repositório

```bash
git clone https://github.com/JoaoGustavo-dev/focusflow.git
cd focusflow
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure as variáveis de ambiente

Crie ou atualize os arquivos de ambiente na raiz do projeto.

Para desenvolvimento local:

```env
# .env.development
VITE_API_URL=http://localhost:3000
```

Para produção:

```env
# .env.production
VITE_API_URL=https://focusflow-backend-vngy.onrender.com
```

> O Vite disponibiliza para o frontend apenas variáveis iniciadas com `VITE_`. Nunca use esse prefixo para armazenar segredos.

### 4. Inicie o frontend

```bash
npm run dev
```

O Vite exibirá a URL local da aplicação, normalmente `http://localhost:5173`.

## Como executar a API localmente

Durante o desenvolvimento, o frontend espera que a API esteja disponível na porta `3000`.

No repositório do backend, execute:

```bash
npm install
npm start
```

Os recursos locais estarão disponíveis em:

```text
http://localhost:3000/sprints
http://localhost:3000/tasks
```

## Deploy

O FocusFlow é publicado como duas aplicações independentes:

1. **Frontend:** aplicação Vite/React publicada na Vercel
2. **Backend:** API Node.js com JSON Server publicada como Web Service no Render

O frontend usa a variável `VITE_API_URL` para alternar entre a API local e a API publicada no Render.

### Frontend na Vercel

Como o frontend usa React Router em uma Single Page Application, o projeto possui um arquivo `vercel.json` na raiz para garantir que acessos diretos às rotas da aplicação sejam tratados pelo React Router:

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

Essa regra evita erros `404` ao acessar ou atualizar rotas como `/sprints` e `/sprints/:sprintId` diretamente.

### Backend no Render

O backend é executado como um Web Service Node.js no Render.

Configuração usada no Render:

| Campo         | Valor         |
| ------------- | ------------- |
| Build Command | `npm install` |
| Start Command | `npm start`   |
| Plano         | Free          |

O servidor utiliza `process.env.PORT`, com fallback para a porta `3000`, para funcionar tanto localmente quanto no ambiente do Render.

O middleware `cors` é configurado no backend para permitir requisições entre o frontend e a API em domínios diferentes. Requisições como `POST`, `PATCH` e `DELETE` podem exigir uma chamada `OPTIONS` de preflight feita pelo navegador antes da requisição principal.

> No plano gratuito do Render, o serviço pode entrar em modo de espera após um período sem requisições. Quando isso acontece, a primeira chamada à API pode levar alguns segundos para iniciar o serviço. Os skeletons de loading do frontend ajudam a tornar esse período mais previsível para o usuário.

## Decisões de desenvolvimento

- **Modais de criação e edição separados:** os fluxos de criar e editar têm aparência semelhante, mas usam componentes independentes. Isso mantém cada formulário focado e evita abstrações prematuras.
- **Atualizações com PATCH:** mutations de sprint e tarefa enviam somente os campos atualizados pelo formulário.
- **Edição de tarefas com dados já carregados:** o modal de edição recebe o objeto da tarefa já existente no backlog, evitando uma nova busca assíncrona e problemas de timing nos valores iniciais do formulário.
- **Renderização com loading primeiro:** componentes assíncronos seguem a ordem `loading → estado vazio → conteúdo`, evitando que estados vazios apareçam antes da resolução da requisição.
- **Skeletons reutilizáveis:** os placeholders de carregamento são componentes genéricos e recebem suas dimensões conforme o bloco visual onde são utilizados.
- **Escopo responsivo:** o layout prioriza desktop e notebook, mantendo telas menores utilizáveis e sem overflow de conteúdo.
- **API mock persistida em serviço Node:** o backend permanece em um Web Service no Render para permitir que o JSON Server modifique o `db.json`, algo que não seria adequado em uma Vercel Function com filesystem efêmero.

## Autor

Desenvolvido por [João Gustavo](https://github.com/JoaoGustavo-dev).
