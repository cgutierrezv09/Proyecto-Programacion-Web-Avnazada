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
 

    // Event listeners para los botones de rol

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