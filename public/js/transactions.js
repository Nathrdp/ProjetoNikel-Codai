//Variáveis e seletores
const myModal = new bootstrap.Modal("#transaction-modal");
let logged = sessionStorage.getItem("logged");
const session = localStorage.getItem("session");

let data = {
    transactions: []
};

//Eventos
document.getElementById("button-logout").addEventListener("click", logout);

//Adicionar lançamento
document.getElementById("transaction-form").addEventListener("submit", function(e) {
    e.preventDefault(); 

    const value = parseFloat(document.getElementById("value-input").value);
    const description = document.getElementById("description-input").value;
    const date = document.getElementById("date-input").value;
    const type = document.querySelector('input[name="type-input"]:checked').value;

    //Unshift adiciona no início do array
    data.transactions.unshift({
        value: value,
        type: type,
        description: description,
        date: date
    });

    //Target reset para limpar o formulário após o submit
    saveData(data);
    e.target.reset();
    myModal.hide();

    getTransactions();

    alert("Lançamento adicionado com sucesso!");
});

// Chamar a função para checar se está logado
checkLoggged();

// Funções
function checkLoggged() {
    if(session) {
        sessionStorage.setItem("logged", session);
        logged = session;
    }

    if(!logged) {
        window.location.href = "index.html";
    }

    const dataUser = localStorage.getItem(logged);
    if(dataUser) {
        data = JSON.parse(dataUser);
    }

    getTransactions();
}

function logout() {
    sessionStorage.removeItem("logged");
    localStorage.removeItem("session");

    window.location.href = "index.html";
}

function getTransactions() {
    const transactions = data.transactions;
    let transactionsHtml = ``;

    if(transactions.length) {
        transactions.forEach((item) => {
            let type = "Entrada";

            if(item.type === "2") {
                type = "Saída";
            }

            transactionsHtml += `
            <tr>
                <th scope="row">${item.date}/th>
                <td>${item.value.toFixed(2)}</td>
                <td>${type}</td>
                <td>${item.description}</td>
            </tr>
            `
        });
    }

    document.getElementById("transactions-list").innerHTML = transactionsHtml;
}

function saveData(data) {
    localStorage.setItem(logged, JSON.stringify(data));
}