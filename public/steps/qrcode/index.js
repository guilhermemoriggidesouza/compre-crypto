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
