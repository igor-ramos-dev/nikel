// Modal do bootstrap
const myModal = new bootstrap.Modal("#transaction-modal");

// Retorna o usuário logado no sessionStorage, se existir
let logged = sessionStorage.getItem("logged");

// Retorna a sessão salva no localStorage, se existir
const session = localStorage.getItem("session");

// Cria o array que armazenará as transações
let data = {
  transactions: [],
};

// ENCERRAR SESSÃO DO USUÁRIO
document.getElementById("button-logout").addEventListener("click", logout);

// Redireciona o usuário para a página de transações
document.getElementById("transaction-button").addEventListener("click", () => {
  window.location.href = "transactions.html";
});

// ADICIONAR LANÇAMENTO
document.getElementById("transaction-form").addEventListener("submit", (e) => {
  // Evita a atualização da página
  e.preventDefault();

  // Variável p/ armazenar o valor
  const value = +document.getElementById("value-input").value;

  // Variável p/ armazenar a descrição
  const description = document.getElementById("description-input").value;

  // Variável p/ armazenar a data
  const date = document.getElementById("date-input").value;

  // Variável p/ armazenar o "tipo" (se é entrada ou saída)
  const type = document.querySelector('input[name="type-input"]:checked').value;

  // Adiciona a transação no começo do array
  // Para que seja renderizada no topo da tela
  data.transactions.unshift({
    value,
    type,
    description,
    date,
  });

  // Salva os dados das transações
  saveData(data);

  // Limpa o formulário
  e.target.reset();

  // Fecha o Modal
  myModal.hide();

  // Renderiza as entradas das transações
  getCashIn();
  // Renderiza as saídas
  getCashOut();
  // Renderiza o total
  getTotal();

  // Mensagem bem sucedida de envio do formulário
  alert("Lançamento adicionado com sucesso!");
});

// 1 - Verificar se existe um usuário já logado
// 2 - Se existir um usuário logado, direcionar para a página Home
// 3 - Caso contrário, manter o usuário na página de login
checkLogged();

function checkLogged() {
  // Se existe uma sessão salva, a coloca como usuário logado
  if (session) {
    sessionStorage.setItem("logged", session);
    logged = session;
  }

  // Se não estiver logado, volta para a home (login)
  if (!logged) {
    window.location.href = "home.html";
    return;
  }

  // Pega os dados no localStorage do usuário logado
  const dataUser = localStorage.getItem(logged);

  // Transforma os dados em objeto
  if (dataUser) {
    data = JSON.parse(dataUser);
  }

  // Renderiza as entradas das transações
  getCashIn();
  // Renderiza as saídas
  getCashOut();
  // Renderiza o total
  getTotal();
}

// Desloga o usuário e retorna para a página de login
function logout() {
  sessionStorage.removeItem("logged");
  localStorage.removeItem("session");

  window.location.href = "index.html";
}

// Salva todos os dados do usuário
function saveData(data) {
  localStorage.setItem(data.login, JSON.stringify(data));
}

// Renderiza as entradas das transações
function getCashIn() {
  const transactions = data.transactions;

  // Pega as entradas
  const cashIn = transactions.filter((item) => item.type === "1");

  // Renderiza as 5 últimas entradas
  if (cashIn) {
    let cashInHtml = "";
    const limit = cashIn.length >= 5 ? 5 : cashIn.length;

    for (let i = 0; i < limit; i++) {
      cashInHtml += `<div class="row mb-4">
                      <div class="col-12"> 
                        <h3 class="fs-2">R$${cashIn[i].value.toFixed(2)}</h3>
                        <div class="container p-0">
                          <div class="row">
                            <div class="col-12 col-md-8"><p>${
                              cashIn[i].description
                            }</p></div>
                            <div
                              class="col-12 col-md-3 d-flex justify-content-end"
                            >
                             ${cashIn[i].date}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>`;
    }

    document.getElementById("cash-in-list").innerHTML = cashInHtml;
  }
}

// Renderiza as saídas das transações
function getCashOut() {
  const transactions = data.transactions;

  // Pega as Saídas
  const cashOut = transactions.filter((item) => item.type === "2");

  // Renderiza as 5 últimas saídas
  if (cashOut) {
    let cashOutHtml = "";
    const limit = cashOut.length >= 5 ? 5 : cashOut.length;

    for (let i = 0; i < limit; i++) {
      cashOutHtml += `<div class="row mb-4">
                      <div class="col-12"> 
                        <h3 class="fs-2">R$${cashOut[i].value.toFixed(2)}</h3>
                        <div class="container p-0">
                          <div class="row">
                            <div class="col-12 col-md-8"><p>${
                              cashOut[i].description
                            }</p></div>
                            <div
                              class="col-12 col-md-3 d-flex justify-content-end"
                            >
                             ${cashOut[i].date}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>`;
    }

    document.getElementById("cash-out-list").innerHTML = cashOutHtml;
  }
}

// Renderiza o valor total das transações
function getTotal() {
  const transactions = data.transactions;
  let total = 0;

  // As entradas são somadas ao valor total
  // Enquanto as saídas são subtraídas
  transactions.forEach((item) => {
    if (item.type === "1") {
      total += item.value;
    } else {
      total -= item.value;
    }
  });

  document.getElementById("total").innerHTML = `R$${total.toFixed(2)}`;
}
