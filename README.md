# 💬 YourForum

Uma aplicação fullstack de fórum desenvolvida com foco em autenticação segura, arquitetura moderna e boas práticas de produção.

---

## 🚀 Tecnologias Utilizadas

### Frontend
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- ShadCN/UI
- React Hook Form
- Zod
- Sonner (toast)

### Backend
- NestJS
- Prisma ORM
- PostgreSQL
- JWT Authentication

---

## 🏗️ Arquitetura

O projeto utiliza o padrão **BFF (Backend For Frontend)**.

Fluxo de autenticação:

Cliente → Next.js Route Handler → Backend NestJS

- O login salva o token JWT em cookie `httpOnly`
- As rotas protegidas passam pelo Next.js
- O Next injeta o `Authorization: Bearer` no header
- O backend valida o token

Isso evita:
- Exposição do token no `localStorage`
- Problemas de CORS
- Vulnerabilidades XSS

---

## 🔐 Funcionalidades

- Registro de usuário
- Login com autenticação JWT
- Criação de perguntas
- Edição de perguntas
- Exclusão de perguntas
- Criação de respostas
- Exclusão de respostas
- Rotas protegidas
- Validação com Zod
- Feedback visual com toast

---

## 📂 Estrutura Simplificada

```text
frontend/
├── app/
│ ├── api/ (proxy BFF)
│ ├── login/
│ ├── register/
│ └── hub/
backend/
├── auth/
├── user/
├── questions/
└── answers/
```

---

## ⚙️ Como rodar o projeto

### 1️⃣ Clonar o repositório

```bash
git clone https://github.com/luangomesg/forum-frontend.git
```

### 2️⃣ Rodar projeto

```bash
cd forum-frontend
npm install
npm run dev
```

### 3️⃣ Criar .env

```bash
NEXT_PUBLIC_API_URL=
```
---

## 🧠 Aprendizados

Durante o desenvolvimento foram aplicados conceitos importantes como:

- Arquitetura BFF

- Cookies httpOnly

- Segurança em autenticação

- Tratamento correto de respostas HTTP

- Integração frontend ↔ backend

- Estruturação de API com Next.js App Router

- 🌎 Deploy

- Frontend: Vercel

- Backend: Render

- Banco: PostgreSQL

## 📌 Objetivo do Projeto

Este projeto foi desenvolvido com o objetivo de praticar:

- Desenvolvimento Fullstack moderno

- Autenticação segura em produção

- Boas práticas de organização de código

- Integração real entre frontend e backend

## 👨‍💻 Autor
## Desenvolvido por Luan Gomes Galvão.
