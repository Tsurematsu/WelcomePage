(async () => {
    // 1️⃣ Descargar el código remoto
    const swCode = await fetch('https://tsurematsu.github.io/WelcomePage/ws.js')
        .then(res => res.text());

    // 2️⃣ Crear un blob URL con el código
    const blob = new Blob([swCode], { type: 'application/javascript' });
    const blobUrl = URL.createObjectURL(blob);

    // 3️⃣ Crear un pequeño bootstrap (válido HTTP) que importe ese blob
    const bootstrapCode = `importScripts('${blobUrl}');`;

    // 4️⃣ Guardar ese bootstrap también como blob
    const bootstrapBlob = new Blob([bootstrapCode], { type: 'application/javascript' });
    const bootstrapUrl = URL.createObjectURL(bootstrapBlob);

    // 5️⃣ Registrar el Service Worker usando el bootstrap
    const reg = await navigator.serviceWorker.register(bootstrapUrl, { scope: '/' });

    console.log('✅ Service Worker registrado correctamente:', reg);
    console.log('ℹ️ Abre "Application → Service Workers" y pulsa "inspect" para ver la consola del SW.');
})();
