/*
Classes
*/

class Pizza {
    constructor(img, tipo, preco, quant) {
        this.img = img
        this.tipo = tipo
        this.preco = preco
        this.quant = quant
    }

    validarDados() {
        for (let i in this) {
            if(this[i] == undefined || this[i] == null || this[i] == '')
            return false
        }
        return true
    }
}

/*
Functions
*/

let img = document.getElementById('img_1').src 
console.log(img)

function addPizza(produto) {

    let num = null
    
    switch(produto) {
        case 'produto1': num = '1'
            break
        case 'produto2': num = '2'
            break
        case 'produto3': num = '3'
            break
    }

    let img = document.getElementById('img_'+num)
    let tipo = document.getElementById('tipo_'+num)
    let preco = document.getElementById('preco_'+num)
    let quant = document.getElementById('quant_'+num)
    
    let pizza = new Pizza(
        img.src,
        tipo.innerHTML,
        preco.value,
        quant.value
    )

    if(pizza.validarDados()) {

        alert('Pedido adicionado ao carrinho!')
        incrementaBadge(parseInt(quant.value))
        console.log(pizza)

        preco.value = ''
        quant.value = 1

    } else {
        alert('Erro! Verifique se todos os campos foram preenchidos corretamente.')
    }
}

function incrementaBadge(quant) {
    let badge = document.getElementById('badge-cont').innerHTML

    badge = parseInt(badge)
    badge += quant

    document.getElementById('badge-cont').innerHTML = badge
}

function decrementaBadge(quant) {
    let badge = document.getElementById('badge-cont').innerHTML

    badge = parseInt(badge)
    if(badge >= 1) {
        badge -= quant
    }

    document.getElementById('badge-cont').innerHTML = badge
}





