function calcularPeso() {
    const pesoNaTerra = parseFloat(document.getElementById('peso-terra').value);
    const planetaSelecionado = document.getElementById('planeta').value;
    const resultadoElemento = document.getElementById('resultado-peso');

    if (isNaN(pesoNaTerra) || pesoNaTerra <= 0) {
        resultadoElemento.value = "Por favor, insira um peso válido.";
        return;
    }

    const gravidades = {
        mercurio: 0.38,
        venus: 0.91,
        terra: 1.00,
        marte: 0.38,
        jupiter: 2.34,
        saturno: 1.06, 
        urano: 0.92,
        netuno: 1.19
    };

    const nomesPlanetas = {
        mercurio: "Mercúrio",
        venus: "Vênus",
        terra: "Terra",
        marte: "Marte",
        jupiter: "Júpiter",
        saturno: "Saturno",
        urano: "Urano",
        netuno: "Netuno"
    };

    const gravidadePlaneta = gravidades[planetaSelecionado];
    const pesoNoPlaneta = pesoNaTerra * gravidadePlaneta;
    const nomePlaneta = nomesPlanetas[planetaSelecionado];

    resultadoElemento.value = `Seu peso em ${nomePlaneta} seria ${pesoNoPlaneta.toFixed(2)} kg.`;
}

document.addEventListener('DOMContentLoaded', function() {
    const calcularBtn = document.querySelector('.calculadora button');
    calcularBtn.addEventListener('click', calcularPeso);
    
    document.getElementById('peso-terra').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            calcularPeso();
        }
    });
});