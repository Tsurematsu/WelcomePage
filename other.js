(async () => {
    fetch('/ruta/al/script.js').then(res => res.text()).then(code => {eval(code);})
})()