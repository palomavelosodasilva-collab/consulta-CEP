const formulario = document.getElementById("cep-form");
const campocep = document.getElementById("cep");
const mensagem = document.getElementById("mensagem");
const resultado = document.getElementById("resultado");

async function processar(evento) {
    evento.preventDefault();

    let cep = campocep.value.trim();

    // Validação de formato (12345678 ou 12345-678)
    if (!/^\d{5}-?\d{3}$/.test(cep)) {
        mensagem.textContent = "CEP inválido. Digite no formato 12328-070 ou 12328070.";
        resultado.hidden = true;
        return;
    }

    cep = cep.replace("-", "");

    mensagem.textContent = "Consultando...";
    resultado.hidden = true;

    try {
        const resposta = await fetch(`https://viacep.com.br/ws/${cep}/json/`);

        if (!resposta.ok) {
            throw new Error("Erro de resposta do servidor.");
        }

        const r = await resposta.json();

        if (r.erro) {
            mensagem.textContent = "CEP não encontrado. Verifique e tente novamente.";
            resultado.hidden = true;
            return;
        }

        document.getElementById("valor-cep").textContent = r.cep || "-";
        document.getElementById("valor-logradouro").textContent = r.logradouro || "-";
        document.getElementById("valor-bairro").textContent = r.bairro || "-";
        document.getElementById("valor-cidade").textContent = r.localidade || "-";
        document.getElementById("valor-uf").textContent = r.uf || "-";
        document.getElementById("valor-ibge").textContent = r.ibge || "-";

        resultado.hidden = false;
        mensagem.textContent = "Consulta realizada com sucesso!";
    } catch (erro) {
        mensagem.textContent = "Erro ao consultar o serviço. Verifique sua conexão e tente novamente.";
        resultado.hidden = true;
        console.error(erro);
    }
}

formulario.addEventListener("submit", processar);