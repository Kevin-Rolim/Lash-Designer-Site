✨ Lash Designer - Sistema de Gerenciamento e Portfólio
Este projeto é uma aplicação web completa, desenvolvida para gerenciar e apresentar os serviços de uma Lash Designer (e possivelmente outras profissionais de beleza), focando na exibição de portfólio, agendamento de serviços (booking), e informações de contato. A estrutura é dividida em frontend e backend para uma arquitetura escalável (Full-Stack).

🚀 Tecnologias Utilizadas
A análise da estrutura de arquivos sugere o uso das seguintes tecnologias:

Frontend (Client-Side)
Framework: React 

Build Tool: Vite 

Linguagem: TypeScript 

Estilização & Componentes: Tailwind CSS  e Shadcn UI 

Estrutura: Componentes modulares 

Backend (Server-Side)
Ambiente/Runtime: Node.js 

Linguagem: TypeScript 

Servidor: Express.js ou similar 


Package Manager: Bun / npm/Yarn 

📂 Estrutura do Projeto
O projeto é dividido em três diretórios principais:

server/: Contém o código do backend/API. Responsável pela lógica de negócios, gerenciamento de dados (agendamentos, autenticação, etc.), e integração com serviços externos (como o Firebase).

Arquivo chave: server/server.ts (ponto de entrada do servidor).

src/: Contém todo o código-fonte do frontend (interface do usuário).

src/components/: Componentes reutilizáveis (Hero, Services, Contact, etc.).

src/components/ui/: Componentes base do Shadcn UI/Radix-UI.

src/assets/: Imagens e mídias estáticas (incluindo o portfólio).

src/pages/: Páginas principais da aplicação (Index.tsx, NotFound.tsx).

public/: Arquivos estáticos que são copiados diretamente para a raiz do build do frontend (favicon, robots.txt, etc.).