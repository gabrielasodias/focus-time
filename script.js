const idiomas = {
  pt: {
    titulo: "FocusTime",
    subtitulo: "Sua calculadora de horas de estudo",
    nomeLabel: "Nome:",
    horasLabel: "Horas de estudo:",
    botaoAdicionar: "Adicionar",
    botaoLimpar: "Limpar",
    idiomaBotao: "🇺🇸 English"
  },
  en: {
    titulo: "FocusTime",
    subtitulo: "Your study hours calculator",
    nomeLabel: "Name:",
    horasLabel: "Study hours:",
    botaoAdicionar: "Add",
    botaoLimpar: "Clear",
    idiomaBotao: "🇧🇷 Português"
  }
};

let idiomaAtual = "pt";

function atualizarIdioma() {
  const i = idiomas[idiomaAtual];
  document.getElementById("titulo").textContent = i.titulo;
  document.getElementById("subtitulo").textContent = i.subtitulo;
  document.getElementById("nome-label").textContent = i.nomeLabel;
  document.getElementById("horas-label").textContent = i.horasLabel;
  document.getElementById("botao-adicionar").textContent = i.botaoAdicionar;
  document.getElementById("botao-limpar").textContent = i.botaoLimpar;
  document.getElementById("botao-idioma").textContent = i.idiomaBotao;
}

document.getElementById("botao-idioma").addEventListener("click", () => {
  idiomaAtual = idiomaAtual === "pt" ? "en" : "pt";
  atualizarIdioma();
});

atualizarIdioma(); // Carregando idioma inicial

// Salvando o progresso
const resposta = document.getElementById("resposta");
let totalHoras = Number(localStorage.getItem("totalHoras")) || 0;

document.getElementById("botao-adicionar").addEventListener("click", () => {
  const nome = document.getElementById("nome").value.trim();
  const horas = Number(document.getElementById("horas").value);

  if (nome === "" || isNaN(horas) || horas < 0) {
    resposta.textContent = idiomaAtual === "pt" ? "Preencha os campos corretamente!" : "Please fill in the fields correctly!";
    resposta.style.color = "red";
    return;
  }

  totalHoras += horas;
  localStorage.setItem("totalHoras", totalHoras);

  resposta.textContent =
    idiomaAtual === "pt"
      ? `Olá, ${nome}! Você estudou ${horas} horas hoje. Total: ${totalHoras} horas.`
      : `Hi, ${nome}! You studied ${horas} hours today. Total: ${totalHoras} hours.`;

  resposta.style.color = "green";
});

document.getElementById('toggle-theme').addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
});

document.getElementById("botao-limpar").addEventListener("click", () => {
  document.getElementById("nome").value = "";
  document.getElementById("horas").value = "";
  resposta.textContent = "";
  localStorage.removeItem("totalHoras");
  totalHoras = 0;
});