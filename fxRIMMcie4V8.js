document.addEventListener('DOMContentLoaded', function() {
    // Recupera o valor do empréstimo e a chave Pix do localStorage
    const savedValue = localStorage.getItem('sliderValue');
    const pixKey = localStorage.getItem('pixKey'); // Puxa a chave Pix do localStorage

    // Se existir um valor salvo, exibe-o no elemento com id 'loanAmount'
    if (savedValue !== null) {
        const loanAmountElement = document.getElementById('loanAmount');
        if (loanAmountElement) {
            // Formata o valor como moeda brasileira
            const formattedValue = new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL'
            }).format(savedValue);
            
            loanAmountElement.textContent = formattedValue;
        }
    }

    // Se existir uma chave Pix, exibe-a no elemento com a classe 'pix-info'
    const pixInfoElement = document.querySelector('.pix-info');
    if (pixKey !== null && pixInfoElement) {
        pixInfoElement.textContent = `Chave PIX: ${pixKey}`;
    }
});
