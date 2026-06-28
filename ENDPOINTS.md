# Endpoints

## Endpoints usados no Codigo

### Pacientes

### Listar pacientes

```
GET /pacientes
```

Retorna todos os pacientes cadastrados.

### Cadastrar paciente

```
POST /pacientes
```

Cadastra um novo paciente.

---

## Médicos

### Listar médicos

```
GET /medicos
```

Retorna a lista de médicos disponíveis para agendamento.

---

## Agendamentos

### Listar agendamentos

```
GET /agendamentos
```

Filtros disponíveis:

- pacienteId
- medico
- statusAgendamento

Exemplo:

```
GET /agendamentos?pacienteId=1
```

---

### Criar agendamento

```
POST /agendamentos
```

Realiza um novo agendamento.

---

### Cancelar agendamento

```
PUT /agendamentos/cancelar/{id}
```

Cancela um agendamento existente.

---

### Consultar horários disponíveis

```
GET /agendamentos/horarios-disponiveis
```

Parâmetros:

- medico
- data

Exemplo:

```
GET /agendamentos/horarios-disponiveis?medico=João&data=2026-06-28
```

Retorna os horários ainda disponíveis para o médico informado.