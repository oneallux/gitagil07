document.addEventListener('DOMContentLoaded', function() {
    // Recupera o valor do localStorage
    const savedValue = localStorage.getItem('sliderValue');
    
    // Se existir um valor salvo, exibe-o no elemento com a classe 'value'
    if (savedValue !== null) {
        const valueDisplay = document.querySelector('.value');
        if (valueDisplay) {
            // Formata o valor como moeda brasileira
            const formattedValue = new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL'
            }).format(savedValue);
            
            valueDisplay.textContent = formattedValue;
        }
    }

    // Adiciona eventos de clique aos botões
    const selectButtons = document.querySelectorAll('.select-button');
    
    selectButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Aqui você pode adicionar a lógica para cada opção
            const optionType = button.closest('.option-card').querySelector('h3').textContent;
            
            // Você pode usar o valor salvo do localStorage na lógica do clique
            const selectedValue = localStorage.getItem('sliderValue');
        });
    });
});
