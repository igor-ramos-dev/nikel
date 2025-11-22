const myModal = new bootstrap.Modal("#register-modal");
let logged = sessionStorage.getItem("logged");
const session = localStorage.getItem("session");

// 1 - Verificar se existe um usuário já logado
// 2 - Se existir um usuário logado, direcionar para a página Home
// 3 - Caso contrário, manter o usuário na página de login
checkLogged();

// CRIAR CONTA
document.getElementById("create-form").addEventListener("submit", (e) => {
  // 1 - Remove o carregamento da página ao submeter um formulário.
  e.preventDefault();

  // 2 - Captura os dados informados pelo usuário no formulário
  const email = document.getElementById("email-create-input").value;
  const password = document.getElementById("password-create-input").value;

  // 3 - Verifica se o que foi digitado atende aos critérios mínimos
  if (email.length < 5) {
    alert("Email inválido!");
    return;
  }

  if (password.length < 4) {
    alert("Preencha a senha com no mínimo 4 dígitos");
    return;
  }

  // 4 - Verifica se o email já foi cadastrado
  const usuarioExistente = localStorage.getItem(email);

  if (usuarioExistente) {
    alert("E-mail já cadastrado");
    return;
  }

  // 5 - Armazena os dados da conta no localStorage
  saveAccount({
    login: email,
    password: password,
    transactions: [],
  });

  // 6 - Limpa os campos do formulário
  e.target.reset();

  // 7 - Fecha o Modal
  myModal.hide();

  // 8 - Fornece um feedback positivo ao usuário
  alert("Conta criada com sucesso!");
});

function getAccount(key) {
  const account = localStorage.getItem(key);

  if (account) {
    return JSON.parse(account);
  }

  return "";
}

// LOGAR NO SISTEMA
document.getElementById("login-form").addEventListener("submit", (e) => {
  e.preventDefault();

  const email = document.getElementById("email-input").value;
  const password = document.getElementById("password-input").value;
  const checkSession = document.getElementById("session-check").checked;

  const account = getAccount(email);

  if (!account) {
    alert("Verifique o usuário ou a senha");
    return;
  }

  if (account.password !== password) {
    alert("Verifique o usuário ou a senha");
    return;
  }

  saveSession(email, checkSession);

  window.location.href = "home.html";
});

function saveAccount(data) {
  localStorage.setItem(data.login, JSON.stringify(data));
}

function saveSession(data, saveSession) {
  if (saveSession) {
    localStorage.setItem("session", data);
  }

  sessionStorage.setItem("logged", data);
}

function checkLogged() {
  if (session) {
    sessionStorage.setItem("logged", session);
    logged = session;
  }

  if (logged) {
    saveSession(logged, session);
    window.location.href = "home.html";
  }
}
