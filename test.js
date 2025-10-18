async () => {
    const swCode = await fetch('https://tsurematsu.github.io/WelcomePage/ws.js').then(res => res.text());
    const blob = new Blob([swCode], { type: 'application/javascript' });
    const swUrl = URL.createObjectURL(blob);
    const reg = await navigator.serviceWorker.register(swUrl, { scope: '/' })
    console.log('Service Worker registrado (desde blob):', reg);
    console.log('Abre "Application → Service Workers" y pulsa "inspect" para ver la consola del SW.');
}
