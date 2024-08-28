// Seletores de elementos
const btnEncrypt = document.querySelector('#btn-encrypt');
const btnDecrypt = document.querySelector('#btn-decrypt');
const btnCopy = document.querySelector('#btn-copy');
const textarea = document.querySelector('.textarea');
const resultText = document.querySelector('.result__text');
const noResult = document.querySelector('.no-result');
const resultContainer = document.querySelector('.result-container');

// Funções de criptografia e descriptografia
function encrypt(text) {
    const substitutions = {
        'a': 'ai',
        'e': 'enter',
        'i': 'imes',
        'o': 'ober',
        'u': 'ufat'
    };
    return text.replace(/[aeiou]/g, match => substitutions[match]);
}

function decrypt(text) {
    const substitutions = {
        'ai': 'a',
        'enter': 'e',
        'imes': 'i',
        'ober': 'o',
        'ufat': 'u'
    };
    return text.replace(/ai|enter|imes|ober|ufat/g, match => substitutions[match]);
}

// Funções para exibir e esconder a mensagem
function showResult(message) {
    noResult.classList.add('inative');
    resultContainer.querySelector('.result').classList.add('active');
    resultText.textContent = message;
}

function showNoResult() {
    noResult.classList.remove('inative');
    resultContainer.querySelector('.result').classList.remove('active');
}

// Função de copiar para a área de transferência
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        showToast("Texto copiado!");
    }).catch(err => {
        console.error('Erro ao copiar texto: ', err);
    });
}

// Função de exibir toast
const toast = document.querySelector(".toast");
let toastTimeOut;

function showToast(msg) {
    toast.innerText = `${msg}`;
    toast.classList.add("active");
    clearTimeout(toastTimeOut);
    toastTimeOut = setTimeout(hideToast, 2500);
}

function hideToast() {
    toast.classList.remove("active");
}

// Adicionando eventos aos botões
btnEncrypt.addEventListener('click', () => {
    const inputText = textarea.value;
    if (inputText) {
        const encryptedText = encrypt(inputText);
        showResult(encryptedText);
    } else {
        showNoResult();
    }
});

btnDecrypt.addEventListener('click', () => {
    const inputText = textarea.value;
    if (inputText) {
        const decryptedText = decrypt(inputText);
        showResult(decryptedText);
    } else {
        showNoResult();
    }
});

btnCopy.addEventListener('click', () => {
    copyToClipboard(resultText.textContent);
});
