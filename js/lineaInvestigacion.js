
let rolActual = localStorage.getItem('rol') || 'admin';

const aplicarRol = (rol) => {
    // querySelectorAll devuelve una lista con todos los elementos que tengan el atributo [data-roles]
    const elementos = document.querySelectorAll('[data-roles]');

    elementos.forEach(element => {
     
        const rolesPermitidos = element.getAttribute('data-roles')
            .split(',') // rompe el string por medio de una coma y lo convierte en array
            .map(r => r.trim()); // map recorre el ese array y el trim lo deja limpio con una coma

        // .includes() comprueba si el rol actual del usuario existe dentro del Array de roles permitidos
        if (rolesPermitidos.includes(rol)) {
            element.classList.remove('d-none'); // Muestra el elemento (quita clase oculta de Bootstrap)
        } else {
            element.classList.add('d-none');    // Oculta el elemento (añade clase d-none de Bootstrap)
        }
    });
};

document.addEventListener('DOMContentLoaded', function () {
    const mostrarRolActual = (rol) => {
        const rolActualEl = document.querySelector('.rol-actual');
        if (!rolActualEl) return; 
        
        const roles = { 'admin': 'Administrador' };
        rolActualEl.textContent = `Rol Actual: ${roles[rol]}`;
        rolActualEl.style.display = 'block';
    };

    const btnAdmin = document.getElementById('btn-admin');

    if (btnAdmin) {
        btnAdmin.addEventListener('click', function () {
            rolActual = 'admin';
            btnAdmin.style.display = 'block';
       
            localStorage.setItem('rol', rolActual);
            mostrarRolActual(rolActual);
            aplicarRol(rolActual);
        });
    }

    aplicarRol(rolActual);
    mostrarRolActual(rolActual);
});



// GESTIÓN DE LOCALSTORAGE PARA LÍNEAS DE INVESTIGACIÓN


const REGISTROS_POR_PAGINA = 5;
let paginaActual = 1;


//Si no hay nada guardado (devuelve null), el operador lógico `||` evalúa la siguiente opción: 
//Verifica si existe la variable global 'lineasInvestigacion' y la asigna; si no, inicializa un Array vacío `[]`.
let lineasInvestigacionBase = JSON.parse(localStorage.getItem('lineasInvestigacion')) || (typeof lineasInvestigacion !== 'undefined' ? lineasInvestigacion : []); // si es diferente a undefined devuelve el ARRAY

// Si es la primera vez que se carga la app y no existía la clave, la creamos en LocalStorage
if (!localStorage.getItem('lineasInvestigacion')) {
    localStorage.setItem('lineasInvestigacion', JSON.stringify(lineasInvestigacionBase));
}

// El operador Spread [...] crea una copia exacta e independiente del Array base para usarlo en los filtros
let lineasInvestigacionFiltradas = [...lineasInvestigacionBase];


const renderizarTabla = () => {
    const tabla = document.getElementById('tabla-produccion');
    if (!tabla) return;

    tabla.innerHTML = '';

    if (lineasInvestigacionFiltradas.length === 0) {
        const sinResultados = document.getElementById('sin-resultados');
        if (sinResultados) sinResultados.classList.remove('d-none');
        const paginacion = document.getElementById('paginacion');
        if (paginacion) paginacion.innerHTML = '';
        return;
    }

    const sinResultados = document.getElementById('sin-resultados');
    if (sinResultados) sinResultados.classList.add('d-none');

    /**
     * EXPLICACIÓN - Paginación con .slice():
     * .slice(inicio, fin) extrae una porción del Array sin modificar el original.
     * Si estamos en la página 2:
     * inicio = (2 - 1) * 5 = 5.   fin = 5 + 5 = 10.
     * Extraerá los índices del 5 al 9 (el índice 'fin' no se incluye), mostrando exactamente 5 registros.
     */
    const inicio = (paginaActual - 1) * REGISTROS_POR_PAGINA;
    const fin = inicio + REGISTROS_POR_PAGINA;
    const registrosPagina = lineasInvestigacionFiltradas.slice(inicio, fin);

    registrosPagina.forEach(registro => {
        /**
         * EXPLICACIÓN - Inyección de Objetos en HTML:
         * JSON.stringify(registro) convierte el objeto JS en un string de texto: '{"id":1,"nombre":"IA"}'
         * .replace(/"/g, '&quot;') busca globalmente (/g) todas las comillas dobles (") y las cambia por '&quot;'.
         * Esto evita que las comillas del objeto rompan las comillas del atributo `onclick=""` del HTML.
         */
        const fila = `
        <tr>
            <td>${registro.id}</td>
            <td>${registro.nombre}</td>
            <td>
                 <button class="btn btn-danger" data-roles="admin" title="Eliminar" onclick="mostrarModalEliminar(${JSON.stringify(registro).replace(/"/g, '&quot;')})">
                        <i class="fas fa-trash"></i>
                 </button>
            </td>
        </tr>
        `;
        tabla.innerHTML += fila;
    });

    renderizarPaginacion();
    aplicarRol(rolActual);
};

const renderizarPaginacion = () => {
    const paginacion = document.getElementById('paginacion');
    if (!paginacion) return;

    paginacion.innerHTML = '';
    // Math.ceil() redondea siempre hacia arriba el resultado para asegurar que si hay por ejemplo 6 registros, use 2 páginas.
    const totalPaginas = Math.ceil(lineasInvestigacionFiltradas.length / REGISTROS_POR_PAGINA);

    if (totalPaginas <= 1) return;

    const btnAnterior = `
        <li class="page-item ${paginaActual === 1 ? 'disabled' : ''}">
            <a class="page-link" href="#" onclick="cambiarPagina(${paginaActual - 1}); return false;">Anterior</a>
        </li>
    `;
    paginacion.innerHTML += btnAnterior;

    for (let i = 1; i <= totalPaginas; i++) {
        const btnPagina = `
            <li class="page-item ${i === paginaActual ? 'active' : ''}">
                <a class="page-link" href="#" onclick="cambiarPagina(${i}); return false;">${i}</a>
            </li>
        `;
        paginacion.innerHTML += btnPagina;
    }

    const btnSiguiente = `
        <li class="page-item ${paginaActual === totalPaginas ? 'disabled' : ''}">
            <a class="page-link" href="#" onclick="cambiarPagina(${paginaActual + 1}); return false;">Siguiente</a>
        </li>
    `;
    paginacion.innerHTML += btnSiguiente;
};

const cambiarPagina = (nuevaPagina) => {
    const totalPaginas = Math.ceil(lineasInvestigacionFiltradas.length / REGISTROS_POR_PAGINA);
    if (nuevaPagina >= 1 && nuevaPagina <= totalPaginas) {
        paginaActual = nuevaPagina;
        renderizarTabla();
        window.scrollTo(0, 0); // Desplaza la pantalla hacia arriba automáticamente
    }
};

// Búsqueda
const aplicarBusqueda = () => {
    const busqueda = document.getElementById('buscar').value.toLowerCase()
    lineasInvestigacionFiltradas = lineasInvestigacionBase.filter(u =>  // evalua cada elemento y busca si se incluye en la busqueda del usuario
        u.nombre.toLowerCase().includes(busqueda)
    );
    paginaActual = 1; // Resetea a la primera página para ver los resultados desde el inicio
    renderizarTabla();
};


// Eliminar Línea de Investigación
const eliminarModal = (registro) => {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.tabIndex = -1;

    const modalDialog = document.createElement('div');
    modalDialog.className = 'modal-dialog modal-sm';

    const modalContent = document.createElement('div');
    modalContent.className = 'modal-content';

    const modalHeader = document.createElement('div');
    modalHeader.className = 'modal-header bg-danger text-white';

    const modalTitle = document.createElement('h5');
    modalTitle.className = 'modal-title';
    modalTitle.textContent = 'Confirmar eliminación';

    const modalBtnCerrar = document.createElement('button');
    modalBtnCerrar.className = 'btn-close btn-close-white';
    modalBtnCerrar.setAttribute('data-bs-dismiss', 'modal');

    const modalBody = document.createElement('div');
    modalBody.className = 'modal-body';
    modalBody.innerHTML = `
        <p class="mb-2"><strong>¿Deseas eliminar esta Línea de Investigación?</strong></p>
        <p class="text-muted small mb-0">${registro.nombre}</p>
    `;

    const modalFooter = document.createElement('div');
    modalFooter.className = 'modal-footer';

    const modalBtnClose = document.createElement('button');
    modalBtnClose.className = 'btn btn-secondary';
    modalBtnClose.setAttribute('data-bs-dismiss', 'modal');
    modalBtnClose.textContent = 'Cancelar';

    const modalBtnEliminar = document.createElement('button');
    modalBtnEliminar.className = 'btn btn-danger';
    modalBtnEliminar.textContent = 'Eliminar';

    modalHeader.appendChild(modalTitle);
    modalHeader.appendChild(modalBtnCerrar);

    modalContent.appendChild(modalHeader);
    modalContent.appendChild(modalBody);
    modalContent.appendChild(modalFooter);

    modalDialog.appendChild(modalContent);
    modal.appendChild(modalDialog);
    modalFooter.appendChild(modalBtnClose);
    modalFooter.appendChild(modalBtnEliminar);

    return modal;
};

const mostrarModalEliminar = (registro) => {
    const modal = eliminarModal(registro);
    document.body.appendChild(modal);

    const modalBootstrap = new bootstrap.Modal(modal);
    modalBootstrap.show();

    const btnEliminar = modal.querySelector('.btn-danger');
    btnEliminar.addEventListener('click', function () {
      
        lineasInvestigacionBase = lineasInvestigacionBase.filter(r => r.id !== registro.id);  // este fiilter lo que hace es una lista que incluya a todos los elementos excepto al que borramos 
        lineasInvestigacionFiltradas = lineasInvestigacionFiltradas.filter(r => r.id !== registro.id);

        // Guardamos la nueva lista en LocalStorage convirtiéndola en texto plano con JSON.stringify()
        localStorage.setItem('lineasInvestigacion', JSON.stringify(lineasInvestigacionBase));

        modalBootstrap.hide();
        renderizarTabla();
        alert('Línea de Investigación eliminada correctamente');
        modal.remove();
    });
};

document.addEventListener('DOMContentLoaded', function() {
    const buscar = document.getElementById('buscar');
    if (buscar) buscar.addEventListener('input', aplicarBusqueda);

    if (document.getElementById('tabla-produccion')) {
        renderizarTabla();
    }
});


// Modal para crear una Línea de Investigación
const crearModalAgregar = () => {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.tabIndex = -1;

    const modalDialog = document.createElement('div');
    modalDialog.className = 'modal-dialog modal-md';

    const modalContent = document.createElement('div');
    modalContent.className = 'modal-content';

    const modalHeader = document.createElement('div');
    modalHeader.className = 'modal-header bg-primary text-white';

    const modalTitle = document.createElement('h5');
    modalTitle.className = 'modal-title';
    modalTitle.textContent = 'Agregar Línea de Investigación';

    const modalBtnCerrar = document.createElement('button');
    modalBtnCerrar.className = 'btn-close btn-close-white';
    modalBtnCerrar.setAttribute('data-bs-dismiss', 'modal');

    const modalBody = document.createElement('div');
    modalBody.className = 'modal-body';
    modalBody.innerHTML = `
        <div class="mb-3">
            <label for="nombre" class="form-label">Nombre</label>
            <input type="text" class="form-control" id="nombre" placeholder="Ej: Desarrollo de Software">
        </div>
    `;

    const modalFooter = document.createElement('div');
    modalFooter.className = 'modal-footer';

    const modalBtnClose = document.createElement('button');
    modalBtnClose.className = 'btn btn-secondary';
    modalBtnClose.setAttribute('data-bs-dismiss', 'modal');
    modalBtnClose.textContent = 'Cancelar';

    const modalBtnAgregar = document.createElement('button');
    modalBtnAgregar.className = 'btn btn-primary';
    modalBtnAgregar.textContent = 'Agregar';

    modalHeader.appendChild(modalTitle);
    modalHeader.appendChild(modalBtnCerrar);

    modalContent.appendChild(modalHeader);
    modalContent.appendChild(modalBody);
    modalContent.appendChild(modalFooter);

    modalDialog.appendChild(modalContent);
    modal.appendChild(modalDialog);
    modalFooter.appendChild(modalBtnClose);
    modalFooter.appendChild(modalBtnAgregar);

    return modal;
};

const mostrarModalAgregar = () => {
    const modal = crearModalAgregar();
    document.body.appendChild(modal);

    const modalBootstrap = new bootstrap.Modal(modal);
    modalBootstrap.show();

    const btnAgregar = modal.querySelector('.btn-primary');
    btnAgregar.addEventListener('click', function () {
        const nombre = modal.querySelector('#nombre').value.trim();

        if (!nombre) {
            alert('Por favor llena todos los campos');
            return;
        }

       
        const nuevoId = Math.max(...lineasInvestigacionBase.map(t => t.id), 0) + 1; // esto se aumentar con el math.max en base al ultimo id y lo que hace es sumarle 1 
        const nuevoRegistro = {
            id: nuevoId,
            nombre: nombre,
        };

        // .push() inserta el nuevo objeto al final del Array en memoria
        lineasInvestigacionBase.push(nuevoRegistro);
        lineasInvestigacionFiltradas = [...lineasInvestigacionBase];

        // Guardamos permanentemente la lista actualizada convirtiéndola en JSON
        localStorage.setItem('lineasInvestigacion', JSON.stringify(lineasInvestigacionBase));

        modalBootstrap.hide();
        renderizarTabla();
        alert('Línea de Investigación agregada correctamente');
        modal.remove();
    });
};