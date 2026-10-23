// SELECIONA OS ELEMENTOS DO FORMULARIO

const amount = document.getElementById("amount")

//CAPTURA DO EVENTO E FORMATAR O VALOR

amount.oninput = () => {
    //capturando o valor atual do input e remove caracteres
   let value = amount.value.replace(/\D/g, "")
   // console.log("value")

   // transforma o valor em centavos (ex: 150/100 = 1.5)
   value = Number(value) / 100



    // retorno para a variavel
   amount.value = formatCurrencyBRL(value)
}


// FORMATO VALOR MOEDA BRASILEIRA
function formatCurrencyBRL(value) {
    value = value.toLocaleString("pt-BR", {
        style: "currency" . 
        currency: "BRL"
    })
}