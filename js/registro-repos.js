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

    const btnAdmin = document.getElementById('btn-admin');
    const btnDocente = document.getElementById('btn-docente');

    // Event listeners para los botones de rol

    if (btnAdmin) {
        btnAdmin.addEventListener('click', function () {
            rolActual = 'admin';
            btnAdmin.style.display = 'none';
       
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



document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("form-registro");
    if (!form) return; // Validación de seguridad por si el script se carga en otra página

    // Elementos del formulario
    const txtAutor = document.getElementById("autor");
    const txtTitulo = document.getElementById("titulo");
    const selTipo = document.getElementById("tipo");
    const selCarrera = document.getElementById("carrera");
    const selArea = document.getElementById("area");
    const txtTecnologias = document.getElementById("tecnologias");
    const numAño = document.getElementById("año");
    const txtResumen = document.getElementById("resumen");
    const fileDocumento = document.getElementById("documento");
    const divFileName = document.getElementById("file-name");

   
    // 1. FUNCIONES DE VALIDACIÓN INDEPENDIENTES
   

    function validarAutor() {
        const errorContainer = document.getElementById("error-autor");
        const valor = txtAutor.value.trim();
        const regexLetras = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;

        if (!valor) {
            errorContainer.textContent = "El autor es requerido.";
            return false;
        }
        if (valor.length < 3 || valor.length > 80) {
            errorContainer.textContent = "El autor debe tener entre 3 y 80 caracteres.";
            return false;
        }
        if (!regexLetras.test(valor)) {
            errorContainer.textContent = "El autor solo debe contener letras y espacios.";
            return false;
        }

        errorContainer.textContent = "";
        return true;
    }

    function validarTitulo() {
        const errorContainer = document.getElementById("error-titulo");
        const valor = txtTitulo.value.trim();

        if (!valor) {
            errorContainer.textContent = "El título es requerido.";
            return false;
        }
        if (valor.length < 5 || valor.length > 150) {
            errorContainer.textContent = "El título debe tener entre 5 y 150 caracteres.";
            return false;
        }

        errorContainer.textContent = "";
        return true;
    }

    function validarTipo() {
        const errorContainer = document.getElementById("error-tipo");
        if (!selTipo.value) {
            errorContainer.textContent = "Debe seleccionar un tipo de estudio.";
            return false;
        }
        errorContainer.textContent = "";
        return true;
    }

    function validarCarrera() {
        const errorContainer = document.getElementById("error-carrera");
        if (!selCarrera.value) {
            errorContainer.textContent = "Debe seleccionar una carrera.";
            return false;
        }
        errorContainer.textContent = "";
        return true;
    }

    function validarArea() {
        const errorContainer = document.getElementById("error-area");
        if (!selArea.value) {
            errorContainer.textContent = "Debe seleccionar un área de conocimiento.";
            return false;
        }
        errorContainer.textContent = "";
        return true;
    }

    function validarTecnologias() {
        const errorContainer = document.getElementById("error-tecnologias");
        const valor = txtTecnologias.value.trim();

        if (!valor) {
            errorContainer.textContent = "Las tecnologías son requeridas.";
            return false;
        }
        if (valor.length > 200) {
            errorContainer.textContent = "El campo tecnologías no puede superar los 200 caracteres.";
            return false;
        }
        if (valor.startsWith(",") || valor.endsWith(",")) {
            errorContainer.textContent = "La lista no puede empezar ni terminar con una coma.";
            return false;
        }
        if (/,\s*,/.test(valor)) {
            errorContainer.textContent = "No se permiten comas dobles o elementos vacíos.";
            return false;
        }

        errorContainer.textContent = "";
        return true;
    }

    function validarAño() {
        const errorContainer = document.getElementById("error-año");
        const valor = numAño.value.trim();
        const añoInt = parseInt(valor, 10);
        const añoActual = new Date().getFullYear();

        if (!valor) {
            errorContainer.textContent = "El año es requerido.";
            return false;
        }
        if (isNaN(añoInt) || !/^\d+$/.test(valor)) {
            errorContainer.textContent = "Ingrese un año entero válido.";
            return false;
        }
        if (añoInt < 1900 || añoInt > añoActual) {
            errorContainer.textContent = `El año debe estar entre 1900 y el año actual (${añoActual}).`;
            return false;
        }

        errorContainer.textContent = "";
        return true;
    }

    function validarResumen() {
        const errorContainer = document.getElementById("error-resumen");
        const valor = txtResumen.value.trim();

        if (!valor) {
            errorContainer.textContent = "El resumen es requerido.";
            return false;
        }
        if (valor.length < 20 || valor.length > 500) {
            errorContainer.textContent = "El resumen debe tener entre 20 y 500 caracteres.";
            return false;
        }

        errorContainer.textContent = "";
        return true;
    }

    function validarDocumento() {
        const errorContainer = document.getElementById("error-documento");
        const archivo = fileDocumento.files[0];
        const tamañoMaximo = 5 * 1024 * 1024; 

        if (!archivo) {
            errorContainer.textContent = "Debe adjuntar un documento PDF.";
            return false;
        }

        const esPDF = archivo.type === "application/pdf" || archivo.name.toLowerCase().endsWith(".pdf");
        if (!esPDF) {
            errorContainer.textContent = "El archivo debe ser exclusivamente en formato PDF.";
            return false;
        }

        if (archivo.size > tamañoMaximo) {
            errorContainer.textContent = "El tamaño del archivo no puede superar los 5MB.";
            return false;
        }

        errorContainer.textContent = "";
        return true;
    }

   
    // 2. EVENTOS EN TIEMPO REAL
   
    txtAutor.addEventListener("input", validarAutor);
    txtTitulo.addEventListener("input", validarTitulo);
    selTipo.addEventListener("change", validarTipo);
    selCarrera.addEventListener("change", validarCarrera);
    selArea.addEventListener("change", validarArea);
    txtTecnologias.addEventListener("input", validarTecnologias);
    numAño.addEventListener("input", validarAño);
    txtResumen.addEventListener("input", validarResumen);
    
    fileDocumento.addEventListener("change", () => {
        if (fileDocumento.files.length > 0) {
            divFileName.textContent = `Archivo seleccionado: ${fileDocumento.files[0].name}`;
        } else {
            divFileName.textContent = "";
        }
        validarDocumento();
    });

   
    // 3. EVENTO SUBMIT (VALIDACIÓN + GUARDADO)
   
    form.addEventListener("submit", function (e) {
        // Detener siempre el flujo al inicio para analizar el estado de los datos
        e.preventDefault();

        // Ejecutar y pintar errores de todos los campos
        const esAutorValido = validarAutor();
        const esTituloValido = validarTitulo();
        const esTipoValido = validarTipo();
        const esCarreraValido = validarCarrera();
        const esAreaValido = validarArea();
        const esTecnologiasValido = validarTecnologias();
        const esAñoValido = validarAño();
        const esResumenValido = validarResumen();
        const esDocumentoValido = validarDocumento();

        const formularioTotalmenteValido = 
            esAutorValido && 
            esTituloValido && 
            esTipoValido && 
            esCarreraValido && 
            esAreaValido && 
            esTecnologiasValido && 
            esAñoValido && 
            esResumenValido && 
            esDocumentoValido;

        // SI HAY ERRORES: Mover foco al primero defectuoso e interrumpir el proceso
        if (!formularioTotalmenteValido) {
            if (!esAutorValido) txtAutor.focus();
            else if (!esTituloValido) txtTitulo.focus();
            else if (!esTipoValido) selTipo.focus();
            else if (!esCarreraValido) selCarrera.focus();
            else if (!esAreaValido) selArea.focus();
            else if (!esTecnologiasValido) txtTecnologias.focus();
            else if (!esAñoValido) numAño.focus();
            else if (!esResumenValido) txtResumen.focus();
            else if (!esDocumentoValido) fileDocumento.focus();
            
            return; // Bloquea por completo el guardado en LocalStorage
        }

        // SI TODO PASÓ LAS REGLAS: Se procede a estructurar el objeto y guardar
        const nuevoRegistro = {
            id: Date.now(),
            titulo: txtTitulo.value.trim(),
            autor: txtAutor.value.trim(),
            tipo: selTipo.value,
            carrera: selCarrera.value,
            area: selArea.value,
            año: parseInt(numAño.value, 10),
            resumen: txtResumen.value.trim(),
            documento: fileDocumento.files[0]?.name || "Sin PDF",
            tecnologias: txtTecnologias.value
                .split(",")
                .map(t => t.trim())
                .filter(t => t !== ""), // Filtra posibles campos vacíos indeseados
            contenido: "Documento registrado por el usuario."
        };

        // Obtener registros existentes de LocalStorage
        let registros = JSON.parse(localStorage.getItem("registros")) || [];

        // Insertar el nuevo elemento estructurado
        registros.push(nuevoRegistro);

        // Actualizar el almacenamiento persistente
        localStorage.setItem("registros", JSON.stringify(registros));

        // Feedback al usuario y limpieza del entorno de trabajo
        alert("Producción académica registrada correctamente.");
        form.reset();
        divFileName.textContent = "";
    });
});