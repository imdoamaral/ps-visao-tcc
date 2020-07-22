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
        let id = localStorage.getItem('id') //recupera valor de id
        let badge = localStorage.getItem('badge') //recupera o valor de badge

        if (id === null) {
            localStorage.setItem('id', 0) //inicia um valor para id caso este nao exista
        }

        if (badge === null) {
            localStorage.setItem('badge', 0) //inicia um valor para badge caso este nao exista
        }
    }

    gravarPizza(pizza) {
        let id = localStorage.getItem('id')
        id = parseInt(id) + 1 //incrementa o valor contido no indice

        localStorage.setItem('id', id) //atualiza o 'id' com o id incrementado

        localStorage.setItem(id, JSON.stringify(pizza)) //armazena o obj pizza no indice id
    }

    gravarBadge(badge) {     
        localStorage.setItem('badge', badge) //armazena o valor de badge no indice 'badge'
    }

    recuperarBadge() {
        let badge = localStorage.getItem('badge')
        return badge
    }

    recuperarTodosRegistros() {

        //cria um array de pizzas
        let pizzas = Array()

        let id = localStorage.getItem('id') //recupera o ultimo valor atribuido a id

        //percorre todos os indices cadastrados em local storage
        //nesse caso a variavel i == indice
        for (let i=1; i <= id; i++) {

            //recupera a pizza no formato JSON e converte para um obj literal
            let pizza = JSON.parse(localStorage.getItem(i))

            if(pizza === null) { //verifica se existem indices sem conteudo
                continue
            }

            //add um novo atributo ao obj pizza
            //esse atributo e relativo ao indice em que esse obj se encontra
            pizza.id = i
            pizzas.push(pizza) //add a pizza recuperada ao array 'pizzas'
        }
        return pizzas
    }

    remover(id) {
        localStorage.removeItem(id)
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

        preco.value = ''
        quant.value = 1

    } else {
        alert('Erro! Verifique se todos os campos foram preenchidos corretamente.')
    }
}

function carregaListaPizzas() {

    let total = 0

    let pizzas = bd.recuperarTodosRegistros()

    //selecionando o elemento tbody da tabela
    let listaPizzas = document.getElementById('lista_pizzas')
    
    //limpando quaisquer formatacoes existentes
    listaPizzas.innerHTML = ''
    
    /*
    <!-- produto 1 -->
    <tr>
    0 = <td class="td-img">
            <!-- imagem -->
            <img class="img-fluid" src="../public/images/calabresa.png" alt="Calabresa">
        </td>
    1 = <td>
            <!-- descricao -->
            <h5>Pizza de Calabresa</h5>
            <p>Calabresa, mussarela e cebola</p>
    2 = </td>
            <!-- preco -->
        <td>G - R$ 39,99</td>
    3 = <td>
            <!-- quant -->
            1
        </td>
    4 = <td>
            <!-- remover -->
            <button class="btn btn-danger">
                Remover do carrinho
                <i class="fas fa-trash-alt"></i>
            </button>
        </td>
    </tr> */

    //percorrer o array pizzas, listando cada pizza de forma dinamica
    pizzas.forEach(function(p) {

        total += (p.preco*p.quant)
        
        //criando a linha (tr)
        let linha = listaPizzas.insertRow()

        //inserindo as colunas (td)

            //inserindo a imagem da pizza
            let imgPizza = document.createElement('img')
            imgPizza.src = p.img
            imgPizza.className = 'img-fluid'

            let linha0 = linha.insertCell(0)
            linha0.append(imgPizza)

            linha0.className = 'td-img'

            //inserindo o tipo de pizza
            let tipoPizza = document.createElement('h5')
            tipoPizza.innerText = p.tipo
            linha.insertCell(1).append(tipoPizza)

            //inserindo o preco da pizza
            linha.insertCell(2).innerHTML = `R$ ${p.preco}`

            //inserindo a quant de pizzas
            linha.insertCell(3).innerHTML = p.quant

            //botao de exclusao
            let btn = document.createElement('button')

            btn.className = 'btn btn-danger'
            btn.innerHTML = '<i class="fas fa-trash-alt"></i>'+' Remover do carrinho'
            btn.id = `id_pizza_${p.id}`

            btn.onclick = function() {
                //elimina os caracteres 'id_pizza_' deixando apenas o valor de p.id
                let id = btn.id.replace('id_pizza_', '')

                //remove a despesa
                bd.remover(id)

                //
                let quant = p.quant
                quant = parseInt(quant)
                decrementaBadge(quant)

                //atualiza a pagina
                window.location.reload()
            }

            linha.insertCell(4).append(btn)
    })

    /*
    <!-- total -->
    <tr>
    0 = <td colspan="2"></td>
    1 = <td>
            <h4>Total</h4>
        </td>
    2 = <td colspan="1"></td>
    3 = <td>
            <h3>R$ 79,98</h3>
        </td>
    </tr>

    <!-- botoes -->
    <tr>
    0 = <td>
            <a class="btn btn-success" href="#" role="button">
                Comprar mais
                <i class="fas fa-shopping-cart"></i>
            </a>
        </td>
    1 = <td colspan="3"></td>
    2 = <td>
            <a class="btn btn-primary" href="#">
                Finalizar a compra
                <i class="fas fa-check"></i>
            </a>
        </td>
    </tr>
    */
    
    //inserindo o total
    let linhaTotal = document.getElementById('linha_total')

        linhaTotal.insertCell(0).colSpan = 2
        linhaTotal.insertCell(1).colSpan = 1
        
        let h4 = document.createElement('h4')
        h4.innerText = 'Total'    
        linhaTotal.insertCell(2).append(h4)

        let h3 = document.createElement('h3')
        h3.innerText = `R$ ${total.toFixed(2)}`  
        linhaTotal.insertCell(3).append(h3)

    //inserindo botoes
    let linhaBotoes = document.getElementById('linha_botoes')

    //botao 'comprar mais'
    let btn_comprarMais = document.createElement('a')
    btn_comprarMais.className = 'btn btn-success'
    btn_comprarMais.href = 'cardapio.html'
    btn_comprarMais.role = 'button'
    btn_comprarMais.innerHTML = 'Comprar mais '+'<i class="fas fa-shopping-cart"></i>'
    linhaBotoes.insertCell(0).append(btn_comprarMais)

    linhaBotoes.insertCell(1).colSpan = 3

    //botao 'finalizar a compra'
    let btn_finalizarCompra = document.createElement('a')
    btn_finalizarCompra.className = 'btn btn-primary'
    btn_finalizarCompra.href = '#'
    btn_finalizarCompra.innerHTML = 'Finalizar a compra '+'<i class="fas fa-check"></i>'
    
    linhaBotoes.insertCell(2).append(btn_finalizarCompra)

    carregaBadge()

}

function carregaBadge() {
    
    let badge = bd.recuperarBadge()
    console.log(badge)

    document.getElementById('badge-cont').innerHTML = badge
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
    badge -= quant

    document.getElementById('badge-cont').innerHTML = badge

    bd.gravarBadge(badge)
}