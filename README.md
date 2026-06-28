# Sistema de Agendamento de Clínica

Sistema desenvolvido em Spring Boot para gerenciamento de pacientes e agendamentos médicos.

## Tecnologias utilizadas

- Java 21
- Spring Boot
- Spring Web
- Spring Data JPA
- Bean Validation
- Lombok
- Oracle Database
- SpringDoc OpenAPI (Swagger)
- HTML
- CSS
- JavaScript

---

# Funcionalidades

- Cadastro de pacientes.
- Listagem de pacientes.
- Listagem de médicos cadastrados.
- Agendamento de consultas.
- Cancelamento de consultas.
- Consulta de horários disponíveis.
- Filtro de agendamentos.

---

# Regras de negócio

- Os médicos já estão cadastrados na base de dados.
- O usuário pode cadastrar novos pacientes.
- Cada agendamento associa um paciente a um médico.
- Um agendamento pode ser cancelado mediante justificativa.
- Os horários disponíveis variam conforme o médico e a data selecionada.

---

# Pré-requisitos

Antes de executar o projeto é necessário possuir instalado:

- Java 21
- Maven
- Oracle Database
- IntelliJ IDEA (ou outra IDE compatível)

---

# Configuração do Oracle

O projeto utiliza um banco Oracle executando localmente.

1. Inicie o serviço do Oracle Database.

2. Crie (ou utilize) um usuário que possua permissões para criar e alterar tabelas.

3. Configure as credenciais no arquivo:

```
src/main/resources/application.properties
```

Exemplo:

```properties
spring.datasource.url=jdbc:oracle:thin:@localhost:1521/XEPDB1
spring.datasource.username=SEU_USUARIO
spring.datasource.password=SUA_SENHA

spring.jpa.hibernate.ddl-auto=update
```

Caso utilize outra porta, SID ou Service Name, altere a URL conforme sua instalação do Oracle.

Após iniciar o banco de dados, execute normalmente a aplicação.

---

# Como executar

Clone o projeto:

```bash
git clone <url-do-repositorio>
```

Abra o projeto na IDE.

Aguarde o Maven baixar as dependências.

Execute a classe principal:

```
AgendarApplication.java
```

A aplicação ficará disponível em:

```
http://localhost:8080
```

---

# Documentação da API (Swagger)

Após iniciar a aplicação, acesse:

```
http://localhost:8080/swagger-ui/index.html
```

ou

```
http://localhost:8080/swagger-ui.html
```

(dependendo da versão do SpringDoc utilizada).

No Swagger é possível:

- visualizar todos os endpoints;
- consultar os parâmetros aceitos;
- visualizar os modelos de requisição e resposta;
- testar os endpoints diretamente pelo navegador.

---

# Estrutura do projeto

```
controller/
service/
repository/
entity/
dto/
config/
resources/
static/
```

---

# Front-end

O front-end foi desenvolvido utilizando HTML, CSS e JavaScript puro.

Toda comunicação é realizada através da API REST desenvolvida em Spring Boot.

---

# Observações

- Os médicos já são disponibilizados pelo sistema.
- O foco da aplicação é o cadastro de pacientes e o gerenciamento de agendamentos.
- As tabelas são criadas/atualizadas automaticamente pelo Hibernate conforme a configuração da aplicação.