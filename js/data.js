
// USUARIOS

let usuarios = [
    { id: 1, nombre: 'Cristopher Vega', email: 'cvega@cenfotec.ac.cr', rol: 'administrador', estado: 'activo' },
    { id: 2, nombre: 'Andrea Mora', email: 'andrea.mora@cenfotec.ac.cr', rol: 'docente', estado: 'activo' },
    { id: 3, nombre: 'Diego Vargas', email: 'diego.vargas@cenfotec.ac.cr', rol: 'docente', estado: 'activo' },
    { id: 4, nombre: 'Marco Chinchilla', email: 'marco.chinchilla@cenfotec.ac.cr', rol: 'estudiante', estado: 'activo' },
    { id: 5, nombre: 'Sofia Pérez', email: 'sofia.perez@cenfotec.ac.cr', rol: 'docente', estado: 'activo' },
    { id: 6, nombre: 'Luis Rosero', email: 'luis.rosero@cenfotec.ac.cr', rol: 'estudiante', estado: 'activo' },
    { id: 7, nombre: 'Camila Piedra', email: 'camila.piedra@cenfotec.ac.cr', rol: 'estudiante', estado: 'inactivo' },
    
];


// TIPOS DE PRODUCCIÓN ACADÉMICA

let tiposProduccion = [
    { id: 1, nombre: 'Tesis', descripcion: 'Trabajo de investigación para grado académico' },
    { id: 2, nombre: 'Artículo', descripcion: 'Artículo académico publicado o en revisión' },
    { id: 3, nombre: 'Investigación', descripcion: 'Proyecto de investigación completo' },
    { id: 4, nombre: 'Caso de Estudio', descripcion: 'Análisis detallado de un caso específico' },
    { id: 5, nombre: 'Propuesta', descripcion: 'Propuesta de proyecto o producto' },
     { id: 6, nombre: 'Tesis', descripcion: 'Trabajo de investigación para grado académico con IA' },
     { id: 7, nombre: 'Examenes', descripcion: 'Examenes de años pasados realizados por los estudiantes' },
];


// CATEGORÍAS

let categorias = [
    { id: 1, nombre: 'Desarrollo Web' },
    { id: 2, nombre: 'Seguridad Informática' },
    { id: 3, nombre: 'Base de Datos' },
    { id: 4, nombre: 'Inteligencia Artificial' },
    { id: 5, nombre: 'DevOps' },
    { id: 6, nombre: 'Metodologías Ágiles' },
    { id: 7, nombre: 'Scrum Master' },
];


// ÁREAS DE CONOCIMIENTO

let areasConocimiento = [
    { id: 1, nombre: 'Ingeniería de Software' },
    { id: 2, nombre: 'Ciberseguridad' },
    { id: 3, nombre: 'Sistemas Distribuidos' },
    { id: 4, nombre: 'Análisis de Datos' },
    { id: 5, nombre: 'Desarrollo Móvil' },
    { id: 6, nombre: 'Cloud Computing' },
    { id: 7, nombre: 'Ciencia de datos' }
];


// TECNOLOGÍAS

let tecnologias = [
    { id: 1, nombre: 'JavaScript' },
    { id: 2, nombre: 'React' },
    { id: 3, nombre: 'Node.js' },
    { id: 4, nombre: 'Python' },
    { id: 5, nombre: 'Java' },
    { id: 6, nombre: 'SQL' },
    { id: 7, nombre: 'Docker' },
    { id: 8, nombre: 'Kubernetes' },
    { id: 9, nombre: 'Machine Learning' },
    { id: 10, nombre: 'Angular' },
    { id: 11, nombre: 'Vue.js' },
    { id: 12, nombre: 'AWS' },
];


// TIPOS DE INVESTIGACIÓN

let tiposInvestigacion = [
    { id: 1, nombre: 'Investigación Básica' },
    { id: 2, nombre: 'Investigación Aplicada' },
    { id: 3, nombre: 'Desarrollo Experimental' },
    { id: 4, nombre: 'Estudio de Caso' },
    { id: 5, nombre: 'Análisis Comparativo' },
];

// CARRERAS
let carreras = [
    { id: 1, nombre: 'Ingeniería en Software' },
    { id: 2, nombre: 'Ingeniería en Sistemas Computacionales' },
    { id: 3, nombre: 'Administración de TI' },
    { id: 4, nombre: 'Ciberseguridad' },
    { id: 5, nombre: 'Análisis de Datos' },
];


// LÍNEAS DE INVESTIGACIÓN

let lineasInvestigacion = [
    { id: 1, nombre: 'Seguridad en Aplicaciones Web' },
    { id: 2, nombre: 'Arquitecturas de Software Escalables' },
    { id: 3, nombre: 'Machine Learning en Costa Rica' },
    { id: 4, nombre: 'DevOps y Automatización' },
    { id: 5, nombre: 'Desarrollo Sostenible de Software' },
];


// PRODUCCIÓN ACADÉMICA

let produccionAcademica = [
    {
        id: 1,
        titulo: 'Implementación de algoritmos de machine learning para la detección de fraude financiero',
        tipo: 'Tesis',
        autor: 'Mora Jiménez Andrea',
        carrera: 'Ingeniería en Software',
        area: 'Inteligencia Artificial',
        linea: 'Machine Learning en Costa Rica',
        tecnologias: ['Python', 'Machine Learning', 'SQL'],
        tipoInvestigacion: 'Investigación Aplicada',
        categoria: 'Inteligencia Artificial',
        año: 2024,
        resumen: 'Este proyecto analiza el comportamiento de transacciones bancarias mediante modelos supervisados de clasificación.',
        contenido: 'Se utilizaron algoritmos como Random Forest y SVM sobre un dataset de 50,000 transacciones. Los resultados muestran una precisión del 94% en la detección de transacciones fraudulentas en tiempo real.',
        estado: 'publicado'
    },
    {
        id: 2,
        titulo: 'Diseño de una arquitectura de microservicios para sistemas de salud en Costa Rica',
        tipo: 'Investigación',
        autor: 'Vargas Solano Diego y Pérez Ulate Sofía',
        carrera: 'Ingeniería en Sistemas Computacionales',
        area: 'Sistemas Distribuidos',
        linea: 'Arquitecturas de Software Escalables',
        tecnologias: ['Docker', 'Kubernetes', 'Node.js', 'AWS'],
        tipoInvestigacion: 'Investigación Aplicada',
        categoria: 'Desarrollo Web',
        año: 2023,
        resumen: 'Propuesta de arquitectura distribuida para la gestión de expedientes médicos electrónicos en clínicas privadas.',
        contenido: 'La solución implementa contenedores Docker y orquestación con Kubernetes, logrando una reducción del 60% en tiempos de respuesta comparado con el sistema monolítico anterior.',
        estado: 'publicado'
    },
    {
        id: 3,
        titulo: 'Análisis de vulnerabilidades en aplicaciones web desarrolladas con frameworks modernos',
        tipo: 'Artículo',
        autor: 'Chinchilla Rojas Marco',
        carrera: 'Ingeniería en Software',
        area: 'Ciberseguridad',
        linea: 'Seguridad en Aplicaciones Web',
        tecnologias: ['JavaScript', 'React', 'Angular', 'Vue.js'],
        tipoInvestigacion: 'Análisis Comparativo',
        categoria: 'Seguridad Informática',
        año: 2025,
        resumen: 'Estudio comparativo de vulnerabilidades OWASP Top 10 en aplicaciones construidas con React, Angular y Vue.',
        contenido: 'Se realizaron pruebas de penetración sobre 15 aplicaciones reales. Angular presentó menor cantidad de vulnerabilidades XSS mientras que React mostró mejores resultados contra ataques de inyección.',
        estado: 'en revisión'
    },
    {
        id: 4,
        titulo: 'Automatización de procesos de CI/CD en equipos de desarrollo ágil',
        tipo: 'Caso de Estudio',
        autor: 'González López Rafael',
        carrera: 'Ingeniería en Sistemas Computacionales',
        area: 'DevOps',
        linea: 'DevOps y Automatización',
        tecnologias: ['Docker', 'Jenkins', 'GitHub', 'AWS'],
        tipoInvestigacion: 'Estudio de Caso',
        categoria: 'Metodologías Ágiles',
        año: 2024,
        resumen: 'Análisis de implementación de pipelines CI/CD en una empresa costarricense de desarrollo de software.',
        contenido: 'Se documentó el proceso completo desde la configuración inicial hasta la implementación en producción, generando un ahorro de 40 horas mensuales.',
        estado: 'publicado'
    },
    {
        id: 5,
        titulo: 'Optimización de consultas SQL en bases de datos relacionales de gran escala',
        tipo: 'Tesis',
        autor: 'Rodríguez Sáenz Patricia',
        carrera: 'Ingeniería en Software',
        area: 'Base de Datos',
        linea: 'Arquitecturas de Software Escalables',
        tecnologias: ['SQL', 'Java', 'PostgreSQL'],
        tipoInvestigacion: 'Investigación Aplicada',
        categoria: 'Base de Datos',
        año: 2023,
        resumen: 'Estudio de técnicas de indexación y particionamiento para mejorar el rendimiento de consultas.',
        contenido: 'Implementación de índices compuestos y particionamiento horizontal que redujeron tiempos de respuesta en un 70%.',
        estado: 'publicado'
    },
    {
        id: 6,
        titulo: 'Desarrollo de aplicación móvil para gestión de proyectos comunitarios',
        tipo: 'Investigación',
        autor: 'Trejos Montoya Daniela',
        carrera: 'Ingeniería en Software',
        area: 'Desarrollo Móvil',
        linea: 'Desarrollo Sostenible de Software',
        tecnologias: ['React', 'JavaScript', 'Node.js'],
        tipoInvestigacion: 'Desarrollo Experimental',
        categoria: 'Desarrollo Web',
        año: 2024,
        resumen: 'Aplicación móvil para coordinar y gestionar proyectos de desarrollo comunitario en zonas rurales.',
        contenido: 'La aplicación permite a líderes comunitarios organizar voluntarios, asignar tareas y dar seguimiento en tiempo real con conectividad limitada.',
        estado: 'publicado'
    },
    {
        id: 7,
        titulo: 'Implementación de estrategias de seguridad en la nube con AWS',
        tipo: 'Propuesta',
        autor: 'Arias Villalobos Carlos',
        carrera: 'Ciberseguridad',
        area: 'Cloud Computing',
        linea: 'Seguridad en Aplicaciones Web',
        tecnologias: ['AWS', 'Docker', 'IAM', 'VPC'],
        tipoInvestigacion: 'Investigación Aplicada',
        categoria: 'Seguridad Informática',
        año: 2025,
        resumen: 'Propuesta de framework de seguridad para empresas que migran infraestructura a AWS.',
        contenido: 'Define mejores prácticas de identidad, acceso, encriptación y monitoreo de seguridad en entornos cloud.',
        estado: 'borrador'
    },
    {
        id: 8,
        titulo: 'Análisis de tendencias en adopción de metodologías ágiles en Latinoamérica',
        tipo: 'Artículo',
        autor: 'Fernández Guzmán Lucía',
        carrera: 'Administración de TI',
        area: 'Ingeniería de Software',
        linea: 'Arquitecturas de Software Escalables',
        tecnologias: ['Scrum', 'Kanban'],
        tipoInvestigacion: 'Análisis Comparativo',
        categoria: 'Metodologías Ágiles',
        año: 2024,
        resumen: 'Estudio cuantitativo sobre la adopción de metodologías ágiles en empresas de software latinoamericanas.',
        contenido: 'Resultados muestran que el 72% de equipos utiliza Scrum, con mayor adopción en empresas con más de 50 empleados.',
        estado: 'publicado'
    },
    {
        id: 9,
        titulo: 'Creación de data warehouse para análisis de datos empresariales',
        tipo: 'Caso de Estudio',
        autor: 'Mora Álvarez Hernán',
        carrera: 'Análisis de Datos',
        area: 'Análisis de Datos',
        linea: 'Machine Learning en Costa Rica',
        tecnologias: ['SQL', 'Python', 'ETL'],
        tipoInvestigacion: 'Estudio de Caso',
        categoria: 'Base de Datos',
        año: 2023,
        resumen: 'Implementación de data warehouse para empresa de retail costarricense con 500+ tiendas.',
        contenido: 'Integración de datos de múltiples fuentes con procesos ETL automáticos permitiendo análisis en tiempo real.',
        estado: 'publicado'
    },
    {
        id: 10,
        titulo: 'Evaluación de frameworks JavaScript para aplicaciones empresariales',
        tipo: 'Investigación',
        autor: 'Blanco Ramírez Valeria',
        carrera: 'Ingeniería en Software',
        area: 'Ingeniería de Software',
        linea: 'Arquitecturas de Software Escalables',
        tecnologias: ['React', 'Angular', 'Vue.js', 'Node.js'],
        tipoInvestigacion: 'Análisis Comparativo',
        categoria: 'Desarrollo Web',
        año: 2024,
        resumen: 'Comparación de rendimiento, escalabilidad y experiencia de desarrollo en React, Angular y Vue.',
        contenido: 'Análisis de benchmarks, documentación, comunidad y casos de uso reales para cada framework.',
        estado: 'en revisión'
    },
    {
        id: 11,
        titulo: 'Sistema de autenticación centralizado con OAuth 2.0 y OpenID Connect',
        tipo: 'Tesis',
        autor: 'Solís Ureña Mauricio',
        carrera: 'Ciberseguridad',
        area: 'Ciberseguridad',
        linea: 'Seguridad en Aplicaciones Web',
        tecnologias: ['OAuth', 'OpenID Connect', 'Java', 'Spring Security'],
        tipoInvestigacion: 'Desarrollo Experimental',
        categoria: 'Seguridad Informática',
        año: 2024,
        resumen: 'Implementación de sistema de SSO (Single Sign-On) centralizado para reducir vulnerabilidades.',
        contenido: 'Soporte para múltiples proveedores de identidad con auditoría y trazabilidad completa de accesos.',
        estado: 'publicado'
    },
    {
        id: 12,
        titulo: 'Reducción de deuda técnica en proyectos heredados de software',
        tipo: 'Propuesta',
        autor: 'Castro Brenes Sofía',
        carrera: 'Ingeniería en Sistemas Computacionales',
        area: 'Ingeniería de Software',
        linea: 'Desarrollo Sostenible de Software',
        tecnologias: ['Refactoring', 'Testing', 'Git'],
        tipoInvestigacion: 'Investigación Aplicada',
        categoria: 'Metodologías Ágiles',
        año: 2025,
        resumen: 'Metodología para identificar, priorizar y resolver deuda técnica en aplicaciones legacy.',
        contenido: 'Framework con métricas de calidad de código y plan gradual de refactorización sin afectar producción.',
        estado: 'borrador'
    }
];

//Calcula indicadores 
const actualizarIndicadores = () => {
    
    if (!document.querySelector('[data-indicador="tesis"]')) return;
    
    const totalTesis = produccionAcademica.filter(p => p.tipo === 'Tesis').length;
    const totalArticulos = produccionAcademica.filter(p => p.tipo === 'Artículo').length;
    const totalInvestigaciones = produccionAcademica.filter(p => p.tipo === 'Investigación').length;
    const totalIA = produccionAcademica.filter(p => p.tecnologias.includes('Machine Learning')).length;

    document.querySelector('[data-indicador="tesis"]').textContent = totalTesis;
    document.querySelector('[data-indicador="articulos"]').textContent = totalArticulos;
    document.querySelector('[data-indicador="investigacion"]').textContent = totalInvestigaciones;
    document.querySelector('[data-indicador="ia"]').textContent = totalIA;
};

actualizarIndicadores();