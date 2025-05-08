document.addEventListener('DOMContentLoaded', () => {
    // Recuperar dados do localStorage
    const requestData = JSON.parse(localStorage.getItem('requestData'));
    
    // if (!requestData) {
    //     window.location.href = 'index.html';
    //     return;
    // }

    // Preencher os dados na página
    document.getElementById('requestDate').textContent = requestData.date;
    document.getElementById('requestTime').textContent = requestData.time;
    document.getElementById('pixKeyDisplay').textContent = requestData.pixKey;
    document.getElementById('transactionCode').textContent = requestData.transactionCode;
    document.getElementById('authCode').textContent = requestData.authCode;

    // Limpar dados do localStorage após exibir
    localStorage.removeItem('requestData');

    // Adicionar evento ao botão de próxima etapa
    document.querySelector('.continue-btn').addEventListener('click', () => {
        // Aqui você pode adicionar a lógica para a próxima etapa
        console.log('Próxima etapa');
    });
});