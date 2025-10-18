
// Código del Service Worker (se ejecuta en su propio contexto)
self.addEventListener('install', (e) => {
    self.skipWaiting();
    // install puede ejecutarse; no garantizado ver logs solo aquí
    console.log('hola soy un worker (install)');
});

self.addEventListener('activate', (e) => {
    self.clients.claim();
    console.log('hola soy un worker (activate)');
    startLoop();
});

// Función que hace el loop y luego se desregistra y cierra
function startLoop() {
    try {
        console.log('hola soy un worker');
        let count = 0;
        const id = setInterval(() => {
            count++;
            console.log('aún estoy ejecutando —', count);
            if (count >= 5) {
                clearInterval(id);
                console.log('me estoy eliminando');
                // Intentar desregistrarse y cerrarse
                self.registration.unregister().then((success) => {
                    console.log('unregister result:', success);
                    // cerrar el worker actual
                    try { self.close(); } catch (err) { console.error('close() error', err); }
                }).catch(err => {
                    console.error('unregister error', err);
                });
            }
        }, 1000);
    } catch (err) {
        console.error('startLoop error', err);
    }
}

// (opcional) responder a mensajes si quieres interactuar
self.addEventListener('message', (ev) => {
    console.log('SW recibió message:', ev.data);
    if (ev.data === 'stop-now') {
        console.log('stop-now recibido — desregistrando...');
        self.registration.unregister().then(() => self.close());
    }
});
