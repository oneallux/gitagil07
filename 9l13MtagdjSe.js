document.addEventListener('DOMContentLoaded', () => {
    let currentStep = 1;
    const totalSteps = 3;
    let selectedOptions = {
        step1: null,
        step2: null,
        step3: null
    };

    function showStep(stepNumber) {
        // Hide all steps
        document.querySelectorAll('.step').forEach(step => {
            step.style.display = 'none';
        });
        
        // Show current step
        const currentStepElement = document.getElementById(`step${stepNumber}`);
        if (currentStepElement) {
            currentStepElement.style.display = 'block';
        }
    }

    function handleOptionSelection(stepNumber, optionElement) {
        // Remove selection from other options in the same step
        const stepElement = document.getElementById(`step${stepNumber}`);
        stepElement.querySelectorAll('.option-btn').forEach(btn => {
            btn.classList.remove('selected');
        });
        
        // Add selection to clicked option
        optionElement.classList.add('selected');
        selectedOptions[`step${stepNumber}`] = optionElement.textContent;

        // Show continue button if it exists in this step
        const continueBtn = stepElement.querySelector('.continue-btn');
        if (continueBtn) {
            continueBtn.disabled = false;
        } else if (stepNumber < totalSteps) {
            // If there's no continue button, automatically go to next step
            setTimeout(() => {
                currentStep++;
                showStep(currentStep);
            }, 300);
        }
    }

    // Add click event listeners to all option buttons
    document.querySelectorAll('.option-btn').forEach(button => {
        button.addEventListener('click', () => {
            const stepElement = button.closest('.step');
            const stepNumber = parseInt(stepElement.id.replace('step', ''));
            handleOptionSelection(stepNumber, button);
        });
    });

    // Add click event listeners to continue buttons
    document.querySelectorAll('.continue-btn').forEach(button => {
        button.addEventListener('click', () => {
            const stepElement = button.closest('.step');
            const stepNumber = parseInt(stepElement.id.replace('step', ''));
            
            if (stepNumber < totalSteps) {
                currentStep++;
                showStep(currentStep);
            } else {
                // Handle form submission
                console.log('Form completed!', selectedOptions);
                // Substitua esta linha por uma ação, como redirecionar ou exibir uma mensagem na página.
                console.log('Formulário enviado com sucesso!');
            }
        });
    });

    // Initialize continue buttons as disabled
    document.querySelectorAll('.continue-btn').forEach(button => {
        button.disabled = true;
    });

    // Show initial step
    showStep(currentStep);
});
