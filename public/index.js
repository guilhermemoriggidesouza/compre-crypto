const buildSteps = async (indexStep, params = {}) => {
    const INPUT_STEP = fetch("steps/input/index.html").then(async response => ({ page: await response.text() }))
    const CONFIRM_STEP = fetch("steps/confirm/index.html").then(async response => ({ page: await response.text(), onRender: () => buildConfirmScreen(params) }))
    const QR_CODE_STEP = fetch("steps/qrcode/index.html").then(async response => ({ page: await response.text(), onRender: () => buildQrCodeScreen(params) }))
    const FINISH_STEP = fetch("steps/finish/index.html").then(async response => ({ page: await response.text(), onRender: () => buildFinishScreen(params) }))
    const steps = await Promise.all([INPUT_STEP, CONFIRM_STEP, QR_CODE_STEP, FINISH_STEP])
    document.getElementById("content-cripto-page").innerHTML = steps[indexStep].page
    if (steps[indexStep].onRender) {
        steps[indexStep].onRender()
    }
}

const buildFinishScreen = ({ hash }) => {
    document.getElementById("loading-req-cripto-finish").classList.add("hidden")
    document.getElementById("hash-gen").classList.remove("hidden")
    document.getElementById("hash-text-value").innerHTML = hash
}

const handlerAddValue = (e) => {
    let valueToSum = document.getElementById("de_qtd-input-cripto").value
    valueToSum = valueToSum == "" ? 0 : parseInt(valueToSum)
    document.getElementById("de_qtd-input-cripto").value = parseInt(100) + valueToSum
}

const buildQrCodeScreen = (values) => {
    buildValuesConfirm(values)
    let triess = 0
    document.getElementById("total-qrcode-cripto").innerHTML = !isNaN(parseFloat(values.total)) ? parseFloat(values.total).toFixed(2) : 0.00
    document.getElementById('barcode-cripto').src = values.image_qr_code;
    document.getElementById('copy-id-req-crypto').innerHTML = values.id;
    document.getElementById('copy-key-req-crypto').innerHTML = values.endereco;
    const myInterval = setInterval(async () => {
        triess++
        let response = await fetch(`https://api-swap.api-pay.org/api/1fe1c674-f93d-4fd9-af09-d62dd82e573f/cotacao/detalhes-cobranca?cobranca_id=${values.id}`).then(res => res.json())
        if (triess == 20) {
            response = {
                "id": "b48074ed-afca-43e7-953d-2da6443b8a4c",
                "tipo": "PIX_COB",
                "valor": 11000,
                "data_pagamento": "2023-09-26T00:15:06.716379Z",
                "endereco": "00020101021226900014br.gov.bcb.pix2568qr.cornerpix.com.br/21332862/v2/50605102-41e5-431d-bfe7-b7dc758c28705204000053039865802BR5924HOSTIZ WEB SERVICES LTDA6005TATUI62070503***6304A7C2",
                "data_vencimento": "2023-09-26T00:11:57.86342Z",
                "valor_recebido": 11000,
                "taxa_operacao": 0,
                "cliente_id": "00000000-0000-0000-0000-000000000000",
                "status": "Pago",
                "identificador": "SWAP016956868170491695686817049",
                "data_criacao": "2023-09-26T00:06:57.865943Z",
                "image_qr_code": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAAEAAQMAAABmvDolAAAABlBMVEX///8AAABVwtN+AAADZElEQVR42uyZMW7jPBSEh1DBkjcwLyKI13IhQAJc+Fo0fBHqBixZCJofQ8ZZp/uLtZZFWO0mXyHpPc7Me8Hv+T1/+wSS8eKwMOXr6DPmybsybCSPboAJsBGwtwO8kxmzoSO3XH91EuB5fzKXIXqWIbkyPOjWsGXunQGHs4zIGA2xHN6to/kHAJZHwqIvuTySK+gMAOyT2fJAttHQ3iIco/nRDx8G1PbPLRd1+/3tHz/uxb8GdAaS6+SxREP1nrvHnyLyYWDyrN9tnnxWNe0O70rYyL0fAOA6wnEPxDUkVxa90niBbspJQEiOark1JPKZYPeQKvlq+x6ASXIBV8uNITkJSF5Ye+8sAFCDOak9LPWQRp90I2Z0A4RUiwvAcx022tvh83W8OMzTWQCaG/LG5NaQnL3F6kEs6AfQVRgvrsyGzZt2k3iPXpJyFjAhL9E0a75zY7Ue+zzw3ZMdAIYZA3NZlB9QlSTxvsPZFacByama9ka6dfTEHBJsvODVcl0AlG6gPvNCaVfVXpn4cRYA77gbtvzwTA6zHGcE7JeQ9gCYBIwXRx6eJSSH4ZEy9EmH4yxARsMtcw1K7KRd9dg6t9gNYOjWQcBXyLEkcR0SXrZ4AgBFuwMFRta8UR6NH7bYASBLUmFrdFfiGiRiTChDPAvQs9UiSuTJXGY1YeC32ncBqLjMCuqSfWLRRIavRHEOEIhl9/XnLbrPhjXIvNS+E6DmTz70OlsdxDLC9jaIfRyYQO5e1phwrbZolJPTt+P0AJjEFT5To40yPG9ky1+vfvg8MKmInmXg15fcNZBKH5Z+gJqWU9V3fUCHIYJrLTfOAuocqmdT38UWtKCWe7V9D0CbLxxvD7oyKLpr0Il/Qs4JAKCBnXW7aJ9tvGKRkHYETL4KiGX0uQ6Cc0huHd4u7+cBIzfUl6xbBcOW4VXatSOAuZkgPBa2IAH75Fuu/jgQWP9br2SzZt3W8DaQdgDUrZqKKzeUd88TND6DjGcBbbEP1S4vzyqkcCUo7KEboO5p646ormfbJb2GhILzAM+2dI0eNbbPoWn/j4V2D0CC3eFR56/lobc4H9iyZJMrLq7U7VD8M5B2AbS/JXE1KV8Hyh+Zl93nt5DzaaAt9qUPbQ+j1CeP/h4GewB+z+/5/+e/AAAA//+ISU1EVE6SggAAAABJRU5ErkJggg==",
                "end_to_end_id": "",
                "pedido_id": null,
                "cotacao_id": "00000000-0000-0000-0000-000000000000",
                "cotacao": {
                    "id": "76759aa4-dea2-4d7e-a4d2-43d64d93b11b",
                    "side": 0,
                    "moeda_de": "BRL",
                    "moeda_para": "USDT",
                    "endereco": "TTKd68WMVgFzWvCEMXAbZ5PYoqvKxBfrJ5",
                    "preco": "100.000000",
                    "cotacao": "4.983000",
                    "quantidade": "20.068232",
                    "total": "110.000000",
                    "taxa": "4.000000",
                    "taxa_rede": "6.00",
                    "atualizado_em": 1695686812311,
                    "cobranca": null
                },
                "hash": "68465cabafc60804c8a4aeec7752a88d3857dd17aeada3d3e5dd8804ed86a6a8",
                "hash_status": 3
            }
        }
        if (triess == 300 && response.hash_status == -1) {
            timeoutScreen("content-qrcode-cripto", "Seu pedido expirou, caso tenha realizado o pagamento e não receber suas moedas dentro de alguns minutos, enter em contato com a nossa equipe")
            clearInterval(myInterval)
            return
        }
        if (response.status == "Pago" && response.hash_status == 3) {
            clearInterval(myInterval)
            buildSteps(3, { hash: response.hash })
            return
        }
    }, 1000)
}

const buildValuesConfirm = ({
    carteira_nome_simples,
    carteira_valor,
    carteira_nome,
    cotacao,
    taxa,
    taxa_rede,
    quantidade,
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

const timeoutScreen = (id, text) => {
    document.getElementById(id).innerHTML = ` 
    <p class="text-2xl my-4 text-center">Cotação Expirada</p>
    <span class="text-gray-500 break-words w-full ">${text}</span>
    <div class="inner-image-button">
        <button onclick="sessionStorage.clear();buildSteps(0)"
            class="my-4 rounded-full w-full bg-custom-color text-white h-12">Novo Pedido</button>
    </div>`
}

const initCountdown = () => {
    let countdownNumberEl = document.getElementById('countdown-number');
    let countdown = 15;

    countdownNumberEl.textContent = countdown;

    return setInterval(function () {
        countdown = --countdown <= 0 ? 15 : countdown;
        countdownNumberEl.textContent = countdown;
        if (countdown == 15) {
            timeoutScreen("confirmOkCripto", "Sua cotação expirou, clique em novo pedido para recomeçar")
        }
    }, 1000);
}
const buildConfirmScreen = (values) => {
    buildValuesConfirm(values)
    const countdown = initCountdown()
    document.getElementById("cofirm-cotation-cripto").addEventListener("click", async () => {
        clearInterval(countdown)
        document.getElementById("countdown").classList.add("hidden")
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
        buildSteps(2, { ...values, ...response })

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
const mapPocketName = {
    'BTC': 'BTC Mainnet',
    'USDT': 'USDT TRX-20',
}
const nextStepInput = async () => {
    const pocket = document.getElementById("pocket-input-cripto")
    const toMoney = document.getElementById("to-money-input-cripto")
    let values = JSON.parse(sessionStorage.getItem("cotacao"))
    values = {
        carteira_valor: pocket.value,
        carteira_nome: mapPocketName[toMoney.value],
        carteira_nome_simples: toMoney.value,
        ...values
    }
    sessionStorage.setItem("cotacao", JSON.stringify(values))
    token = await grecaptcha.execute();
    makeCotation({ token, ...values })
}

window.onload = async () => {
    grecaptcha.ready(async () => {
        grecaptcha.render('recaptcha', {
            "sitekey": '6Lfl59MlAAAAADsJshGwpPBsWceFJTH4Kzi9X33-'
        })
    });

    const urlParams = new URLSearchParams(window.location.search);
    const pedido = urlParams.get('pedido');
    if (pedido) {
        let response = await fetch(`https://api-swap.api-pay.org/api/1fe1c674-f93d-4fd9-af09-d62dd82e573f/cotacao/detalhes-cobranca?cobranca_id=${pedido}`).then(res => res.json())
        buildSteps(2, {
            carteira_nome: mapPocketName[response.cotacao.moeda_para],
            carteira_nome_simples: response.cotacao.moeda_para,
            carteira_valor: response.cotacao.endereco,
            ...response.cotacao,
            ...response
        })
        return
    }
    buildSteps(0)
}