const buildStepsExchange = async (indexStep, params = {}) => {
    const INPUT_STEP = api("steps/exchange/input/index.html").then(async response => ({ page: await response.text(), onRender: () => getListCurrency(params) }))
    const CONFIRM_STEP = api("steps/exchange/confirm/index.html").then(async response => ({
        page: await response.text(), onRender: () => getConfirmCurrency(params)
    }))
    const FINISH_STEP = api("steps/exchange/finish/index.html").then(async response => ({ page: await response.text() }))
    const DEPOSIT_STEP = api("steps/exchange/deposit/index.html").then(async response => ({ page: await response.text() }))
    const steps = await Promise.all([INPUT_STEP, CONFIRM_STEP, DEPOSIT_STEP, FINISH_STEP])
    document.getElementById("content-cripto-page").innerHTML = steps[indexStep].page
    if (steps[indexStep].onRender) {
        steps[indexStep].onRender()
    }
}

const getConfirmCurrency = async ({ amountFrom, address }) => {
    // const resp = await getExchangeAumont({ amountFrom })
    const resp = {
        "jsonrpc": "2.0",
        "id": "test",
        "result": [
            {
                "from": "ltc",
                "to": "eth",
                "networkFee": "0.0019658900000000000000",
                "amountFrom": "3.99",
                "amountTo": "0.16041285",
                "max": "1300",
                "maxFrom": "1300",
                "maxTo": "52.46028908",
                "min": "1.54648",
                "minFrom": "1.54648",
                "minTo": "0.06240676",
                "visibleAmount": "0.16081488721804511278",
                "rate": "0.04030448301204138164",
                "fee": "0.00040203721804511278195"
            }
        ]
    }
    buildConfirmationValues({ address, ...resp.result[0] })
}

const verifyAddressExchange = () => {

}

const buildConfirmationValues = ({ from, to, amountFrom, amountTo, networkFee, fee, rate, address }) => {
    document.getElementById("you-send-confirm").innerHTML = `${amountFrom} ${from.toUpperCase()}`
    document.getElementById("you-get-confirm").innerHTML = `${amountTo} ${to.toUpperCase()}`
    document.getElementById("network-fee-confirm").innerHTML = `${networkFee} ${to.toUpperCase()}`
    document.getElementById("exchange-fee-confirm").innerHTML = `${fee} ${to.toUpperCase()}`
    document.getElementById("adress-exchange-confirm").innerHTML = `${address}`
    document.getElementById("exchange-rate-confirm").innerHTML = `1 ${to.toUpperCase()} ~ ${rate} `
}

const processExchange = debounce((args) => getValuesCurrency(args));

const getValuesCurrency = async ({ inptFrom, inptTo }) => {
    const amountFrom = inptFrom.value
    // const resp = await getExchangeAumont({ amountFrom })
    const resp = {
        "jsonrpc": "2.0",
        "id": "test",
        "result": [
            {
                "from": "ltc",
                "to": "eth",
                "networkFee": "0.0019658900000000000000",
                "amountFrom": "3.99",
                "amountTo": "0.16041285",
                "max": "1300",
                "maxFrom": "1300",
                "maxTo": "52.46028908",
                "min": "1.54648",
                "minFrom": "1.54648",
                "minTo": "0.06240676",
                "visibleAmount": "0.16081488721804511278",
                "rate": "0.04030448301204138164",
                "fee": "0.00040203721804511278195"
            }
        ]
    }
    const validationErrors = [
        addErrorVerify(
            parseFloat(amountFrom) >= parseFloat(resp.result[0].max),
            "from_max-changelly-error",
            `Quantidade Máxima de ${parseFloat(resp.result[0].max)}`,
            document.getElementById("from-exchange-input")
        ),
        addErrorVerify(
            parseFloat(amountFrom) <= parseFloat(resp.result[0].min),
            "from_min-changelly-error",
            `Quantidade Mínima de ${parseFloat(resp.result[0].min)}`,
            document.getElementById("from-exchange-input")
        )
    ]
    if (validationErrors.some(error => error)) {
        return
    }
    inptTo.value = parseToCurrencyWithoutFixed(resp.result[0].amountTo)
}

const changeImages = (type, otherTypeOf) => {
    const listCurrency = JSON.parse(sessionStorage.getItem("listCurrency"))
    const inptOne = document.getElementById(`${type}-money-exchange-cripto`)
    const inptTwo = document.getElementById(`${otherTypeOf}-money-exchange-cripto`)
    console.log(listCurrency, listCurrency.find(cur => cur.name == inptOne.value))
    itemInptOne = listCurrency.find(cur => cur.name == inptOne.value)
    itemInptTwo = listCurrency.find(cur => cur.name == inptTwo.value)
    document.getElementById(`${type}-money-exchange-image`).src = itemInptOne.image
    document.getElementById(`${otherTypeOf}-money-exchange-image`).src = itemInptTwo.image
}

const changeCurrencyExchange = (type, input) => {
    const otherTypeOf = {
        "from": "to",
        "to": "from"
    }
    const versusInput = document.getElementById(`${otherTypeOf[type]}-money-exchange-cripto`)
    if (input.value == versusInput.value) {
        versusInput.value = input.oldValue
    }
    input.oldValue = input.value
    versusInput.oldValue = versusInput.value
    changeImages(type, otherTypeOf[type])
    getValuesCurrency({ inptFrom: document.getElementById("from-exchange-input"), inptTo: document.getElementById("to-exchange-input") })
}

const buildInputs = async (inpOne, inpTwo, list) => {
    document.getElementById(`${inpOne}-money-exchange-cripto`).innerHTML = list.map(item => `<option value="${item.name}">${item.fullName}</option>`).join("")
    document.getElementById(`${inpTwo}-money-exchange-cripto`).innerHTML = list.map(item => `<option value="${item.name}">${item.fullName}</option>`).join("")
    document.getElementById(`${inpOne}-money-exchange-cripto`).value = list[0].name
    document.getElementById(`${inpOne}-money-exchange-cripto`).oldValue = list[0].name
    document.getElementById(`${inpTwo}-money-exchange-cripto`).value = list[1].name
    document.getElementById(`${inpTwo}-money-exchange-cripto`).oldValue = list[1].name
    document.getElementById(`${inpTwo}-money-exchange-image`).src = list[1].image
    document.getElementById(`${inpOne}-money-exchange-image`).src = list[0].image
}

const nextStepExchange = () => {
    const amountFrom = document.getElementById("from-money-exchange-cripto").value
    const address = document.getElementById("pocket-exchange-cripto").value
    buildStepsExchange(1, { amountFrom, address })
}

const getListCurrency = async () => {
    const resp = {
        "jsonrpc": "2.0",
        "id": "test",
        "result": [
            {
                "name": "BTR",
                "ticker": "btR",
                "fullName": "BitcoinR",
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

    // const resp = await getCurrenciesFull()

    sessionStorage.setItem("listCurrency", JSON.stringify(resp.result))
    buildInputs("from", "to", resp.result)
}

