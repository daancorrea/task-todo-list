## Task List (to-do)

Este repositório contém instruções para rodar a aplicação usando Docker, sem necessidade de acessar o código-fonte diretamente. 
#### Pré-requisitos 
- [Docker](https://docs.docker.com/get-docker/) instalado na máquina 
#### Como Executar 
Siga os passos abaixo para baixar as imagens do Docker Hub e executar a aplicação. 
#### Passo 1: Baixar as Imagens 
Execute os comandos abaixo para baixar as imagens:
Imagem do servidor:
```bash
docker pull daancorrea/todo-list-server
```

Imagem da aplicação Web:
```bash
docker pull daancorrea/todo-list-web
```

#### Passo 2: Executar os Containers

Para iniciar os containers, execute os seguintes comandos:

1. Inicie o container do servidor (backend):
	    
    
```bash
docker run -d --name todo-server -p 4000:4000 daancorrea/todo-list-server
```
    
Isso iniciará o backend na porta `4000`.
** Para acessar a API: `http://localhost:4000/api`

2. Em seguida, inicie o container da interface (frontend):
    
    bash
    
    Copiar código
    
```bash
docker run -d --name todo-web -p 8080:8080 daancorrea/todo-list-web
```
    
Isso iniciará o frontend na porta `8080`.

Verifique se estão funcionando:
```bash
docker ps
```

### Passo 3: Acessar a Aplicação

Agora, você pode acessar a aplicação no navegador em http://localhost:8080.

## Parar os Containers

Para parar os containers, execute:

```bash
docker stop todo-web todo-server
```

E para removê-los (caso necessário):

```bash
docker rm todo-web todo-server
```


## Rodar o projeto local
### Pré-requisitos

- [Node.js](https://nodejs.org/) e Yarn instalados na máquina

### Passo a Passo

1. **Clone o repositório** na sua máquina.
2. **Configuração e execução do backend (server)**:
    
    - Entre na pasta do servidor:
        
        
```bash
cd server
```
        
- Instale as dependências:
        
```bash
yarn install
```
        
- Execute o servidor em modo de desenvolvimento:
    
```bash
yarn start:dev
```    
    
Isso iniciará o servidor na porta configurada (por padrão, `http://localhost:4000/api`).
    
3. **Configuração e execução do frontend (web)**:
    - Em uma nova janela de terminal, navegue até a pasta `web`:
```bash
cd ../web
```
        
- Instale as dependências:
```bash
yarn install
```
        
- Inicie o frontend:
```bash
yarn serve
```
        
O frontend será iniciado na porta configurada (por padrão, `http://localhost:8080`).
### Acessando a Aplicação

Após iniciar o backend e o frontend, você pode acessar a aplicação no navegador em http://localhost:8080.

## Swagger
A documentação do *swagger* está disponível em: `http://localhost:4000/api-docs`

**MAIS INFORMAÇÃO DO PROJETO, OLHAR `ROADMAP.MD`**
**PARA RODAR LOCAL, ENTRE EM CONTATO COMIGO PARA CONFIGURAÇÃO DO FIREBASE**