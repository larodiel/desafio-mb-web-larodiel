# Instruções de instalação

- [Instruções de instalação](#instruções-de-instalação)
  - [Setup](#setup)
  - [Passos para o desenvolvimento do backend](#passos-para-o-desenvolvimento-do-backend)
  - [Passos para o desenvolvimento do frontend](#passos-para-o-desenvolvimento-do-frontend)

## Setup

- Primeiro entre na pasta do project pelo terminal e instale as dependências com o comando `npm i`
- Após instalar as dependências, execute o comando `npm run build` para compilar o projeto
- Inicie o servidor com o comando `npm run server`
- O server ficará rodando em [http://localhost:8088](http://localhost:8088)
- A página de cadastro fica em [http://localhost:8088/registration](http://localhost:8088/registration)

## Passos para o desenvolvimento do backend

1. Instalar o [Express](https://expressjs.com/pt-br/)
2. Instalar o [Nodemon](https://nodemon.io/)
3. Instalar plugins do Express
   - [Helmet](https://helmetjs.github.io/)
4. Criar o endpoint `GET` para exibir o formulário `/registration`
5. Criar o endpoint `POST` para receber os dados do formulário `/registration`
6. Criar arquivo de validação para validar os campos do formulário, as funções devem ser reutilizáveis e as mesmas regras se aplicam no backend e no frontend
7. Aplicar validações no backend
8. Caso os campos estejam válidos, retornar um JSON com uma mensagem de sucesso e o status 201
9. Caso os campos estejam inválidos, retornar um JSON com uma mensagem de erro e o status 400

## Passos para o desenvolvimento do frontend

1. Instalar o [VUE](https://vuejs.org/) utilizando o [Vite](https://vitejs.dev/)
2. Criar componente `Input` com as seguintes propriedades
   - id (required)
   - label
   - type (padrão `text`)
   - name (required)
   - debounce (padrão `0`)
   - validation
   - placeholder
   - errorMessage
   - mask
   - error (padrão `false`)
   - errorMessage
3. Criar componente `Button` com as seguintes propriedades
   - variant ([solid, outline] padrão `solid`)
   - color ([primary, secondary] padrão `primary`)
   - disabled (padrão `false`)
   - loading (padrão `false`)
   - type (padrão `button`)
4. Criar componente `Container` com as seguintes propriedades
   - size ([xs, sm, md, lg] padrão `md`)
   - gap ([xs, sm, md, lg] padrão `xs`)
   - center (padrão `false`)
   - direction ([row, col] padrão `row`)
   - marginTop ([xs, sm, md, lg] padrão `xs`)
   - bleed ([xs, sm, md, lg] padrão `xs`)
5. Criar componente `Logo`
6. Criar componente `FormStep` com as seguintes propriedades, este formulário irá exibir os campos do step atual
   - formState
   - stepFields
   - formErrors
7. Criar componente SignupForm, este componente irá exibir o formulário completo e controlar o fluxo de cadastro.
8. Fazer controle do tipo de cadastro escolhido (PF, PJ)
9. Criar controladores para cada passo
10. Caso seja PJ, alterar o formulário no passo 2 para exibir os campos de PJ
11. Aplicar validação a cada avanço do usuário
12. No último passo exibir todos os campos e permitir que o usuário altere qualquer campo
13. Ao submeter o formulário, fazer a validação e caso tudo esteja válido, enviar os dados para o backend
14. exibir mensagem de sucesso, caso o cadastro seja realizado com sucesso
15. exibir mensagem de erro, caso haja algum erro no cadastro
