

let rolActual = localStorage.getItem('rol') || 'admin';

const aplicarRol = (rol) => {
    const elementos = document.querySelectorAll('[data-roles]');

    elementos.forEach(element => {
        const rolesPermitidos = element.getAttribute('data-roles')
            .split(',')
            .map(r => r.trim());

        if (rolesPermitidos.includes(rol)) {
            element.classList.remove('d-none');
        } else {
            element.classList.add('d-none');
        }
    });
};

document.addEventListener('DOMContentLoaded', function () {
    // Función para mostrar el rol actual
    const mostrarRolActual = (rol) => {
        const rolActualEl = document.querySelector('.rol-actual');
        if (!rolActualEl) return; // Evita error si no existe el elemento
        
        const roles = {
            'admin': 'Administrador',
        };
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

    // Aplicar el rol al cargar
    aplicarRol(rolActual);
    mostrarRolActual(rolActual);
});



// GESTIÓN DE LOCALSTORAGE PARA CARRERAS


const REGISTROS_POR_PAGINA = 5;
let paginaActual = 1;

// 1. Inicializar la lista obteniendo los datos guardados de LocalStorage.
// Si está vacío, usa el arreglo 'carreras' global existente por defecto.
let carrerasBase = JSON.parse(localStorage.getItem('carreras')) || (typeof carreras !== 'undefined' ? carreras : []);

// Si no existía la clave en LocalStorage, la guardamos por primera vez
if (!localStorage.getItem('carreras')) {
    localStorage.setItem('carreras', JSON.stringify(carrerasBase));
}

let carrerasFiltradas = [...carrerasBase];


const renderizarTabla = () => {
    const tabla = document.getElementById('tabla-produccion');
    if (!tabla) return;

    tabla.innerHTML = '';

    if (carrerasFiltradas.length === 0) {
        const sinResultados = document.getElementById('sin-resultados');
        if (sinResultados) sinResultados.classList.remove('d-none');
        const paginacion = document.getElementById('paginacion');
        if (paginacion) paginacion.innerHTML = '';
        return;
    }

    const sinResultados = document.getElementById('sin-resultados');
    if (sinResultados) sinResultados.classList.add('d-none');

    const inicio = (paginaActual - 1) * REGISTROS_POR_PAGINA;
    const fin = inicio + REGISTROS_POR_PAGINA;
    const registrosPagina = carrerasFiltradas.slice(inicio, fin);

    registrosPagina.forEach(registro => {
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
    const totalPaginas = Math.ceil(carrerasFiltradas.length / REGISTROS_POR_PAGINA);

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
    const totalPaginas = Math.ceil(carrerasFiltradas.length / REGISTROS_POR_PAGINA);
    if (nuevaPagina >= 1 && nuevaPagina <= totalPaginas) {
        paginaActual = nuevaPagina;
        renderizarTabla();
        window.scrollTo(0, 0);
    }
};

// Búsqueda
const aplicarBusqueda = () => {
    const busqueda = document.getElementById('buscar').value.toLowerCase();
    carrerasFiltradas = carrerasBase.filter(u => 
        u.nombre.toLowerCase().includes(busqueda)
    );
    paginaActual = 1;
    renderizarTabla();
};


// Eliminar Carrera (Persistente en LocalStorage)
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
        <p class="mb-2"><strong>¿Deseas eliminar esta Carrera?</strong></p>
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
        // Filtrar de las colecciones en memoria
        carrerasBase = carrerasBase.filter(r => r.id !== registro.id);
        carrerasFiltradas = carrerasFiltradas.filter(r => r.id !== registro.id);

        // ACTUALIZAR LOCALSTORAGE AL ELIMINAR
        localStorage.setItem('carreras', JSON.stringify(carrerasBase));

        modalBootstrap.hide();
        renderizarTabla();
        alert('Carrera eliminada correctamente');
        modal.remove();
    });
};

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    const buscar = document.getElementById('buscar');
    if (buscar) buscar.addEventListener('input', aplicarBusqueda);

    if (document.getElementById('tabla-produccion')) {
        renderizarTabla();
    }
});


// Modal para crear una Carrera (Persistente en LocalStorage)
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
    modalTitle.textContent = 'Agregar Carrera';

    const modalBtnCerrar = document.createElement('button');
    modalBtnCerrar.className = 'btn-close btn-close-white';
    modalBtnCerrar.setAttribute('data-bs-dismiss', 'modal');

    const modalBody = document.createElement('div');
    modalBody.className = 'modal-body';
    modalBody.innerHTML = `
        <div class="mb-3">
            <label for="nombre" class="form-label">Nombre</label>
            <input type="text" class="form-control" id="nombre" placeholder="Ej: Administración de Empresas">
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

        // Generar nuevo ID de forma dinámica usando el arreglo persistido
        const nuevoId = Math.max(...carrerasBase.map(t => t.id), 0) + 1;

        const nuevoRegistro = {
            id: nuevoId,
            nombre: nombre,
        };

        // Agregar a la lista local en memoria
        carrerasBase.push(nuevoRegistro);
        carrerasFiltradas = [...carrerasBase];

        // GUARDAR EN LOCALSTORAGE AL AGREGAR
        localStorage.setItem('carreras', JSON.stringify(carrerasBase));

        modalBootstrap.hide();
        renderizarTabla();
        alert('Carrera agregada correctamente');
        modal.remove();
    });
};