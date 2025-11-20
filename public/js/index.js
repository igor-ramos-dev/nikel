const myModal = new bootstrap.Modal("#register-modal");

document.getElementById("create-form").addEventListener("submit", (e) => {
  e.preventDefault();

  const email = document.getElementById("email-create-input").value;
  const password = document.getElementById("password-create-input").value;

  if (email.length < 5) {
    alert("Email inválido!");
    return;
  }

  if (password.length < 4) {
    alert("Preencha a senha com no mínimo 4 dígitos");
    return;
  }

  saveAccount({
    login: email,
    password: password,
    transactions: [],
  });

  alert("Conta criada com sucesso!");
  myModal.hide();
});

function saveAccount(data) {
  localStorage.setItem(data.login, JSON.stringify(data));
}
