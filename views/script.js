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

class Bd {
    constructor() {
        let id = localStorage.getItem('id') //recupera o id

        if (id === null) {
            localStorage.setItem('id', 0) //inicia um valor para id caso este nao exista
        }
    }

    gravarPizza(pizza) {
        let id = localStorage.getItem('id') //recupera o id
        id = parseInt(id) + 1 //incrementa o valor contido no indice

        localStorage.setItem('id', id) //atualiza o 'id' com o id incrementado

        localStorage.setItem(id, JSON.stringify(pizza)) //armazena o obj pizza no indice id
    }

    gravarBadge(badge) {
        //cria uma chave (key) chamada 'badge'
        //atribui a essa key o valor passado como parametro        
        localStorage.setItem('badge', badge)
    }
}

let bd = new Bd()

/*
Functions
*/

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

        bd.gravarPizza(pizza)

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

    bd.gravarBadge(badge)
}

function decrementaBadge(quant) {
    let badge = document.getElementById('badge-cont').innerHTML

    badge = parseInt(badge)
    if(badge >= 1) {
        badge -= quant
    }

    document.getElementById('badge-cont').innerHTML = badge
}





