document.addEventListener('DOMContentLoaded', () => {
    const dateOptions = document.querySelectorAll('.date-option');
    const selectedDateDiv = document.getElementById('selected-date');
    const continueBtn = document.querySelector('.continue-btn');

    function getPaymentDate(selectedDay) {
        const today = new Date();
        let futureDate = new Date(2025, 1); // February 2025
        
        // Add 3 months
        futureDate.setMonth(futureDate.getMonth() + 3);
        
        // Set the selected day
        futureDate.setDate(selectedDay);

        // Format the date
        const months = [
            'janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho',
            'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'
        ];

        return `${selectedDay} de ${months[futureDate.getMonth()]} de ${futureDate.getFullYear()}`;
    }

    dateOptions.forEach(option => {
        option.addEventListener('click', () => {
            // Remove previous selection
            dateOptions.forEach(opt => opt.classList.remove('selected'));
            
            // Add selection to clicked option
            option.classList.add('selected');
            
            // Get selected day
            const selectedDay = option.getAttribute('data-day');
            
            // Update selected date display
            selectedDateDiv.innerHTML = `Primeiro pagamento em: ${getPaymentDate(selectedDay)}`;
            selectedDateDiv.classList.add('visible');
            
            // Enable continue button
            continueBtn.disabled = false;
        });
    });
});