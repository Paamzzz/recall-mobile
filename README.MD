<div align="center">
  <img 
    src="./src/assets/img/recall-banner.png" 
    width="100%" 
    alt="Recall Banner"
  />

  <br/>

  <img src="https://img.shields.io/badge/Ionic-3880FF?style=for-the-badge&logo=ionic&logoColor=white" alt="Ionic" />
  <img src="https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white" alt="Angular" />
  <img src="https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black" alt="Firebase" />
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Postman-ef5b25?style=for-the-badge&logo=postman&logoColor=white" alt="Postman" />
  <img src="https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white" alt="Figma" />

   <img 
    src="./src/assets/img/recall-demo.gif" 
    width="70%" 
    alt="Recall Banner"
  />
</div>

<br/>

## 📖 Sobre o projeto

É um app mobile de flashcards focado em preparação para entrevistas técnicas na área de TI. A ideia é simples: você vira um card, vê a resposta e aprende de forma leve e prática, como deveria ser.

O conteúdo é organizado por área de atuação e vem com uma biblioteca de cards pré-prontos para você começar de imediato. Cada vez que você vira um card, o celular vibra - um detalhe pequeno que torna a experiência mais tátil e satisfatória. 

Ao finalizar uma seção, a IA analisa seus erros e acertos para gerar um feedback personalizado, ajudando você a entender onde está evoluindo e o que ainda precisa reforçar.

<br/>

## 🎯 Objetivo

### O Problema

Preparar para entrevistas técnicas de TI é difícil porque o conteúdo está espalhado, não é interativo e raramente é adaptado para o formato de estudo por repetição. Não existe uma ferramenta mobile simples, focada em entrevistas reais de TI, que permita tanto consumir conteúdo pronto quanto criar o próprio.

### A Solução

Um app mobile com flashcards de entrevista, organizado por área, com modo de resposta passiva (flip), histórico de desempenho e possibilidade de criar cards personalizados com imagem.

### O Resultado

Um estudante que chega na entrevista técnica com mais confiança, mais consistência nos estudos e menos tempo perdido garimpando conteúdo em diferentes lugares.

<br/>

## 🛠️ Stack

- **Ionic + Angular** — estrutura e telas do app mobile
- **Firebase Authentication** — login e cadastro
- **Cloud Firestore** — armazenamento dos cards e histórico
- **Node.js** — servidor de apoio
- **Groq AI** — API para feedback e dicas personalizadas
- **Postman** — testar o funcionamento da API

<br/>

## 🚀 Como rodar

> Pré-requisitos: **Node.js**, **Ionic CLI**, **Android Studio SDK** e uma conta no **Firebase**.

```bash
# Clone o repositório
git clone https://github.com/Paamzzz/recall-mobile.git

# Entre na pasta do projeto
cd recall-mobile

# Instale as dependências
npm install

# Configure as variáveis de ambiente
cp src/environments/environment.example.ts src/environments/environment.ts
cp src/environments/environment.example.ts src/environments/environment.prod.ts

# Preencha as credenciais do Firebase e a API Key do Groq nos arquivos gerados

# Rode no navegador
ionic serve

# Rode no Android
ionic capacitor run android
```

<br/>

## 👩‍💻 Time

| Nome | Papel | GitHub |
| :--- | :--- | :--- |
| **Pamela Amancio Goulart** | Integração, UX & Arquitetura de Serviços | [![GitHub](https://img.shields.io/badge/GitHub-100000?style=flat&logo=github&logoColor=white)](https://github.com/Paamzzz) |
| **João Pedro Rangel** | Backend & Firebase | [![GitHub](https://img.shields.io/badge/GitHub-100000?style=flat&logo=github&logoColor=white)](https://github.com/7JPRBM7) |
| **Joyce do Vale Silva** | Frontend & Interface | [![GitHub](https://img.shields.io/badge/GitHub-100000?style=flat&logo=github&logoColor=white)](https://github.com/J01C3) |
<br/>

<div align="center">
  <sub>Feito com 🖤 e muita dedicação.</sub>
</div>
