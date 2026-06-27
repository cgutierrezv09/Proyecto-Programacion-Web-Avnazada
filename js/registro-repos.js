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

   // Simular carga de archivo
    const fileInput = document.getElementById('documento');
    const fileName = document.getElementById('file-name');

    fileInput.addEventListener('change', function(e) {
        if (this.files.length > 0) {
            fileName.textContent = '✓ ' + this.files[0].name;
        } else {
            fileName.textContent = '';
        }
    });

    // Drag and drop
    const uploadArea = document.querySelector('.file-upload-area');

    uploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadArea.style.backgroundColor = '#e8e8e8';
    });

    uploadArea.addEventListener('dragleave', () => {
        uploadArea.style.backgroundColor = '#f0f0f0';
    });

    uploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadArea.style.backgroundColor = '#f0f0f0';
        
        const files = e.dataTransfer.files;
        if (files.length > 0 && files[0].type === 'application/pdf') {
            fileInput.files = files;
            fileName.textContent = '✓ ' + files[0].name;
        }
    });