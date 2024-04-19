
# Todo List Challenge

Aplicação de lista de tarefas desenvolvida como parte da prova de validação de conhecimento da NewM.




## 🚀 Funcionalidades 

- Permite que um usuário crie uma nova tarefa;
- Permite visualizar todas as tarefas cadastradas;
- Permite editare excluir uma determinada tarefa;
- permite filtrar as tarefas por status.


## 💻 Stack utilizada

**Front-end:** 

- React 18.2.0
- react-router-dom
- Axios 

**Back-end:** 

- Java 21
- Spring Framework 3.2.4
- Apache Maven 3.9.6 
- MysQL


## 🛠️ Instalação

1. Clone o repositório

```bash
  https://github.com/DaianePorcena/todolist_challenge.git
```
2. Iniciando o backend

- Importe o projeto todo_backend para sua ide
- Navegue até a pasta `src/main/resources`. Configure o arquivo  `application.properties` com as informações do seu banco de dados MySQL:
    
    ```bash
    spring.datasource.url=jdbc:mysql://localhost:3306/nome-do-banco
    spring.datasource.username=seu-usuario
    spring.datasource.password=sua-senha
    spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
    spring.jpa.database-platform=org.hibernate.dialect.MySQLDialect
    spring.jpa.hibernate.ddl-auto=update
    ```

- navegue até a pasta `/todolist_challenge/todo_backend` e execute o projeto:

    ```bash
    java -jar target/todolistchallenge-0.0.1-SNAPSHOT.jar
    ```
3. Com o backend executando, é hora de executar o frontend:

- Navegue até a pasta frontend:

    ```bash
    cd /todo_frontend
    ```
- Instale as dependências:

    ```bash
        npm install
    ```
- Inicie o servidor frontend: 

    ```bash
        npm start
    ```


## Melhorias a serem adicionadas

- Criação de Exceções
- Testes Automatizado
- Otimização do layout
- Otimização da Responsividade
- Feedback pro usuário


