(async ()=>{
    
    try {
    
        console.log("[docHorario] ---> accedido al horario");
    
        const docHorario = document.querySelectorAll('frame')[1].contentDocument.querySelectorAll('iframe')[2].contentDocument.querySelectorAll('table table.fondo_celda_3 > tbody > tr > td[valign]')[0];
    
        console.log("[docHorario] ---->" + docHorario.tagName);
        
        const horarioProcesado = procesarHorarioAcademico(docHorario);
        console.log("   ---> horario procesado:", Object.keys(horarioProcesado));
        if (window.MiApp) window.MiApp.gethorario(JSON.stringify(horarioProcesado));

        function procesarHorarioAcademico(domElement) {
            const tablas = domElement.querySelectorAll('table');

            const resultado = {
                estudiante: {},
                informacionAcademica: {},
                docentes: [],
                recursosDisicos: [],
                horario: []
            };

            function extraerDatosTablaSimple(tabla) {
                const filas = tabla.querySelectorAll('tr');
                if (filas.length < 2) return null;

                const encabezados = Array.from(filas[0].querySelectorAll('td'))
                    .map(td => td.textContent.trim());
                const valores = Array.from(filas[1].querySelectorAll('td'))
                    .map(td => td.textContent.trim());

                const obj = {};
                encabezados.forEach((key, index) => {
                    obj[key] = valores[index];
                });
                return obj;
            }
            function extraerListaDatos(tabla) {
                const filas = tabla.querySelectorAll('tr');
                if (filas.length < 2) return [];

                const encabezados = Array.from(filas[0].querySelectorAll('td'))
                    .map(td => td.textContent.trim());

                const datos = [];
                for (let i = 1; i < filas.length; i++) {
                    const celdas = Array.from(filas[i].querySelectorAll('td'));
                    if (celdas.length === 1 && celdas[0].hasAttribute('colspan')) {
                        continue;
                    }

                    const obj = {};
                    celdas.forEach((celda, index) => {
                        obj[encabezados[index]] = celda.textContent.trim();
                    });
                    datos.push(obj);
                }
                return datos;
            }
            if (tablas.length > 0) {
                resultado.estudiante = extraerDatosTablaSimple(tablas[0]);
            }
            if (tablas.length > 1) {
                resultado.informacionAcademica = extraerDatosTablaSimple(tablas[1]);
            }
            if (tablas.length > 3) {
                resultado.docentes = extraerListaDatos(tablas[3]);
            }
            if (tablas.length > 5) {
                resultado.recursosDisicos = extraerListaDatos(tablas[5]);
            }
            if (tablas.length > 7) {
                const tablaHorario = tablas[7];
                const filasHorario = tablaHorario.querySelectorAll('tr');

                const diasSemana = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

                for (let i = 1; i < filasHorario.length; i++) {
                    const fila = filasHorario[i];
                    const celdas = fila.querySelectorAll('td');

                    if (celdas.length === 0) continue;
                    const infoMateria = celdas[0].textContent.trim().split('\n').map(s => s.trim()).filter(s => s);

                    const materia = {
                        codigo: infoMateria[0] || '',
                        nombre: infoMateria[1] || '',
                        grupo: infoMateria[2] ? infoMateria[2].replace('Grupo :', '').trim() : '',
                        horarios: []
                    };
                    for (let j = 1; j < celdas.length && j <= 7; j++) {
                        const tablaDia = celdas[j].querySelector('table');
                        if (!tablaDia) continue;

                        const filasDia = tablaDia.querySelectorAll('tr');
                        filasDia.forEach(filaDia => {
                            const celdaDia = filaDia.querySelector('td');
                            if (!celdaDia) return;

                            const contenido = celdaDia.textContent.trim().split('\n').map(s => s.trim()).filter(s => s);
                            if (contenido.length >= 3) {
                                materia.horarios.push({
                                    dia: diasSemana[j - 1],
                                    hora: contenido[0],
                                    salon: contenido[1],
                                    docente: contenido[2]
                                });
                            }
                        });
                    }

                    resultado.horario.push(materia);
                }
            }

            return resultado;
        }
    } catch (error) {
        console.warn(error);
    }

})()