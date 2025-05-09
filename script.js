const progressoPorNome = JSON.parse(localStorage.getItem('progresso')) || {};
let idiomaAtual = 'pt';

const formulario = document.getElementById('formulario');
const nomeInput = document.getElementById('nome');
const horasInput = document.getElementById('horas');
const resposta = document.getElementById('resposta');
const botaoTema = document.getElementById('toggle-theme');
const botaoIdioma = document.getElementById('botao-idioma');
const botaoAdicionar = document.getElementById('botao-adicionar');
const botaoLimpar = document.getElementById('botao-limpar');

// Idiomas
const textos = {
  pt: {
    titulo: "FocusTime",
    nome: "Nome:",
    placeholderNome: "Seu nome",
    horas: "Horas estudadas:",
    placeholderHoras: "Ex: 2",
    botaoAdicionar: "Adicionar",
    botaoLimpar: "Limpar",
    respostaInicial: "Digite seu nome e as horas estudadas.",
    respostaFinal: (nome, horas) => `${nome} já estudou ${horas} hora(s).`,
    idiomaBotao: "🇺🇸 English"
  },
  en: {
    titulo: "FocusTime",
    nome: "Name:",
    placeholderNome: "Your name",
    horas: "Study hours:",
    placeholderHoras: "Ex: 2",
    botaoAdicionar: "Add",
    botaoLimpar: "Clear",
    respostaInicial: "Enter your name and study hours.",
    respostaFinal: (nome, horas) => `${nome} has studied ${horas} hour(s).`,
    idiomaBotao: "🇧🇷 Português"
  }
};

// Função para trocar idioma
function alternarIdioma() {
  idiomaAtual = idiomaAtual === 'pt' ? 'en' : 'pt';
  atualizarIdioma();
}

function atualizarIdioma() {
  const t = textos[idiomaAtual];

  document.querySelector('h1').innerText = t.titulo;
  document.querySelector('label[for="nome"]').innerText = t.nome;
  document.querySelector('label[for="horas"]').innerText = t.horas;
  botaoAdicionar.innerText = t.botaoAdicionar;
  botaoLimpar.innerText = t.botaoLimpar;
  nomeInput.placeholder = t.placeholderNome;
  horasInput.placeholder = t.placeholderHoras;
  botaoIdioma.innerText = t.idiomaBotao;
  resposta.innerText = t.respostaInicial;
}

// Evento do formulário
formulario.addEventListener('submit', function (e) {
  e.preventDefault();

  const nome = nomeInput.value.trim();
  const horas = parseFloat(horasInput.value);

  if (!nome || isNaN(horas)) {
    alert("Preencha corretamente!");
    return;
  }

  if (!progressoPorNome[nome]) {
    progressoPorNome[nome] = 0;
  }

  progressoPorNome[nome] += horas;

  // Atualiza localStorage
  localStorage.setItem('progresso', JSON.stringify(progressoPorNome));

  resposta.innerText = textos[idiomaAtual].respostaFinal(nome, progressoPorNome[nome]);

  horasInput.value = '';
});

// Evento de limpar
botaoLimpar.addEventListener('click', function (e) {
  e.preventDefault();
  nomeInput.value = '';
  horasInput.value = '';
  resposta.innerText = textos[idiomaAtual].respostaInicial;
});

// Evento de tema escuro
botaoTema.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
});

// Evento de idioma
botaoIdioma.addEventListener('click', alternarIdioma);

// Inicialização
atualizarIdioma();
