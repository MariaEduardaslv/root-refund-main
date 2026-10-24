// SELECIONA OS ELEMENTOS DO FORMULARIO
const form = document.querySelector("form")
const amount = document.getElementById("amount")
const expense = document.getElementById("expense")
const category = document.getElementById("category")
const expenseList = document.querySelector("ul")

//SELECIONA ELEMENTOS DE TOTAIS
const expenseQuantity = document.querySelector("aside header p span ")
const expenseTotal = document.querySelector("aside header h2")

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
        style: "currency",
        currency: "BRL"
    })

    return value
}

//CAPTURA O EVENTO DE SUBMIT DO FORM E OBTEM OS VALORES
form.onsubmit = (event) => {
    //PREVINE COMPORTAMENTO DE ATUALIZAÇÃO AUTOMÁTICA
    event.preventDefault()

    // CRIA UM OBJETO COM OS DETALHES DA NOVA DESPESA
    const newExpense = {
        id: new Date().getTime(),
        expense: expense.value,
        category_id: category.value,
        category_name: category.options[category.selectedIndex].text,
        amount: amount.value,
        created_at: new Date()
    }

    expenseAdd(newExpense)
}

// ADIÇÃO DOS ITENS NA LISTA
function expenseAdd(newExpense) {
    try {
        //CRIAR O ELEMENTOS PARA ADICIONAR NA LISTA
        const expenseItem = document.createElement("li")
        expenseItem.classList.add("expense")

        // criando o icone da categoria
        const expenseIcon = document.createElement("img")
        expenseIcon.setAttribute("src", `img/${newExpense.category_id}.svg`)
        expenseIcon.setAttribute("alt", newExpense.category_name)

        // criando a info da despesa
        const expenseInfo = document.createElement("div")
        expenseInfo.classList.add("expense-info")

        // criando o nome da despesa
        const expenseName = document.createElement("strong")
        expenseName.textContent = newExpense.expense

        // criando a categoria da despesa
        const expenseCategory = document.createElement("span")
        expenseCategory.textContent = newExpense.category_name

        // add nome e categoria na div, antes do item
        expenseInfo.append(expenseName, expenseCategory)


        // add o valor
        const expenseAmount = document.createElement("span")
        expenseAmount.classList.add("expense-amount")
        expenseAmount.innerHTML = `<small>R$</small> ${newExpense.amount.replace("R$", "")}`

        // add o icone de remover
        const removeIcon = document.createElement("img")
        removeIcon.classList.add("remove-icon")
        removeIcon.setAttribute("src", "img/remove.svg")
        removeIcon.setAttribute("alt", "remover")

        // add info no item
        expenseItem.append(expenseIcon, expenseInfo, expenseAmount, removeIcon)

        //add os itens na lista
        expenseList.append(expenseItem)

        //chama a atualização de totais
        updateTotals()

        // limpa o form
        formClear()

    } catch (error) {
        alert('não foi possivel atualizar a lista de despesa.')
        console.log(error)
    }
}

function updateTotals() {
    try {
        // recuperar todos os itens (li) da lista (ul)
        const items = expenseList.children
        // console.log(items)

        // atualiza a quantidade de itens da lista
        expenseQuantity.textContent = `${items.length} ${items.length > 1 ? "despesas" : "despesa"}`

        // variavel para incrementar o total
        let total = 0

        // percorrer cada item(li) 
        for (let item = 0; item < items.length; item++) {
            //percorre cada item da li e busca somente a classe .expenseAmount
            const itemAmount = items[item].querySelector(".expense-amount")
            //console.log(itemAmount)

            //agora vamos pegar somente o valor
            const value = itemAmount.textContent.replace(/[^\d,]/g, "").replace(",", ".")

            //converter o valor para float
            const valueFormatted = parseFloat(value)

            // verificar se realmente é um numero
            if (isNaN(valueFormatted)) {
                return alert('não foi possivel calcular o total. o valor não parece ser um número.')
            }

            // incrementar o valor total
            total += valueFormatted // total = total + valueFormatted

        }
        //  expenseTotal.textContent = total
        // expenseTotal.innerHTML = `<small>R$</small> ${String(total).replace(".", ",")}`

        const symbolBRL = document.createElement("small")
        symbolBRL.textContent = "R$"

        total = formatCurrencyBRL(total).replace("R$", "")
        expenseTotal.innerHTML = ""
        expenseTotal.append(symbolBRL, total)

    } catch (error) {
        console.log(error)
        alert('nao foi possivel atualizar os valores')
    }
}

expenseList.addEventListener("click", function (event) {
    //console.log(event)
    if (event.target.classList.contains("remove-icon")) {
        //obter a lista pai do elemento
        const item = event.target.closest(".expense")
        item.remove()

    }
    updateTotals()
})

function formClear() {
    expense.value = ""
    category.value = ""
    amount.value = ""

    expense.focus()
}