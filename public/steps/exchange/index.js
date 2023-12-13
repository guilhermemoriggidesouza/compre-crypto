const buildStepsExchange = async (indexStep, params = {}) => {
    const INPUT_STEP = fetch("steps/exchange/input/index.html").then(async response => ({ page: await response.text(), onRender: () => getListCurrency(params) }))
    const CONFIRM_STEP = fetch("steps/exchange/confirm/index.html").then(async response => ({ page: await response.text(), onRender: () => buildConfirmScreen(params) }))
    const FINISH_STEP = fetch("steps/exchange/finish/index.html").then(async response => ({ page: await response.text(), onRender: () => buildFinishScreen(params) }))
    const steps = await Promise.all([INPUT_STEP, CONFIRM_STEP, FINISH_STEP])
    document.getElementById("content-cripto-page").innerHTML = steps[indexStep].page
    if (steps[indexStep].onRender) {
        steps[indexStep].onRender()
    }
}

const changeCurrencyExchange = (type, input) => {
    const otherTypeOf = {
        "from": "to-money-exchange-cripto",
        "to": "from-money-exchange-cripto"
    }
    const versusInput = document.getElementById(otherTypeOf[type])
    if (input.value == versusInput.value) {
        versusInput.value = input.oldValue
    }
    input.oldValue = input.value
}

const buildInputs = async (inpOne, inpTwo, list) => {
    document.getElementById(`${inpOne}-money-exchange-cripto`).innerHTML = list.map(item => `<option value="${item.name}">${item.fullName}</option>`).join("")
    document.getElementById(`${inpTwo}-money-exchange-cripto`).innerHTML = list.map(item => `<option value="${item.name}">${item.fullName}</option>`).join("")
    document.getElementById(`${inpOne}-money-exchange-cripto`).value = list[0].name
    document.getElementById(`${inpOne}-money-exchange-cripto`).oldValue = list[0].name
    document.getElementById(`${inpTwo}-money-exchange-cripto`).value = list[1].name
    document.getElementById(`${inpTwo}-money-exchange-cripto`).oldValue = list[1].name
    console.log(list[1].image)
    document.getElementById(`${inpTwo}-money-exchange-image`).src = list[1].image
    document.getElementById(`${inpOne}-money-exchange-image`).src = list[0].image
}

const getListCurrency = async () => {
    const resp = {
        "jsonrpc": "2.0",
        "id": "test",
        "result": [
            {
                "name": "BTC",
                "ticker": "btc",
                "fullName": "Bitcoin",
                "enabled": true,
                "enabledFrom": true,
                "enabledTo": true,
                "fixRateEnabled": true,
                "payinConfirmations": 2,
                "addressUrl": "https://www.blockchain.com/btc/address/%1$s",
                "transactionUrl": "https://www.blockchain.com/btc/tx/%1$s",
                "image": "https://web-api.changelly.com/api/coins/btc.png",
                "fixedTime": 1200000,
                "protocol": "BTC",
                "blockchain": "bitcoin"
            },
            {
                "name": "BETR",
                "ticker": "betr",
                "fullName": "BetterBetting",
                "enabled": false,
                "enabledFrom": false,
                "enabledTo": false,
                "fixRateEnabled": false,
                "payinConfirmations": 15,
                "addressUrl": "https://etherscan.io/token/0x763186e************1214febc6a9?a=%1$s",
                "transactionUrl": "https://etherscan.io/tx/%1$s",
                "image": "https://web-api.changelly.com/api/coins/betr.png",
                "fixedTime": 0,
                "contractAddress": "0x763186e***************1214febc6a9",
                "protocol": "ERC20",
                "blockchain": "ethereum"
            }
        ]
    }

    // const resp = await fetch(`https://api.changelly.com/v2`, {
    //     method: "POST", headers: {
    //         // "X-Api-Key": apiKey,
    //         // "X-Api-Signature": sign
    //     },
    //     body: JSON.stringify({
    //         id: "test",
    //         jsonrpc: "2.0",
    //         method: "getCurrenciesFull",
    //     })
    // }).then(res => res.json())
    sessionStorage.setItem("listCurrency", JSON.stringify(resp.result))
    buildInputs("from", "to", resp.result)
}

