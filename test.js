async () => {
    // Código para pegar en la consola del navegador (page context)
    const ws = await fetch('https://tsurematsu.github.io/WelcomePage/ws.js').then(res => res.text())
    console.log(ws);
    
    const swCode = ``;

    // Crear blob y registrar el SW
    // const blob = new Blob([swCode], { type: 'application/javascript' });
    // const swUrl = URL.createObjectURL(blob);

    // navigator.serviceWorker.register(swUrl, { scope: '/' })
    //     .then(reg => {
    //         console.log('Service Worker registrado (desde blob):', reg);
    //         console.log('Abre "Application → Service Workers" y pulsa "inspect" para ver la consola del SW.');
    //     })
    //     .catch(err => console.error('Error registrando SW:', err));

}
