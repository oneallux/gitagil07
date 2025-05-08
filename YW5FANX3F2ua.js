const slider = document.getElementById('loanSlider');
const valueDisplay = document.getElementById('value');
const loanForm = document.getElementById('loan-form');
const loadingScreen = document.getElementById('loading-screen');
const approvalScreen = document.getElementById('approval-screen');
const installmentsScreen = document.getElementById('installments-screen');
const highlightValue = document.getElementById('highlight-value');
const cpfDisplayElement = document.querySelector('.cpf'); // Selecionando o elemento onde o CPF será exibido

// Formatar moeda
function formatCurrency(value) {
  return new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value);
}

// Atualizar valor exibido
function updateValue() {
  const value = slider.value;
  valueDisplay.textContent = formatCurrency(value);
  // Salvar no localStorage
  localStorage.setItem('sliderValue', value);
}

// Recuperar valor do slider e CPF no carregamento da página
window.addEventListener('load', () => {
  console.log("🚀 Recuperando dados do localStorage...");
  
  // Recuperar o valor do slider
  const savedValue = localStorage.getItem('sliderValue');
  if (savedValue !== null) {
    slider.value = savedValue;
    updateValue();
  }

  // Recuperar o CPF
  const cpf = localStorage.getItem('cpf');
  if (cpf) {
    console.log("✅ CPF recuperado:", cpf);
    // Exibir o CPF na página
    cpfDisplayElement.textContent = `CPF: ${cpf}`; // Atualizando o texto da tag com o CPF
  } else {
    console.warn("❌ Nenhum CPF encontrado no localStorage.");
    cpfDisplayElement.textContent = "CPF não encontrado."; // Exibe mensagem de erro caso não encontre o CPF
    alert("Erro: Nenhum CPF encontrado. Por favor, volte ao site anterior e preencha as informações.");
    // Opcional: Redirecionar para a página anterior
    // window.location.href = '/pagina-anterior.html';
  }
});

// Atualizar o valor exibido ao interagir com o slider
slider.addEventListener('input', updateValue);

// Definir valor inicial
updateValue();

function startAnalysis() {
  loanForm.classList.add('hidden');
  loadingScreen.classList.remove('hidden');
  
  const steps = document.querySelectorAll('.step');
  let currentStep = 0;

  function showNextStep() {
    if (currentStep < steps.length) {
      steps[currentStep].classList.add('active');
      currentStep++;
      setTimeout(showNextStep, 1000);
    } else {
      setTimeout(showApprovalScreen, 1000);
    }
  }

  showNextStep();
}

function showApprovalScreen() {
  loadingScreen.classList.add('hidden');
  approvalScreen.classList.remove('hidden');
  
  const approvedValueElement = document.getElementById('approved-value');
  const formattedValue = `R$ ${formatCurrency(slider.value)}`;
  approvedValueElement.textContent = formattedValue;
  highlightValue.textContent = formattedValue;
}

function showInstallments() {
  approvalScreen.classList.add('hidden');
  installmentsScreen.classList.remove('hidden');
  
  const loanAmount = parseFloat(slider.value);
  const installmentsList = document.getElementById('installments-list');
  installmentsList.innerHTML = '';
  
  const periods = [12, 24, 36, 48, 60, 98];
  periods.forEach(period => {
    const monthlyPayment = loanAmount / period;
    const option = document.createElement('div');
    option.className = 'installment-option';
    option.textContent = `${period}x de R$ ${formatCurrency(monthlyPayment)}`;
    
    option.addEventListener('click', () => {
      document.querySelectorAll('.installment-option').forEach(opt => {
        opt.classList.remove('selected');
      });
      option.classList.add('selected');
    });
    
    installmentsList.appendChild(option);
  });
}
