/*
Classes
*/

class Pizza {
    constructor(tipo, preco, quant) {
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

function addPizza(sabor) {

    let tipo = null

    switch(sabor) {
        case 'calabresa' : tipo = 'Pizza de Calabresa'
            break
        case 'presunto' : tipo = 'Pizza de Presunto'
            break
        case 'mussarela' : tipo = 'Pizza de Mussarela'
            break
    }

    let preco = document.getElementById('preco')
    let quant = document.getElementById('quant')
    
    let pizza = new Pizza(
        tipo,
        preco.value,
        quant.value
    )

    if(pizza.validarDados()) {

        alert('Dados validos')
        incrementaBadge(parseInt(quant.value))
        console.log(pizza)

        preco.value = ''
        quant.value = 1

    } else {
        alert('Dados invalidos')
        console.log(pizza)
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





