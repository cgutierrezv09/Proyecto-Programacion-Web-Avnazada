// Estas funciones son para el botón o flecha de ver mas de los pdf

function toggleMas1(el) {
    el.classList.add('d-none');
}
function toggleMas2(el) {
    el.classList.add('d-none');
}

function toggleMas3(el) {
    el.classList.add('d-none');
}

function toggleMas4(el) {
    el.classList.add('d-none');
}


// ROLES DEL USUARIO


let rolActual = localStorage.getItem('rol') || 'estudiante';

// Función para aplicar el rol (mostrar/ocultar elementos con data-roles) - GLOBAL
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
            'docente': 'Docente',
            'estudiante': 'Estudiante'
        };
        rolActualEl.textContent = `Rol Actual: ${roles[rol]}`;
        rolActualEl.style.display = 'block';
    };

    const btnEstudiante = document.getElementById('btn-estudiante');
    const btnAdmin = document.getElementById('btn-admin');
    const btnDocente = document.getElementById('btn-docente');

    // Event listeners para los botones de rol
    if (btnEstudiante) {
        btnEstudiante.addEventListener('click', function () {
            rolActual = 'estudiante';
            btnEstudiante.style.display = 'none';
            btnAdmin.style.display = 'block';
            btnDocente.style.display = 'block';
            localStorage.setItem('rol', rolActual);
            mostrarRolActual(rolActual);
            aplicarRol(rolActual);
        });
    }

    if (btnAdmin) {
        btnAdmin.addEventListener('click', function () {
            rolActual = 'admin';
            btnAdmin.style.display = 'none';
            btnEstudiante.style.display = 'block';
            btnDocente.style.display = 'block';
            localStorage.setItem('rol', rolActual);
            mostrarRolActual(rolActual);
            aplicarRol(rolActual);
        });
    }

    if (btnDocente) {
        btnDocente.addEventListener('click', function () {
            rolActual = 'docente';
            btnDocente.style.display = 'none';
            btnEstudiante.style.display = 'block';
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


// LISTA DE PRODUCCIÓN ACADÉMICA


const REGISTROS_POR_PAGINA = 10;
let paginaActual = 1;

// 1. Obtener los registros guardados en el LocalStorage
const registrosLocal = JSON.parse(localStorage.getItem("registros")) || [];

// 2. REEMPLAZAR O AGREGAR de forma inteligente para evitar duplicaciones por ID
registrosLocal.forEach(registroL => {
    // Buscamos si el registro de LocalStorage ya existía en la lista base (data.js)
    const indiceOriginal = produccionAcademica.findIndex(r => Number(r.id) === Number(registroL.id));
    
    if (indiceOriginal !== -1) {
        // Si ya existía, reemplazamos el viejo por la versión editada del LocalStorage
        produccionAcademica[indiceOriginal] = registroL;
    } else {
        // Si no existía (es un registro nuevo creado desde el formulario), lo agregamos al final
        produccionAcademica.push(registroL);
    }
});

// 3. Declarar la variable de filtros una vez procesada la lista sin duplicados
let registrosFiltrados = [...produccionAcademica];

console.log(registrosFiltrados);






// Renderizar tabla
const renderizarTabla = () => {
    const tabla = document.getElementById('tabla-produccion');
    if (!tabla) return; // Evita error si no existe el elemento

    tabla.innerHTML = '';

    if (registrosFiltrados.length === 0) {
        const sinResultados = document.getElementById('sin-resultados');
        if (sinResultados) sinResultados.classList.remove('d-none');

        const paginacion = document.getElementById('paginacion');
        if (paginacion) paginacion.innerHTML = '';
        return;
    }

    const sinResultados = document.getElementById('sin-resultados');
    if (sinResultados) sinResultados.classList.add('d-none');

    // Calcular índices para la página actual
    const inicio = (paginaActual - 1) * REGISTROS_POR_PAGINA;
    const fin = inicio + REGISTROS_POR_PAGINA;
    const registrosPagina = registrosFiltrados.slice(inicio, fin);

    registrosPagina.forEach(registro => {
        const fila = `
        <tr>
            <td>
                <a href="detalle.html?id=${registro.id}" class="text-decoration-none">
                    ${registro.titulo.substring(0, 40)}...
                </a>
            </td>
            <td><span class="badge bg-primary">${registro.tipo}</span></td>
            <td>${registro.autor}</td>
            <td><small>${registro.carrera}</small></td>
            <td><small>${registro.area}</small></td>
            <td>${registro.año}</td>
            <td>
                <div class="btn-group btn-group-sm d-flex column-gap-2 mx-3" role="group">
                    <button class="btn btn-info" onclick="mostrarModal(${JSON.stringify(registro).replace(/"/g, '&quot;')})" title="Ver">
                        <i class="fas fa-eye"></i>
                    </button>
     <button class="btn btn-warning" data-roles="admin,docente" title="Editar"
onclick='abrirModalEditar(${JSON.stringify(registro).replace(/'/g, '&quot;')})'>
    <i class="fas fa-edit"></i>
</button>
                    
                    <button class="btn btn-danger" data-roles="admin" title="Eliminar" onclick="mostrarModalEliminar(${JSON.stringify(registro).replace(/"/g, '&quot;')})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </td>
        </tr>
    `;
        tabla.innerHTML += fila;

    });


    renderizarPaginacion();
    aplicarRol(rolActual);
};

// Renderizar paginación
const renderizarPaginacion = () => {
    const paginacion = document.getElementById('paginacion');
    if (!paginacion) return;

    paginacion.innerHTML = '';

    const totalPaginas = Math.ceil(registrosFiltrados.length / REGISTROS_POR_PAGINA);

    if (totalPaginas <= 1) return;

    // Botón anterior
    const btnAnterior = `
        <li class="page-item ${paginaActual === 1 ? 'disabled' : ''}">
            <a class="page-link" href="#" onclick="cambiarPagina(${paginaActual - 1}); return false;">Anterior</a>
        </li>
    `;
    paginacion.innerHTML += btnAnterior;

    // Números de páginas
    for (let i = 1; i <= totalPaginas; i++) {
        const btnPagina = `
            <li class="page-item ${i === paginaActual ? 'active' : ''}">
                <a class="page-link" href="#" onclick="cambiarPagina(${i}); return false;">${i}</a>
            </li>
        `;
        paginacion.innerHTML += btnPagina;
    }

    // Botón siguiente
    const btnSiguiente = `
        <li class="page-item ${paginaActual === totalPaginas ? 'disabled' : ''}">
            <a class="page-link" href="#" onclick="cambiarPagina(${paginaActual + 1}); return false;">Siguiente</a>
        </li>
    `;
    paginacion.innerHTML += btnSiguiente;
};

// Cambiar página
const cambiarPagina = (nuevaPagina) => {
    const totalPaginas = Math.ceil(registrosFiltrados.length / REGISTROS_POR_PAGINA);
    if (nuevaPagina >= 1 && nuevaPagina <= totalPaginas) {
        paginaActual = nuevaPagina;
        renderizarTabla();
        window.scrollTo(0, 0);
    }
};





// Aplicar filtros
const aplicarFiltros = () => {
    const buscar = document.getElementById('buscar');
    if (!buscar) return;

    const busqueda = buscar.value.toLowerCase();
    const tiposSeleccionados = Array.from(document.querySelectorAll('.filtro-tipo:checked')).map(el => el.value);
    const carrerasSeleccionadas = Array.from(document.querySelectorAll('.filtro-carrera:checked')).map(el => el.value);
    const areasSeleccionadas = Array.from(document.querySelectorAll('.filtro-area:checked')).map(el => el.value);
    const añosSeleccionados = Array.from(document.querySelectorAll('.filtro-año:checked')).map(el => parseInt(el.value));

    registrosFiltrados = produccionAcademica.filter(registro => {
        // Filtro de búsqueda
        const cumpleBusqueda = busqueda === '' ||
            registro.titulo.toLowerCase().includes(busqueda) ||
            registro.autor.toLowerCase().includes(busqueda);

        // Filtro de tipo
        const cumpleTipo = tiposSeleccionados.length === 0 || tiposSeleccionados.includes(registro.tipo);

        // Filtro de carrera
        const cumpleCarrera = carrerasSeleccionadas.length === 0 || carrerasSeleccionadas.includes(registro.carrera);

        // Filtro de área
        const cumpleArea = areasSeleccionadas.length === 0 || areasSeleccionadas.includes(registro.area);

        // Filtro de año
        const cumpleAño = añosSeleccionados.length === 0 || añosSeleccionados.includes(registro.año);

        return cumpleBusqueda && cumpleTipo && cumpleCarrera && cumpleArea && cumpleAño;
    });

    paginaActual = 1;
    renderizarTabla();
};

// Limpiar filtros
const limpiarFiltros = () => {
    const buscar = document.getElementById('buscar');
    if (buscar) buscar.value = '';

    document.querySelectorAll('.filtro-tipo, .filtro-carrera, .filtro-area, .filtro-año').forEach(cb => {
        cb.checked = false;
    });
    aplicarFiltros();
};

// Event listeners para la tabla
document.addEventListener('DOMContentLoaded', function () {
    // Búsqueda
    const buscar = document.getElementById('buscar');
    if (buscar) buscar.addEventListener('input', aplicarFiltros);

    // Filtros
    //aplica los filtros por el value que tiene los checkbox en el html 
    document.querySelectorAll('.filtro-tipo, .filtro-carrera, .filtro-area, .filtro-año').forEach(checkbox => {
        checkbox.addEventListener('change', aplicarFiltros);
    });

    // Limpiar filtros
    const limpiarBtn = document.getElementById('limpiar-filtros');
    if (limpiarBtn) limpiarBtn.addEventListener('click', limpiarFiltros);

    // Renderizar inicial
    if (document.getElementById('tabla-produccion')) {
        renderizarTabla();
    }
});


// modal de informacion del documento 
//se carga desde data.js


const crearModal = (registro) => {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.tabIndex = -1;

    const modalDialog = document.createElement('div');
    modalDialog.className = 'modal-dialog modal-lg';

    const modalContent = document.createElement('div');
    modalContent.className = 'modal-content';

    const modalHeader = document.createElement('div');
    modalHeader.className = 'modal-header';

    const modalTitle = document.createElement('h5');
    modalTitle.className = 'modal-title';
    modalTitle.textContent = registro.titulo;

    const modalBtnCerrar = document.createElement('button');
    modalBtnCerrar.className = 'btn-close';
    modalBtnCerrar.setAttribute('data-bs-dismiss', 'modal');

    const modalBody = document.createElement('div');
    modalBody.className = 'modal-body';
    modalBody.innerHTML = `
    <p><strong>Autor:</strong> ${registro.autor}</p>
    <p><strong>Carrera:</strong> ${registro.carrera}</p>
    <p><strong>Tecnologías:</strong> ${registro.tecnologias.join(', ')}</p>
    <p><strong>Año:</strong> ${registro.año}</p>
    <p><strong>Resumen:</strong> ${registro.resumen}</p>
    <p><strong>Contenido:</strong> ${registro.contenido}</p>
    `;

    const modalFooter = document.createElement('div');
    modalFooter.className = 'modal-footer';

    const modalBtnClose = document.createElement('button');
    modalBtnClose.className = 'btn btn-secondary';
    modalBtnClose.setAttribute('data-bs-dismiss', 'modal');
    modalBtnClose.textContent = 'Cerrar';

    modalHeader.appendChild(modalTitle);
    modalHeader.appendChild(modalBtnCerrar);

    modalContent.appendChild(modalHeader);
    modalContent.appendChild(modalBody);
    modalContent.appendChild(modalFooter);

    modalDialog.appendChild(modalContent);
    modal.appendChild(modalDialog);
    modalFooter.appendChild(modalBtnClose);

    return modal;
};

const mostrarModal = (registro) => {
    const modal = crearModal(registro);
    document.body.appendChild(modal);

    const modalBootstrap = new bootstrap.Modal(modal);
    modalBootstrap.show();
};

/**Modal de eliminar    */
//Todo estos datos se cargan desde el data. js
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
        <p class="mb-2"><strong>¿Deseas eliminar este documento?</strong></p>
        <p class="text-muted small mb-0">${registro.titulo}</p>
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
        produccionAcademica = produccionAcademica.filter(r => r.id !== registro.id);
        registrosFiltrados = registrosFiltrados.filter(r => r.id !== registro.id);

        modalBootstrap.hide();
        renderizarTabla();
        alert('Documento eliminado correctamente');
        modal.remove();
    });
};


// 1. FUNCIÓN PARA CREAR EL HTML DEL MODAL

const crearModalEditar = () => {
    // Si por alguna razón ya existe en el DOM, lo removemos para evitar duplicados
    const viejoModal = document.getElementById('modalEditar');
    if (viejoModal) viejoModal.remove();

    const modal = document.createElement('div');
    modal.className = 'modal fade';
    modal.id = 'modalEditar';
    modal.tabIndex = -1;

    modal.innerHTML = `
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Editar Registro</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <input type="hidden" id="edit-id">

                    <div class="mb-3">
                        <label class="form-label">Título</label>
                        <input type="text" class="form-control" id="edit-titulo">
                    </div>

                    <div class="mb-3">
                        <label class="form-label">Autor</label>
                        <input type="text" class="form-control" id="edit-autor">
                    </div>

                    <div class="mb-3">
                        <label class="form-label">Tipo</label>
                        <input type="text" class="form-control" id="edit-tipo">
                    </div>

                    <div class="mb-3">
                        <label class="form-label">Carrera</label>
                        <input type="text" class="form-control" id="edit-carrera">
                    </div>

                    <div class="mb-3">
                        <label class="form-label">Área</label>
                        <input type="text" class="form-control" id="edit-area">
                    </div>

                    <div class="mb-3">
                        <label class="form-label">Año</label>
                        <input type="number" class="form-control" id="edit-año">
                    </div>

                    <div class="mb-3">
                        <label class="form-label">Resumen</label>
                        <textarea class="form-control" id="edit-resumen"></textarea>
                    </div>

                    <div class="mb-3">
                        <label class="form-label">Tecnologías</label>
                        <input type="text" class="form-control" id="edit-tecnologias" placeholder="Java, Python, etc">
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                    <button type="button" class="btn btn-primary" id="btnGuardar">Guardar cambios</button>
                </div>
            </div>
        </div>
    `;

    document.body.appendChild(modal);
    return modal;
};


//FUNCIÓN PARA ABRIR Y GESTIONAR EL GUARDADO

function abrirModalEditar(registro) {
    // Forzamos la creación limpia del HTML en el DOM
    const modalElement = crearModalEditar(); 

    // Rellenamos los campos con la información del registro seleccionado
    document.getElementById("edit-id").value = registro.id;
    document.getElementById("edit-titulo").value = registro.titulo;
    document.getElementById("edit-autor").value = registro.autor;
    document.getElementById("edit-tipo").value = registro.tipo;
    document.getElementById("edit-carrera").value = registro.carrera;
    document.getElementById("edit-area").value = registro.area;
    document.getElementById("edit-año").value = registro.año;
    document.getElementById("edit-resumen").value = registro.resumen;
    document.getElementById("edit-tecnologias").value = registro.tecnologias ? registro.tecnologias.join(", ") : "";

    // Capturamos el botón del modal de forma segura
    const btnGuardar = document.getElementById("btnGuardar");

    // Asignamos el Listener al botón de guardar cambios
    btnGuardar.addEventListener("click", function() {
        const id = Number(document.getElementById("edit-id").value);
        let registros = JSON.parse(localStorage.getItem("registros")) || [];
        
        // Buscamos si ya existe en LocalStorage (comparando estrictamente como números)
        let indice = registros.findIndex(r => Number(r.id) === id);

        // Creamos el objeto modificado con los datos actuales del formulario
        const registroActualizado = {
            id: id,
            titulo: document.getElementById("edit-titulo").value,
            autor: document.getElementById("edit-autor").value,
            tipo: document.getElementById("edit-tipo").value,
            carrera: document.getElementById("edit-carrera").value,
            area: document.getElementById("edit-area").value,
            año: parseInt(document.getElementById("edit-año").value) || new Date().getFullYear(),
            resumen: document.getElementById("edit-resumen").value,
            tecnologias: document.getElementById("edit-tecnologias").value
                .split(",")
                .map(t => t.trim())
                .filter(t => t !== "")
        };

        if (indice !== -1) {
            // Si ya existía en LocalStorage, lo actualizamos preservando otras propiedades si las hubiera
            registros[indice] = { ...registros[indice], ...registroActualizado };
        } else {
            // Si venía por defecto de data.js, lo agregamos como nuevo al LocalStorage para que sea persistente
            registros.push(registroActualizado);
        }

        // Guardar la lista actualizada en LocalStorage
        localStorage.setItem("registros", JSON.stringify(registros));

        // Sincronizar arreglos en memoria RAM para que la tabla refleje el cambio de inmediato
        if (typeof produccionAcademica !== 'undefined') {
            const idxOriginal = produccionAcademica.findIndex(r => Number(r.id) === id);
            if (idxOriginal !== -1) {
                produccionAcademica[idxOriginal] = { ...produccionAcademica[idxOriginal], ...registroActualizado };
            } else {
                produccionAcademica.push(registroActualizado);
            }
        }
        
        if (typeof registrosFiltrados !== 'undefined') {
            const idxFiltrados = registrosFiltrados.findIndex(r => Number(r.id) === id);
            if (idxFiltrados !== -1) {
                registrosFiltrados[idxFiltrados] = { ...registrosFiltrados[idxFiltrados], ...registroActualizado };
            } else {
                registrosFiltrados.push(registroActualizado);
            }
        }

        // Volver a dibujar la tabla con los datos nuevos
        renderizarTabla();

        // Cerrar modal
        const modalBootstrap = bootstrap.Modal.getInstance(modalElement);
        modalBootstrap.hide();

        alert("Producción académica actualizada correctamente.");
    });

    // Inicializar el modal en Bootstrap y mostrarlo
    const modalEditar = new bootstrap.Modal(modalElement);
    modalEditar.show();
}




const inputBuscar = document.getElementById("buscarRepositorio");

inputBuscar.addEventListener("input", buscarCards);

function buscarCards() {

    const texto = inputBuscar.value.toLowerCase().trim();

    const cards = document.querySelectorAll(".container.mt-5.mb-5 .card");

    cards.forEach(card => {

        const contenido = card.innerText.toLowerCase();

        if (contenido.includes(texto)) {
            card.style.display = "";
        } else {
            card.style.display = "none";
        }

    });

}