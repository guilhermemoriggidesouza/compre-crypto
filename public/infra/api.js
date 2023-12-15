const api = async (url, data) => {
    try {
        return await fetch(url, data)
    } catch (error) {
        console.log(error)
        Toastify({
            text: "Erro ao realizar uma ação, Reinicie a pagina e tente novamente!",
            style: {
                background: "red"
            },
            duration: 4500,
            gravity: "top",
            position: 'left',
        }).showToast();
    }
}