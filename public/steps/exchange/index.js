const buildStepsExchange = async (indexStep, params = {}) => {
    const INPUT_STEP = api("steps/exchange/input/index.html").then(async response => ({ page: await response.text(), onRender: () => getListCurrency(params) }))
    const CONFIRM_STEP = api("steps/exchange/confirm/index.html").then(async response => ({
        page: await response.text(), onRender: () => getConfirmCurrency(params)
    }))
    const DEPOSIT_STEP = api("steps/exchange/deposit/index.html").then(async response => ({ page: await response.text(), onRender: () => getDepositInfos(params) }))
    const FINISH_STEP = api("steps/exchange/finish/index.html").then(async response => ({
        page: await response.text(), onRender: () => {
            getTransactionStatus(params)
        }
    }))
    const RATE_STEP = api("steps/exchange/rate/index.html").then(async response => ({ page: await response.text() }))
    const steps = await Promise.all([INPUT_STEP, CONFIRM_STEP, DEPOSIT_STEP, FINISH_STEP, RATE_STEP])
    document.getElementById("content-cripto-page").innerHTML = steps[indexStep].page
    if (steps[indexStep].onRender) {
        steps[indexStep].onRender()
    }
}

const cleanExchange = () => {
    sessionStorage.clear()
    buildStepsExchange(0)
}

const confirmStepFinish = (finishLoading, nextLoading) => {
    finishLoading.forEach(element => {
        document.getElementById(element).innerHTML = `
            <svg width="29" height="29" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
            <mask id="mask0_13_596" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="29" height="29">
            <rect width="29" height="29" fill="url(#pattern0)"/>
            </mask>
            <g mask="url(#mask0_13_596)">
            <rect x="-9.86603" y="-3.88708" width="48.732" height="37.0722" fill="#EE6114"/>
            </g>
            <defs>
            <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
            <use xlink:href="#image0_13_596" transform="scale(0.0078125)"/>
            </pattern>
            <image id="image0_13_596" width="128" height="128" xlink:href="data:image/png;base64,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"/>
            </defs>
            </svg>
        `
    });
    if (nextLoading) {
        document.getElementById(nextLoading).innerHTML = `
        <div class="rotating">
            <svg width="29" height="29" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14.5 29C12.5431 29 10.6428 28.6177 8.85576 27.8615C7.12822 27.1309 5.5791 26.083 4.24805 24.752C2.91699 23.4209 1.86914 21.8718 1.13848 20.1442C0.382324 18.3572 0 16.4569 0 14.5C0 13.9364 0.455957 13.4805 1.01953 13.4805C1.58311 13.4805 2.03906 13.9364 2.03906 14.5C2.03906 16.1822 2.36758 17.8135 3.01894 19.3513C3.64766 20.8353 4.54541 22.1691 5.68955 23.3133C6.83369 24.4574 8.16758 25.358 9.65156 25.9839C11.1865 26.6324 12.8178 26.9609 14.5 26.9609C16.1822 26.9609 17.8135 26.6324 19.3513 25.9811C20.8353 25.3523 22.1691 24.4546 23.3133 23.3104C24.4574 22.1663 25.358 20.8324 25.9839 19.3484C26.6324 17.8135 26.9609 16.1822 26.9609 14.5C26.9609 12.8178 26.6324 11.1865 25.9811 9.64873C25.3545 8.16831 24.4476 6.82296 23.3104 5.68672C22.1755 4.54801 20.8298 3.64096 19.3484 3.01611C17.8135 2.36758 16.1822 2.03906 14.5 2.03906C13.9364 2.03906 13.4805 1.58311 13.4805 1.01953C13.4805 0.455957 13.9364 0 14.5 0C16.4569 0 18.3572 0.382324 20.1442 1.13848C21.8718 1.86914 23.4209 2.91699 24.752 4.24805C26.083 5.5791 27.128 7.13105 27.8587 8.85576C28.6148 10.6428 28.9972 12.5431 28.9972 14.5C28.9972 16.4569 28.6148 18.3572 27.8587 20.1442C27.1309 21.8718 26.083 23.4209 24.752 24.752C23.4209 26.083 21.8689 27.128 20.1442 27.8587C18.3572 28.6177 16.4569 29 14.5 29Z" fill="#EE6114"/>
            </svg>
        </div>
        `
    }
}

let interval;

const getTransactionStatus = async ({ id }) => {
    const resp = await getStatus(id)
    console.log("calling")
    clearInterval(interval)
    switch (resp) {
        case "confirming":
            confirmStepFinish(["confirming-finish-exchange"], "exchanging-finish-exchange")
            interval = setInterval(() => getTransactionStatus({ id }), 500)
            break;
        case "exchanging":
            confirmStepFinish(["confirming-finish-exchange", "exchanging-finish-exchange"], "sending-finish-exchange")
            interval = setInterval(() => getTransactionStatus({ id }), 500)
            break;
        case "sending":
            confirmStepFinish(["confirming-finish-exchange", "exchanging-finish-exchange", "sending-finish-exchange"])
            interval = setInterval(() => getTransactionStatus({ id }), 500)
            break;
        case "finished":
            buildStepsExchange(4, transaction)
            break;
        default:
            interval = setInterval(() => getTransactionStatus({ id }), 500)
    }
}

const getDepositInfos = async ({ from, to, amountFrom, address }) => {
    const resp = await createTransaction({ amountFrom, from, to, address })
    document.getElementById("exchange-ammount-deposit").innerHTML = amountFrom
    document.getElementById("exchange-address-deposit").innerHTML = resp.result.payinAddress
    sessionStorage.setItem("exchange", JSON.stringify({}))
    sessionStorage.setItem("transaction", JSON.stringify({ ...resp, address }))
}

const getConfirmCurrency = async ({ amountFrom, address }) => {
    sessionStorage.setItem("exchange", JSON.stringify({}))
    const resp = await getExchangeAumont({ amountFrom })
    buildConfirmationValues({ address, ...resp.result[0] })
    sessionStorage.setItem("exchange", JSON.stringify({ ...resp.result[0], address }))
}

const confirmDepositExchange = async () => {
    const transaction = JSON.parse(sessionStorage.getItem("transaction"))
    buildStepsExchange(3, transaction)
}

const verifyAddressExchange = (wallet) => {
    const currency = document.getElementById("from-exchange-input").value
    const walletResult = validateAddress({ currency, address: wallet.value })
    const validationErrors = [
        addErrorVerify(
            !walletResult.result.result,
            "address-changelly-error",
            `Esta carteira não é valida`,
            wallet
        ),

    ]
    if (validationErrors.some(error => error)) {
        return
    }
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
    const resp = await getExchangeAumont({ amountFrom })
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
    const resp = await getCurrenciesFull()
    sessionStorage.setItem("listCurrency", JSON.stringify(resp.result))
    buildInputs("from", "to", resp.result)
}

const confirmValuesExchange = () => {
    const exchange = JSON.parse(sessionStorage.getItem("exchange"))
    buildStepsExchange(2, exchange)
}   