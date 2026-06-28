# Sistema de Agendamento de Clínica

Projeto desenvolvido com Spring Boot para gerenciamento de pacientes e agendamentos médicos.

## Tecnologias utilizadas

- Java 21
- Spring Boot
- Spring Web
- Spring Data JPA
- Bean Validation
- Lombok
- Oracle Database
- HTML
- CSS
- JavaScript

## Funcionalidades

- Cadastro de pacientes.
- Listagem de pacientes.
- Consulta de médicos previamente cadastrados.
- Agendamento de consultas.
- Cancelamento de agendamentos.
- Consulta de horários disponíveis por médico.
- Filtros para consulta de agendamentos.

## Regras de negócio

- Os médicos já estão cadastrados no sistema.
- O usuário pode cadastrar pacientes.
- O agendamento é realizado vinculando um paciente a um médico.
- Um agendamento pode ser cancelado mediante justificativa.
- Os horários disponíveis dependem do médico e da data informados.

## Pré-requisitos

- Java 21
- Maven
- Oracle Database em execução localmente

## Configuração do banco de dados

Antes de executar a aplicação, configure o banco Oracle local conforme as propriedades definidas no arquivo:

```
src/main/resources/application.properties
```

Verifique principalmente:

- URL de conexão (`spring.datasource.url`)
- Usuário (`spring.datasource.username`)
- Senha (`spring.datasource.password`)

Certifique-se de que o banco esteja iniciado antes de executar a aplicação.

## Como executar

### 1. Clonar o projeto

```bash
git clone <url-do-repositorio>
```

### 2. Abrir o projeto

Abra o projeto em uma IDE compatível com Maven (IntelliJ IDEA, Eclipse ou VS Code).

### 3. Executar

Execute a classe principal:

```
AgendarApplication.java
```

A aplicação estará disponível em:

```
http://localhost:8080
```

## Estrutura do projeto

```
controller/
service/
repository/
entity/
dto/
resources/
static/
```

## Front-end

O front-end foi desenvolvido utilizando HTML, CSS e JavaScript puro, consumindo os endpoints REST disponibilizados pelo Spring Boot.