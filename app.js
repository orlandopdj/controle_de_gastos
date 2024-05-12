const transacoes = document.querySelector('#transacoesUl')
const saldo = document.querySelector('#saldo')
const receitaDom = document.querySelector('#receita')
const despesaDom = document.querySelector('#despesas')
const form = document.querySelector("#form")
const transacaoNome = document.querySelector('#texto')
const transacaoValor = document.querySelector('#valor')

const localStorageTransacoes = JSON.parse(localStorage.getItem('transacoes'))
let minhasTransacoes = localStorage.getItem('transacoes') !== null ? localStorageTransacoes : []

const criarTransacao = transacao => {
    const li = document.createElement("li")
    const CSSClass = transacao.valor < 0 ? 'negativo' : 'positivo'
    const operador = transacao.valor < 0 ? '-' : '+'
    const valorSemOperador = Math.abs(transacao.valor)
    li.classList.add(CSSClass)
    li.innerHTML = `${transacao.nome}
    <span>${operador} R$ ${valorSemOperador}</span>
    <button class="delete-btn" onClick="removeTransacao(${transacao.id})">x</button>`
    transacoes.append(li)
}

const valores = minhasTransacoes.map(item => item.valor)


const iniciar = () => {
    transacoes.innerHTML = ''
    minhasTransacoes.forEach(criarTransacao)
    const valores = minhasTransacoes.map(item => item.valor)

    const saldoDisponivel = valores.reduce((acc, item) => acc + item, 0)
    saldo.innerHTML = `R$ ${saldoDisponivel.toFixed(2)}`

    const receitaValores = minhasTransacoes.filter(item => item.valor > 0)
    const receita = receitaValores.reduce((acc, item) => acc + item.valor, 0)
    receitaDom.innerHTML = `R$ ${receita.toFixed(2)}`

    const despesasValores = minhasTransacoes.filter(item => item.valor < 0)
    const despesas = despesasValores.reduce((acc, item) => acc + item.valor, 0)
    despesaDom.innerHTML = `R$ ${(Math.abs(despesas).toFixed(2))}`
}

const removeTransacao = ID =>{
    minhasTransacoes = minhasTransacoes.filter(transacao => transacao.id !== ID)
    iniciar()
    salvarLocalStorage()
}

const salvarLocalStorage = ()=>{
    localStorage.setItem('transacoes', JSON.stringify(minhasTransacoes))
}

form.addEventListener("submit", (e) => {
    e.preventDefault()
    if (transacaoNome.value.trim() === '' || transacaoValor.value.trim() === '') {
        alert('Por favor preencha todos os campos')
        return
    }
    const newArray = {
        id: minhasTransacoes.length + 1,
        nome: transacaoNome.value.trim(),
        valor: Number(transacaoValor.value.trim())
    }

    transacaoNome.value = ''
    transacaoValor.value = ''
    minhasTransacoes.push(newArray)

    iniciar()
    salvarLocalStorage()
})



iniciar()