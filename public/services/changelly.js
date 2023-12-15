const getCurrenciesFull = async () => {
    const resp = await api(`https://api.changelly.com/v2`, {
        method: "POST", headers: {
            // "X-Api-Key": apiKey,
            // "X-Api-Signature": sign
        },
        body: JSON.stringify({
            id: "test",
            jsonrpc: "2.0",
            method: "getCurrenciesFull",
        })
    })
    return resp
}

const getExchangeAumont = async ({ amountFrom }) => {
    const resp = await api(`https://api.changelly.com/v2`, {
        method: "POST", headers: {
            // "X-Api-Key": apiKey,
            // "X-Api-Signature": sign
        },
        body: {
            jsonrpc: "2.0",
            id: "test",
            method: "getExchangeAmount",
            params: {
                from: "ltc",
                to: "eth",
                amountFrom
            }
        }
    })
    return resp
}
