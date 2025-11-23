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

// Desloga o usuário e retorna para a página de login
function logout() {
  sessionStorage.removeItem("logged");
  localStorage.removeItem("session");

  window.location.href = "index.html";
}

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

  // Renderiza todas as transações
  getTransactions();

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

  // Renderiza todas as transações
  getTransactions();
}

// Salva todos os dados do usuário
function saveData(data) {
  localStorage.setItem(data.login, JSON.stringify(data));
}

// Renderiza todas as transações
function getTransactions() {
  const transactions = data.transactions;
  let transactionsHtml = ``;

  // Checa se a transação é uma entrada ou uma saída
  transactions?.forEach((item) => {
    const type = item.type === "1" ? "Entrada" : "Saída";

    transactionsHtml += `<tr>
                        <th scope="row">${item.date}</th>
                        <td>${item.value.toFixed(2)}</td>
                        <td>${type}</td>
                        <td>${item.description}</td>
                      </tr>`;
  });

  document.getElementById("transactions-list").innerHTML = transactionsHtml;
}

// Acompanha a transação no campo de busca
document
  .getElementById("search-input")
  .addEventListener("input", filterTransactions);

// Filtra as transações pelo campo de busca
function filterTransactions() {
  // Variável p/ armazenar o que foi digitado
  const searchTerm = document
    .getElementById("search-input")
    .value.toLowerCase();

  // Variável que armazena a filtragem de todas as transações buscadas
  const filtered = data.transactions.filter((item) =>
    item.description.toLowerCase().includes(searchTerm)
  );

  // Chama a função que renderiza o resultado da busca
  renderFilteredTransactions(filtered);
}

// Renderiza o resultado da busca
function renderFilteredTransactions(list) {
  let html = "";

  // Checa se a transação é uma entrada ou uma saída
  list.forEach((item) => {
    const type = item.type === "1" ? "Entrada" : "Saída";

    html += `<tr>
              <th scope="row">${item.date}</th>
              <td>${item.value.toFixed(2)}</td>
              <td>${type}</td>
              <td>${item.description}</td>
            </tr>`;
  });

  document.getElementById("transactions-list").innerHTML = html;
}
