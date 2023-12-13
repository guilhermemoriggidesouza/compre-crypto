function openConfirm() {
    const open = !document.getElementById("infos-qrcode-cripto").classList.contains("hidden");
    document.getElementById("arrow-down-cripto").style.transitionDuration = '.3s';
    document.getElementById("arrow-down-cripto").style.transition = 'all';
    document.getElementById("arrow-down-cripto").style.transform = `rotate(${open ? 0 : 180}deg)`;
    if (!open) {
        document.getElementById("infos-qrcode-cripto").classList.remove("hidden")
    } else {
        document.getElementById("infos-qrcode-cripto").classList.add("hidden")
    }
}

function copyClipBoard(id) {
    var copyText = document.getElementById(id);
    navigator.clipboard.writeText(copyText.innerHTML);
    Toastify({
        text: "Copiado!!",
        style: {
            background: "#F18206"
        },
        duration: 4500,
        destination: "https://github.com/apvarun/toastify-js",
        gravity: "top",
        position: 'left',
    }).showToast();
}
