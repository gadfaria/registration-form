# registration-form
https://registration.gadfaria.com/

Este projeto tem como objetivo criar uma aplicação cliente para registrar usuários, enviando os dados para um servidor Node.js com Express.

A aplicação cliente foi construída com ReactJS e Vite, utilizando principalmente suas funcionalidades nativas. Para estilização, foi utilizado o [Tailwind CSS](https://tailwindcss.com/), um framework de CSS de baixo nível. A única biblioteca externa utilizada para lógica foi a [Zod](https://github.com/colinhacks/zod) para validação de dados.

O servidor é simples e consiste em três endpoints:

- `[GET] /registration`: Este endpoint renderiza uma página HTML simples que carrega os componentes do formulário no navegador.

- `[POST] /registration`: Este é o endpoint de registro. Ele é responsável por receber os dados submetidos pelo usuário em formato JSON e responder ao cliente com uma mensagem de sucesso.

- `[GET] /data`: Este endpoint retorna os usuários registrados.


## Primeiros Passos
Siga as instruções abaixo para obter uma cópia do projeto e executá-lo localmente para fins de desenvolvimento e teste.

### Clonando o Repositório
Primeiro, clone o repositório para a sua máquina local usando o seguinte comando:
```bash
git clone https://github.com/gadfaria/registration-form.git
```

### Instalação
Navegue até o diretório do projeto:
```bash
cd registration-form/
```

Em seguida, instale as dependências do projeto:

```bash
yarn
```

### Execução
Agora você pode iniciar o projeto com o seguinte comando:
```bash
yarn start
```

Após executar este comando, o projeto estará disponível em ```http://localhost:3000```



## Testes
Este projeto usa tanto o Jest quanto o Cypress para testes.

### Testes Unitários
Para os testes unitários, usamos o Jest. Você pode executar os testes unitários com o seguinte comando:

```bash
yarn test
```
Este comando irá executar todos os testes unitários e exibir os resultados no terminal.

### Testes End-to-End
Para os testes end-to-end, usamos o Cypress. Antes de executar os testes do Cypress, certifique-se de que o aplicativo está em execução em um servidor local. Você pode iniciar o aplicativo com o seguinte comando:

```bash
yarn start
```

Depois que o aplicativo estiver em execução, você pode iniciar os testes do Cypress com o seguinte comando:
```bash
yarn cypress:open
```
Isso abrirá a interface do Cypress, onde você pode executar os testes end-to-end.


<h5 align="center">
  ☕ Code and Coffee
</h5>