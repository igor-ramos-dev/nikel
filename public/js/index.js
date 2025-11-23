// Modal do bootstrap
const myModal = new bootstrap.Modal("#register-modal");

// Retorna o usuário logado no sessionStorage, se existir
let logged = sessionStorage.getItem("logged");

// Retorna a sessão salva no localStorage, se existir
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

// Verifica se há uma conta no localStorage
function getAccount(key) {
  const account = localStorage.getItem(key);

  if (account) {
    return JSON.parse(account);
  }

  return "";
}

// LOGAR NO SISTEMA
document.getElementById("login-form").addEventListener("submit", (e) => {
  // 1 - Impede a atualização da página
  e.preventDefault();

  // 2 - Captura os dados do usuário
  const email = document.getElementById("email-input").value;
  const password = document.getElementById("password-input").value;
  const checkSession = document.getElementById("session-check").checked;

  // 3 - Busca a conta do usuário no localStorage
  const account = getAccount(email);

  // 4 - Caso não exista, informa erro ao usuário
  if (!account) {
    alert("Verifique o usuário ou a senha");
    return;
  }

  // 5 - Verifica se a senha informada é a mesma que já está cadastrada
  if (account.password !== password) {
    alert("Verifique o usuário ou a senha");
    return;
  }

  // 6 - Salva a sessão do usuário
  saveSession(email, checkSession);

  // 7 - Se dados de login forem válidos, redireciona o usuário para a página principal
  window.location.href = "home.html";
});

// Salva a conta no localStorage
function saveAccount(data) {
  localStorage.setItem(data.login, JSON.stringify(data));
}

// Salva a sessão do usuário
function saveSession(data, saveSession) {
  if (saveSession) {
    localStorage.setItem("session", data);
  }

  sessionStorage.setItem("logged", data);
}

// Verifica se o usuário marcou a opção de manter a conta logada
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
