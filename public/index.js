const buildSteps = async (indexStep, params = {}) => {
    const INPUT_STEP = fetch("steps/input/index.html").then(async response => ({ page: await response.text() }))
    const CONFIRM_STEP = fetch("steps/confirm/index.html").then(async response => ({ page: await response.text(), onRender: () => buildConfirmScreen(params) }))
    const QR_CODE_STEP = fetch("steps/qrcode/index.html").then(async response => ({ page: await response.text(), onRender: () => buildQrCodeScreen(params) }))
    const steps = await Promise.all([INPUT_STEP, CONFIRM_STEP, QR_CODE_STEP])
    document.getElementById("content").innerHTML = steps[indexStep].page
    if (steps[indexStep].onRender) {
        steps[indexStep].onRender()
    }
}



const buildQrCodeScreen = (values) => {
    let valuesConfirm = JSON.parse(sessionStorage.getItem("cotacao"))
    if (valuesConfirm) buildValuesConfirm(valuesConfirm)
    document.getElementById('barcode-cripto').src = values.image_qr_code;
    document.getElementById('copy-id-req-crypto').innerHTML = values.id;
    document.getElementById('copy-key-req-crypto').innerHTML = values.endereco;
    setInterval(async () => {
        const response = await fetch(`https://api-swap.api-pay.org/api/1fe1c674-f93d-4fd9-af09-d62dd82e573f/cotacao/detalhes-cobranca?cobranca_id=${values.id}`).then(res => res.json())
        console.log(response)
    }, 1000)
}

const buildValuesConfirm = ({
    carteira_nome_simples,
    cotacao,
    taxa,
    taxa_rede,
    quantidade,
    carteira_valor,
    carteira_nome,
    total
}) => {
    document.getElementById("de-confirm-cripto").innerHTML = carteira_nome_simples
    document.getElementById("cotacao-confirm-cripto").innerHTML = !isNaN(parseFloat(cotacao)) ? parseFloat(cotacao).toFixed(2) : 0.00
    document.getElementById("tax-confirm-cripto").innerHTML = !isNaN(parseFloat(taxa)) ? parseFloat(taxa).toFixed(2) : 0.00
    document.getElementById("tax-web-confirm-cripto").innerHTML = !isNaN(parseFloat(taxa_rede)) ? parseFloat(taxa_rede).toFixed(2) : 0.00
    document.getElementById("receive-confirm-cripto").innerHTML = !isNaN(parseFloat(quantidade)) ? parseFloat(quantidade).toFixed(2) : 0.00
    document.getElementById("receive-name-confirm-cripto").innerHTML = carteira_nome_simples
    document.getElementById("pocker-value-confirm-cripto").innerHTML = carteira_valor
    if (document.getElementById("pocket-name-confirm-cripto")) document.getElementById("pocket-name-confirm-cripto").innerHTML = carteira_nome
    document.getElementById("tot-confirm-cripto").innerHTML = !isNaN(parseFloat(total)) ? parseFloat(total).toFixed(2) : 0.00
}
const buildConfirmScreen = (values) => {
    buildValuesConfirm(values)
    document.getElementById("cofirm-cotation-cripto").addEventListener("click", async () => {
        token = await grecaptcha.execute();
        document.getElementById("loading-req-cripto").classList.remove("hidden")
        document.getElementById("cofirm-cotation-cripto").classList.remove("bg-custom-color")
        document.getElementById("cofirm-cotation-cripto").classList.add("bg-gray-500")
        document.getElementById("cofirm-cotation-cripto").disabled = true
        const response = await fetch(`https://api-swap.api-pay.org/api/1fe1c674-f93d-4fd9-af09-d62dd82e573f/cotacao/emitir-cobranca`,
            {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    cotacao_id: values.cotacao_id,
                    token
                })
            }
        ).then(res => res.json())
        buildSteps(2, response)

    })
}

const makeCotation = async (cotation) => {
    const responseCotation = await fetch(`https://api-swap.api-pay.org/api/1fe1c674-f93d-4fd9-af09-d62dd82e573f/cotacao?de_moeda=BRL&para_moeda=${cotation.moeda_para}&de_qtd=${parseFloat(cotation.preco).toFixed(2)}`,
        {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                endereco: cotation.carteira_valor,
                token: cotation.token
            })
        }
    ).then(res => res.json())
    buildSteps(1, { ...cotation, cotacao_id: responseCotation.id })
}

const nextStepInput = async () => {
    const pocket = document.getElementById("pocket-input-cripto")
    const mapPocketName = {
        'BTC': 'BTC Mainnet',
        'USDT': 'USDT TRX-20',
    }
    const toMoney = document.getElementById("to-money-input-cripto")
    let values = JSON.parse(sessionStorage.getItem("cotacao"))
    values = {
        carteira_valor: pocket.value,
        carteira_nome: mapPocketName[toMoney.value],
        carteira_nome_simples: toMoney.value,
        ...values
    }
    sessionStorage.setItem("cotacao", JSON.stringify(values))
    grecaptcha.ready(async () => {
        grecaptcha.render('recaptcha', {
            "sitekey": '6Lfl59MlAAAAADsJshGwpPBsWceFJTH4Kzi9X33-'
        })
        token = await grecaptcha.execute();
        makeCotation({ token, ...values })
    })
}

window.onload = () => { buildSteps(0, { image_qr_code: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAAEAAQMAAABmvDolAAAABlBMVEX///8AAABVwtN+AAADZ0lEQVR42uyYMY7zOgyER3ChkjewLmLY10oRwAZS5FoKfBH5BipVGJoH0slutnvFH6+KVeVFvgVskRwOib/zd/71mUiuVTAz5csQ6JeJUrqNZG0GGAG/biwYkefosmcNmLll++kkIPAe7W2TcO9RriNYpi1zbwtYmTHry68bcR2DLIM7G4iA5yMJyeyXEVLQGAD42AvgmH10mXxQ7tH9yIcPA5b2Wy56gfe3h5918cuAnm7LvDHpy1NPxvBTRD4MjCHPew8tyTxrNG+PBAwu+1ttBgBYjq8g5h3ATHKZEvwtngVMzDOrcB8DLnC56L9wDxldO4DT4PZQ3eCdFUWrlWtCeX7kCQCC3PdeeHsQ6Cr87o5o4toO4ChlCFqJAVoOnvEoUt7iWQACfAQKJsqdm0Yz5Av6t5v8fWBKuExVitblZUpSDoENfKn9CQDUNgTi6hK82QaNrz50sRlAE6xL8PsIuVs5TNQmnjGfBjyti7f+0m0sV5eyjz0w12YARxbAalPMcXUPA6R8idjHAW3E0VEfoNmugAqFqFi0AgCyDABvUd1yOr4Cg+N3Tn4cMMewER2TWYdynZgvHVkaAkbIYnWh3VBNjjpS7d3lyy5+HFA1WM26kObx9EedccpbS/ptwFGWbsuli5Z7OoiB+l2vrzgBUH1ggsbuGB/2MUiZrGKbAcbwVFqEPEeI1cVl6OXbsn4ccISn3VuwTNOUYxl6NAUkKUMvZX4wo2MuR7UmcMdZwAjeSdMHXDr1D9C3PSbThgAd5P3iVGB7USWRRS/4itOAoGkvCmBeqxTtOJe3GacFwCVZYGVJW1hp3E1JvhTm84DGba0oHSlcN+uGXKYKNAWYW/CaZUeTjDo+p28n9nlAo7mH7G8moo7aaExIuaAZYEosZqvU5OwQvwDZk/klICcAmu3mP8k8W1jV7OkIfx3bAZh1GFNxFa4Vx7Czkn7BWcBEeLMNTHaBmnsGsCHAtmpVNNNsoY2ZVNlH6epZgG0X1Qyrf1g3HmvYyUb4ZgDb/D8XesfmXx3X+v0VZwCB92grMh3YmctcwxHNl39oBNA/bxXWu6Fux9QM47lA9rtm+3OzB3NcX1NzAwDg7SYf1HATXVXJdXxt1U4AjsW+duSQfYTYdtHv4c0//D7wd/7O/z//BQAA////nbWUNvfEKwAAAABJRU5ErkJggg==' }) }