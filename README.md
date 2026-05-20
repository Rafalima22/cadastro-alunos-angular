# Banca de Estudos

Primeira versão de um sistema Angular para cadastro de alunos de uma banca de estudos.

## Como Rodar

```bash
npm start
```

Depois acesse:

```txt
http://127.0.0.1:4200/
```

## Como Compilar

```bash
npm run build
```

## O Que Esta Versão Ensina

- `Component`: controla a tela principal da aplicação.
- `Template`: monta o HTML com dados do TypeScript.
- `ReactiveFormsModule`: cria formulário com validação.
- `Service`: separa a regra de salvar/carregar alunos.
- `Interface`: define o formato de um aluno com TypeScript.
- `localStorage`: guarda os cadastros no navegador.
- `@if` e `@for`: exibem conteúdo condicional e listas no Angular moderno.

## Arquivos Principais

- `src/app/app.component.ts`: lógica da tela.
- `src/app/app.component.html`: estrutura visual.
- `src/app/app.component.css`: estilos da tela.
- `src/app/models/student.model.ts`: formato dos dados.
- `src/app/services/student-storage.service.ts`: persistência no navegador.
