document.addEventListener("DOMContentLoaded", () => {
    console.log("🚀 Recuperando dados do CPF...");

    // Recupera os dados do localStorage
    const nomeCompleto = sessionStorage.getItem("primeiroNome");
    const dataNascimento = sessionStorage.getItem("dataNascimento");
    const sexo = sessionStorage.getItem("sexo");

    // Elementos da página
    const nomeElement = document.getElementById("nome");
    const messageElement = document.getElementById("message");
    const continueBtn = document.getElementById("continueBtn");
    const erroMensagem = document.getElementById("mensagemErro");

    // Função para simular efeito de digitação
    function typeWriter(element, text, speed = 50) {
        let i = 0;
        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            } else {
                // Quando terminar de digitar, mostra os outros elementos
                messageElement.classList.add("show");
                continueBtn.classList.add("show");
            }
        }
        type();
    }

    // Verifica se os dados estão disponíveis
    if (nomeCompleto) {
        console.log("✅ Dados encontrados no localStorage");
        
        // Inicia o efeito de digitação após um pequeno delay
        setTimeout(() => {
            typeWriter(nomeElement, nomeCompleto);
        }, 500);
    } else {
        console.error("❌ Nenhum dado encontrado no localStorage");
        
        // Exibe mensagem de erro na página
        erroMensagem.textContent = "Erro: Nenhum dado encontrado. Por favor, volte para o site anterior e preencha as informações.";
        erroMensagem.classList.add("error");

        // Opcional: alerta para o usuário
        alert("Erro: Nenhum dado encontrado. Por favor, volte para o site anterior e preencha as informações.");
    }

    // Adiciona evento de clique ao botão continuar
    continueBtn.addEventListener("click", (event) => {
        event.preventDefault();

        window.location.href = '../page-04' + window.location.search;
    });
});
