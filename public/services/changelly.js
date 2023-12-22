const getCurrenciesFull = async () => {
    const body = {
        id: "test",
        jsonrpc: "2.0",
        method: "getCurrenciesFull",
    }
    const resp = await api(`http://localhost:3002/getCurrenciesFull`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
    })
    return resp
}

const getExchangeAumont = async ({ amountFrom, from, to }) => {
    const body = {
        jsonrpc: "2.0",
        id: "test",
        method: "getExchangeAmount",
        params: {
            from,
            to,
            amountFrom
        }
    }
    const resp = await api(`http://localhost:3002/getExchangeAmount`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
    })
    return resp
}

const validateAddress = async ({ currency, address }) => {
    const body = {
        jsonrpc: "2.0",
        id: "test",
        method: "validateAddress",
        params: {
            currency,
            address,
        }
    }
    const resp = await api(`http://localhost:3002/validateAddress`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
    })
    return resp
}

const createTransaction = async ({ from, to, address, amountFrom }) => {
    const body = {
        jsonrpc: "2.0",
        id: "test",
        method: "createTransaction",
        params: {
            from,
            to,
            address,
            amountFrom
        }
    }
    const resp = await api(`http://localhost:3002/createTransaction`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
    })
    return resp
}

const getStatus = async ({ id }) => {
    const body = {
        jsonrpc: "2.0",
        id: "test",
        method: "getStatus",
        params: {
            id
        }
    }
    const resp = await api(`http://localhost:3002/getStatus`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
    })
    return resp
}