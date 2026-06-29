# Sistema de Agendamento de Clínica


A aplicação disponibiliza uma **API REST** integrada a um front-end desenvolvido em **HTML, CSS e JavaScript**, permitindo cadastrar pacientes, consultar médicos previamente cadastrados e realizar o gerenciamento completo dos agendamentos.

---

# Tecnologias Utilizadas

## Back-end

- Java 21
- Spring Boot
- Spring Web
- Spring Data JPA
- Bean Validation
- Lombok
- Oracle Database
- SpringDoc OpenAPI (Swagger)

## Front-end

- HTML5
- CSS3
- JavaScript

---

# Funcionalidades

- Cadastro de pacientes
- Listagem de pacientes
- Consulta de médicos cadastrados
- Agendamento de consultas
- Cancelamento de consultas
- Consulta de horários disponíveis
- Filtro de agendamentos

---

# Regras de Negócio

- Os médicos já são cadastrados previamente no sistema.
- O usuário pode cadastrar novos pacientes.
- Cada agendamento associa um paciente a apenas um médico.
- Um paciente pode possuir vários agendamentos.
- Consultas podem ser canceladas mediante justificativa.
- Os horários disponíveis variam conforme o médico e a data selecionada.

---

# Pré-requisitos

Antes de executar o projeto, é necessário possuir instalado:

- Java 21
- Maven
- Oracle Database
- Oracle SQL Developer (recomendado)
- IntelliJ IDEA (ou outra IDE compatível)

---

#  Configuração do Banco de Dados (Oracle)

## 1. Instale o Oracle Database

Instale o **Oracle Database XE (Express Edition)** ou outra versão compatível.

Durante a instalação, defina a senha do usuário **SYSTEM**, pois ela será utilizada para administrar o banco.

---

## 2. Instale o Oracle SQL Developer

Utilize o SQL Developer para:

- visualizar tabelas;
- executar comandos SQL;
- consultar os registros;
- criar usuários;
- conceder permissões.

---

## 3. Conecte ao banco

Crie uma nova conexão utilizando:

| Campo | Valor |
|-------|-------|
| Usuário | SYSTEM |
| Senha | Senha definida na instalação |
| Host | localhost |
| Porta | 1521 |
| Service Name | XEPDB1 |

Após preencher os dados:

1. Clique em **Test**.
2. Verifique se a mensagem **Success** foi exibida.
3. Clique em **Connect**.

> Recomenda-se utilizar o usuário **SYSTEM** para administração do banco, evitando utilizar o usuário **SYS**.

---

## 4. Crie o usuário da aplicação

Execute o script abaixo:

```sql
CREATE USER clinica IDENTIFIED BY clinica123;

GRANT CONNECT, RESOURCE TO clinica;

ALTER USER clinica QUOTA UNLIMITED ON USERS;
```

Esse usuário será utilizado pela aplicação.

---

## 5. Configure a aplicação

Arquivo:

```text
src/main/resources/application.properties
```

```properties
spring.application.name=agendar

spring.datasource.url=jdbc:oracle:thin:@localhost:1521/XEPDB1
spring.datasource.username=clinica
spring.datasource.password=clinica123
spring.datasource.driver-class-name=oracle.jdbc.OracleDriver

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true
```

Caso utilize outro usuário ou senha, altere:

```properties
spring.datasource.username
spring.datasource.password
```

---

# ▶️ Executando o Projeto

## Clone o repositório

```bash
git clone <URL_DO_REPOSITORIO>
```

## Abra o projeto

Importe o projeto em uma IDE compatível com Maven.

Aguarde o download das dependências.

## Inicie o Oracle Database

Certifique-se de que o banco esteja em execução.

## Execute a aplicação

Execute a classe principal:

```text
AgendarApplication.java
```

Na primeira execução, o Hibernate criará automaticamente as tabelas utilizando:

```properties
spring.jpa.hibernate.ddl-auto=update
```

A aplicação ficará disponível em:

```text
http://localhost:8080
```

---

# Documentação da API (Swagger)

Após iniciar a aplicação, acesse:

```text
http://localhost:8080/swagger-ui/index.html
```

Em algumas versões do SpringDoc:

```text
http://localhost:8080/swagger-ui.html
```

No Swagger é possível:

- visualizar todos os endpoints;
- consultar parâmetros;
- visualizar exemplos de requisição e resposta;
- testar a API diretamente pelo navegador.

---

# 📁 Estrutura do Projeto

```text
src
├── controller
├── service
├── repository
├── entity
├── dto
├── config
├── resources
└── static
```

---

# Front-end

O front-end foi desenvolvido utilizando:

- HTML5
- CSS3
- JavaScript

Toda a comunicação com o banco de dados ocorre através da API REST desenvolvida em Spring Boot.

---

# Consultando os Dados no Banco

Após executar a aplicação e realizar alguns cadastros:

1. Abra o Oracle SQL Developer.
2. Conecte-se utilizando:

| Campo | Valor |
|-------|-------|
| Usuário | clinica |
| Senha | clinica123 |

No painel esquerdo:

```text
Connections
 └── clinica
      └── Tables
```

Selecione uma tabela e clique na aba **Data** para visualizar os registros.

---

# 📝 Observações

- Os médicos são previamente cadastrados no sistema.
- O foco da aplicação é o gerenciamento de pacientes e agendamentos.
- As tabelas são criadas ou atualizadas automaticamente pelo Hibernate.
- A API possui documentação interativa utilizando Swagger.