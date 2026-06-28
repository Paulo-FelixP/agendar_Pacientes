
// config
const API = "";

// estado
let idCancelando = null;
let horarioSelecionado = null;
let cadastrandoPaciente = false;


// navegaçao

function mostrarPagina(nome) {
  document.querySelectorAll(".pagina").forEach(p => p.classList.remove("ativa"));
  document.querySelectorAll("nav button").forEach(b => b.classList.remove("ativo"));
  document.getElementById("pagina-" + nome).classList.add("ativa");
  document.getElementById("nav-" + nome).classList.add("ativo");
}


// utilitarios

function mostrarAlerta(id, mensagem, tipo) {
  const alerta = document.getElementById(id);
  alerta.textContent = mensagem;
  alerta.className = `alerta visivel alerta-${tipo}`;
  setTimeout(() => alerta.classList.remove("visivel"), 5000);
}

function formatarData(dataStr) {
  if (!dataStr) return "—";
  const data = new Date(dataStr.replace(/\.(\d{3})\d*/, ".$1"));
  return data.toLocaleDateString("pt-BR") + " " +
      data.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
}


// pacientes

async function carregarPacientes() {
  try {
    const res = await fetch(API + "/pacientes");
    if (!res.ok) throw new Error("Erro ao buscar pacientes");

    const lista = await res.json();
    document.getElementById("pac-loading").style.display = "none";
    const selectPaciente = document.getElementById("ag-paciente");
    const filtroPaciente = document.getElementById("filtro-paciente");

    filtroPaciente.innerHTML = `<option value="">Todos</option>` +
        lista.map(p => `<option value="${p.id}">${p.nome}</option>`).join("");

    const pacienteSelecionado = selectPaciente.value;

    selectPaciente.innerHTML = `<option value="">Selecione o paciente...</option>` +
        lista.map(p => `<option value="${p.id}">${p.nome} — ${mascararCPF(p.cpf)}</option>`).join("");

    if (pacienteSelecionado) selectPaciente.value = pacienteSelecionado;

    if (lista.length === 0) {
      document.getElementById("pac-vazio").style.display = "block";
      document.getElementById("pac-tabela").style.display = "none";
      return;
    }

    document.getElementById("pac-vazio").style.display = "none";

    document.getElementById("pac-tbody").innerHTML = lista.map(p => `
        <tr>
          <td>${p.nome}</td>
          <td>${mascararCPF(p.cpf)}</td>
          <td>${p.telefone || "—"}</td>
          <td>${p.email || "—"}</td>
        </tr>
      `).join("");

    document.getElementById("pac-tabela").style.display = "table";
  }
  catch (erro) {
    console.error(erro);
    document.getElementById("pac-loading").style.display = "none";
    mostrarAlerta("pac-erro", "Erro ao carregar pacientes.", "erro");
  }
}

async function cadastrarPaciente() {
  const nome = document.getElementById("pac-nome").value.trim();
  const cpf = document.getElementById("pac-cpf").value.trim();
  const telefone = document.getElementById("pac-telefone").value.trim();
  const email = document.getElementById("pac-email").value.trim();

  if (!nome || !cpf || !telefone || !email) {
    mostrarAlerta("pac-erro", "Preencha todos os campos.", "erro");
    return;
  }
  try {
    const res = await fetch(API + "/pacientes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome, cpf, telefone, email })
    });

    if (!res.ok) {
      const erro = await res.json();
      mostrarAlerta("pac-erro", Object.values(erro).join(", "), "erro");
      return;
    }

    mostrarAlerta("pac-sucesso", "Paciente cadastrado com sucesso!", "ok");

    document.getElementById("pac-nome").value = "";
    document.getElementById("pac-cpf").value = "";
    document.getElementById("pac-telefone").value = "";
    document.getElementById("pac-email").value = "";

    document.getElementById("pac-loading").style.display = "block";
    document.getElementById("pac-vazio").style.display = "none";
    document.getElementById("pac-tabela").style.display = "none";

    await carregarPacientes();
  }
  catch (erro) {
    console.error(erro);
    mostrarAlerta("pac-erro", "Erro ao cadastrar paciente.", "erro");
  }
}


// cadastro de pacientes

function toggleMiniCadastroPaciente() {
  cadastrandoPaciente = !cadastrandoPaciente;

  const container = document.getElementById("mini-cadastro-paciente");
  const btn = document.getElementById("btn-novo-paciente");
  const select = document.getElementById("ag-paciente");

  if (cadastrandoPaciente) {
    container.style.display = "block";
    select.style.display = "none";
    btn.textContent = "← Voltar para seleção";
  } else {
    container.style.display = "none";
    select.style.display = "block";
    btn.textContent = "+ Cadastrar novo paciente";

    document.getElementById("mini-nome").value = "";
    document.getElementById("mini-cpf").value = "";
    document.getElementById("mini-telefone").value = "";
    document.getElementById("mini-email").value = "";
  }
}

async function cadastrarPacienteESelecionar() {
  const nome = document.getElementById("mini-nome").value.trim();
  const cpf = document.getElementById("mini-cpf").value.trim();
  const telefone = document.getElementById("mini-telefone").value.trim();
  const email = document.getElementById("mini-email").value.trim();

  if (!nome || !cpf || !telefone || !email) {
    mostrarAlerta("ag-erro", "Preencha todos os campos do paciente.", "erro");
    return;
  }
  try {
    const res = await fetch(API + "/pacientes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome, cpf, telefone, email })
    });

    if (!res.ok) {
      const erro = await res.json();
      mostrarAlerta("ag-erro", Object.values(erro).join(", "), "erro");
      return;
    }

    const paciente = await res.json();
    await carregarPacientes();
    document.getElementById("ag-paciente").value = paciente.id;
    toggleMiniCadastroPaciente();

    mostrarAlerta("ag-sucesso", `Paciente "${paciente.nome}" cadastrado e selecionado!`, "ok");
  }
  catch (erro) {
    console.error(erro);
    mostrarAlerta("ag-erro", "Erro ao cadastrar paciente.", "erro");
  }
}


// medicos

async function carregarMedicos() {
  try {
    const res = await fetch(API + "/medicos");
    if (!res.ok) throw new Error("Erro ao carregar médicos.");
    const mapa = await res.json();
    const select = document.getElementById("ag-medico");
    const filtro = document.getElementById("filtro-medico");

    filtro.innerHTML = `<option value="">Todos</option>` +
        Object.entries(mapa).map(([nome]) => `<option value="${nome}">${nome}</option>`).join("");

    select.innerHTML = `<option value="">Selecione o médico...</option>` +
        Object.entries(mapa)
            .map(([nome, especialidade]) => `<option value="${nome}">${nome} — ${especialidade}</option>`)
            .join("");
  } catch (erro) {
    console.error(erro);
  }
}


// horarios

async function buscarHorarios() {
  const medico = document.getElementById("ag-medico").value;
  const data = document.getElementById("ag-data").value;

  horarioSelecionado = null;

  document.getElementById("horarios-container").style.display = "none";
  document.getElementById("horarios-vazio").style.display = "none";
  document.getElementById("horarios-cheio").style.display = "none";

  if (!medico || !data) {
    document.getElementById("horarios-vazio").style.display = "block";
    return;
  }
  document.getElementById("horarios-container").style.display = "block";
  document.getElementById("horarios-grid").innerHTML =
      "<span style='color:var(--muted);font-size:13px'>Buscando horários...</span>";

  try {
    const res = await fetch(
        `${API}/agendamentos/horarios-disponiveis?medico=${encodeURIComponent(medico)}&data=${data}`
    );
    if (!res.ok) throw new Error();

    const horarios = await res.json();

    if (horarios.length === 0) {
      document.getElementById("horarios-container").style.display = "none";
      document.getElementById("horarios-cheio").style.display = "block";
      return;
    }

    document.getElementById("horarios-grid").innerHTML = horarios.map(h =>
        `<button class="horario-btn" onclick="selecionarHorario(this,'${h}')">${h}</button>`
    ).join("");
  } catch (erro) {
    console.error(erro);
    document.getElementById("horarios-container").style.display = "none";
    document.getElementById("horarios-vazio").style.display = "block";
  }
}

function selecionarHorario(botao, horario) {
  document.querySelectorAll(".horario-btn").forEach(b => b.classList.remove("selecionado"));
  botao.classList.add("selecionado");
  horarioSelecionado = horario;
}


// formulario de agendamentos

function abrirFormAgendamento() {
  document.getElementById("form-agendamento").style.display = "block";
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function fecharFormAgendamento() {
  document.getElementById("form-agendamento").style.display = "none";
  limparFormAgendamento();
}

function limparFormAgendamento() {
  document.getElementById("ag-paciente").value = "";
  document.getElementById("ag-medico").value = "";
  document.getElementById("ag-data").value = "";
  document.getElementById("ag-tipo").value = "PRESENCIAL";

  horarioSelecionado = null;

  document.getElementById("horarios-container").style.display = "none";
  document.getElementById("horarios-vazio").style.display = "block";
  document.getElementById("horarios-cheio").style.display = "none";

  if (cadastrandoPaciente) toggleMiniCadastroPaciente();
}


// criar agendamentos
async function criarAgendamento() {
  const pacienteId = document.getElementById("ag-paciente").value;
  const medico = document.getElementById("ag-medico").value;
  const data = document.getElementById("ag-data").value;
  const tipoAtendimento = document.getElementById("ag-tipo").value;

  if (!pacienteId) {
    mostrarAlerta("ag-erro", "Selecione ou cadastre um paciente.", "erro");
    return;
  }
  if (!medico || !data || !horarioSelecionado) {
    mostrarAlerta("ag-erro", "Selecione médico, data e horário.", "erro");
    return;
  }
  const dataHoraConsulta = `${data}T${horarioSelecionado}:00`;

  try {
    const res = await fetch(API + "/agendamentos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        pacienteId: Number(pacienteId),
        medico,
        dataHoraConsulta,
        tipoAtendimento
      })
    });

    if (!res.ok) {
      const erro = await res.json();
      mostrarAlerta("ag-erro", erro.erro || "Erro ao criar agendamento.", "erro");
      return;
    }

    mostrarAlerta("ag-sucesso", "Agendamento criado com sucesso!", "ok");
    fecharFormAgendamento();
    recarregarAgendamentos();
  } catch (erro) {
    console.error(erro);
    mostrarAlerta("ag-erro", "Erro ao criar agendamento.", "erro");
  }
}


// agendamentos

async function carregarAgendamentos(url = API + "/agendamentos") {
  const loading = document.getElementById("ag-loading");
  const tabela = document.getElementById("ag-tabela");
  const vazio = document.getElementById("ag-vazio");
  const tbody = document.getElementById("ag-tbody");

  loading.style.display = "block";
  tabela.style.display = "none";
  vazio.style.display = "none";

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Erro ao buscar agendamentos.");

    const lista = await response.json();
    loading.style.display = "none";
    if (lista.length === 0) {
      vazio.style.display = "block";
      tbody.innerHTML = "";
      return;
    }
    tbody.innerHTML = "";

    lista.forEach(agendamento => {
      const online = agendamento.tipoAtendimento === "ONLINE";
      const cancelado = agendamento.statusAgendamento === "CANCELADO";

      tbody.innerHTML += `
        <tr>
          <td>${agendamento.paciente?.nome ?? "—"}</td>
          <td>${agendamento.medico}</td>
          <td>${formatarData(agendamento.dataHoraConsulta)}</td>
          <td>
            <span class="badge ${online ? "badge-online" : "badge-presencial"}">
              ${online ? "Online" : "Presencial"}
            </span>
          </td>
          <td>
            <span class="badge ${cancelado ? "badge-cancelado" : "badge-ok"}">
              ${cancelado ? "Cancelado" : "Agendado"}
            </span>
          </td>
          <td>${agendamento.motivoCancelamento ?? "—"}</td>
          <td>
            ${!cancelado
          ? `<button class="btn btn-danger btn-sm" onclick="abrirModalCancelamento(${agendamento.id})">Cancelar</button>`
          : ""}
          </td>
        </tr>
      `;
    });

    tabela.style.display = "table";
  }
  catch (erro) {
    console.error(erro);
    loading.style.display = "none";
    mostrarAlerta("ag-erro", "Erro ao carregar agendamentos.", "erro");
  }
}

function recarregarAgendamentos() {
  carregarAgendamentos();
}


// cancelar

function abrirModalCancelamento(id) {
  idCancelando = id;
  document.getElementById("motivo-cancelamento").value = "";
  document.getElementById("modal-cancelamento").classList.add("aberto");
}

function fecharModal() {
  idCancelando = null;
  document.getElementById("modal-cancelamento").classList.remove("aberto");
}

async function confirmarCancelamento() {
  const motivo = document.getElementById("motivo-cancelamento").value.trim();

  if (!motivo) {
    mostrarAlerta("ag-erro", "Informe o motivo do cancelamento.", "erro");
    return;
  }
  try {
    const response = await fetch(`${API}/agendamentos/cancelar/${idCancelando}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ motivo })
    });

    if (!response.ok) {
      const erro = await response.json();
      mostrarAlerta("ag-erro", erro.erro || "Erro ao cancelar.", "erro");
      return;
    }

    mostrarAlerta("ag-sucesso", "Agendamento cancelado com sucesso!", "ok");
    fecharModal();
    recarregarAgendamentos();
  }
  catch (erro) {
    console.error(erro);
    mostrarAlerta("ag-erro", "Erro ao cancelar agendamento.", "erro");
  }
}


// filtros

function filtrarAgendamentos() {
  const paciente = document.getElementById("filtro-paciente").value;
  const medico = document.getElementById("filtro-medico").value;
  const status = document.getElementById("filtro-status").value;

  const params = new URLSearchParams();

  if (paciente) params.append("pacienteId", paciente);
  if (medico) params.append("medico", medico);
  if (status) params.append("statusAgendamento", status);
  let url = API + "/agendamentos";
  if (params.toString() !== "") url += "?" + params.toString();

  carregarAgendamentos(url);
}


// eventos

document.getElementById("filtro-paciente").addEventListener("change", filtrarAgendamentos);
document.getElementById("filtro-medico").addEventListener("change", filtrarAgendamentos);
document.getElementById("filtro-status").addEventListener("change", filtrarAgendamentos);
document.getElementById("ag-medico").addEventListener("change", buscarHorarios);
document.getElementById("ag-data").addEventListener("change", buscarHorarios);

// fecha modal clicando fora
document.getElementById("modal-cancelamento").addEventListener("click", function (e) {
  if (e.target === this) fecharModal();
});

// data mínima
document.getElementById("ag-data").min = new Date().toISOString().split("T")[0];


// iniciar
async function iniciarSistema() {
  await carregarPacientes();
  await carregarMedicos();
  await carregarAgendamentos();
}

document.addEventListener("DOMContentLoaded", iniciarSistema);

// mmascarar cpf

function mascararCPF(cpf) {
  if (!cpf) return "—";

  const numeros = cpf.replace(/\D/g, "");

  if (numeros.length !== 11) return cpf;

  return `***.***.***-${numeros.slice(-2)}`;
}