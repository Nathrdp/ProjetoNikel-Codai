//Variáveis e seletores
const myModal = new bootstrap.Modal("#register-modal");
let logged = sessionStorage.getItem("logged");
const session = localStorage.getItem("session");

// Chamar a função para checar se está logado
checkLoggged();

// Logar no sistema
document.getElementById("login-form").addEventListener("submit", function(e) {
    e.preventDefault();     

    //Pegar os valores dos inputs
    const email = document.getElementById("email-input").value;
    const password = document.getElementById("password-input").value;
    const checksession = document.getElementById("session-check").checked;

    const account = getAccount(email);

    if(!account) {
        alert("Ops! Verifique o usuário ou a senha.");
        return;
    }

    if(account) {
        if(account.password !== password) {
            alert("Ops! Verifique o usuário ou a senha.");
            return;
        }

        saveSession(email, checksession);

        window.location.href = "home.html";
    }
});

// Criar conta
document.getElementById("create-form").addEventListener("submit", function(e) {
    e.preventDefault();

    const email = document.getElementById("email-create-input").value;
    const password = document.getElementById("password-creat-input").value;

    if(email.length <5) {
        alert("Por favor, insira um e-mail válido.");
        return
    }

    if(password.length <4) {
        alert("Por favor, insira uma senha com no mínimo 4 caracteres.");
        return
    }

    saveAccount({
        login: email,
        password: password,
        transactions: []
    });

    myModal.hide();

    alert("Conta criada com sucesso!");

});

// Funções
function checkLoggged() {
    if(session) {
        sessionStorage.setItem("logged", session);
        logged = session;
    }

    if(logged) {
        saveSession(logged, session);
        window.location.href = "home.html";
    }
}

function saveAccount(data) {
    localStorage.setItem(data.login, JSON.stringify(data));
}

function saveSession(data, saveSession) {
    if(saveSession) {
        localStorage.setItem("session", data);
    }

    sessionStorage.setItem("logged", data);
}

function getAccount(key) {
    const account = localStorage.getItem(key);
    
    if(account) {
        return JSON.parse(account);
    }
    return "";
}

