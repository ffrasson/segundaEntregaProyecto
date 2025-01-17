let usuarios = []; // guarda usuarios que accederán al sistema
let ingresos = []; // guarda ingresos

let formulario;
let inputNombre;
let inputApellido;
let inputApellidoMaterno;
let inputDni;
let inputEdad;
let tabla;
let datosRegistros;
let btnVaciar;
let btnImpr;
let btnAdd;
let formSelect;
let inputCabins;
let inputAdults;
let inputChildren;
let listaDetalles;
let ingreso;
let oneCabin = 60000;
let twoCabin = 120000;

// sección de validaciones de funciones
function main() {
    inicializarElementos();
    inicializarEventos();
    obtenerUsuariosLocalStorage();
    agregarUsuariosTabla();
    extraerLogin();
    vaciarUsuariosLocalStorage();
    botonImprimir();
}

class Usuarios {
    constructor(nombre, apellido, apellidoMaterno, dni, edad) {
        this.nombre = nombre.toUpperCase();
        this.apellido = apellido.toUpperCase();
        this.apellidoMaterno = apellidoMaterno.toUpperCase();
        this.dni = dni;
        this.edad = edad;
    }
}

class Ingresos {
    constructor(cabins, adults, children, total) {
        this.cabins = cabins;
        this.adults = adults;
        this.children = children;
        this.total = total;
    }
}

function inicializarElementos() { // inicializa los elementos
    formulario = document.getElementById('formulario');
    inputNombre = document.getElementById('inputNombre');
    inputApellido = document.getElementById('inputApellido');
    inputApellidoMaterno = document.getElementById('inputApellidoMaterno');
    inputDni = document.getElementById('inputDni');
    inputEdad = document.getElementById('inputEdad');
    tabla = document.getElementById('tablaUsuarios');
    datosRegistros = document.getElementById('datosRegistros');
    btnVaciar = document.getElementById('btnVaciar');
    btnImpr = document.getElementById('btnImpr');
    formSelect = document.getElementById('formSelect');
    inputCabins = document.getElementById('inputCabins');
    inputAdults = document.getElementById('inputAdults');
    inputChildren = document.getElementById('inputChildren');
    listaDetalles = document.getElementById('listaDetalles');
    btnAdd = document.getElementById('btnAdd');
}

function inicializarEventos() {
    formulario.onsubmit = (e) => validarFormulario(e);
    formSelect.onsubmit = (e) => validarIngresos(e);
}

function validarFormulario(e) {
    e.preventDefault();
    let nombre = inputNombre.value;
    let apellido = inputApellido.value;
    let apellidoMaterno = inputApellidoMaterno.value;
    let dni = inputDni.value;
    let edad = parseInt(inputEdad.value);
    let usuario = new Usuarios(nombre, apellido, apellidoMaterno, dni, edad);

    if (nombre === '') {
        setErrorFor(inputNombre, 'El nombre no puede estar vacío');
    } else if (!isLetters(nombre)) {
        setErrorFor(inputNombre, 'Debes escribir el nombre');
    } else if (nombre.length < 3) {
        setErrorFor(inputNombre, 'Debe tener al menos 3 caracteres');
    } else if (nombre.length > 15) {
        setErrorFor(inputNombre, 'Debe tener menos de 15 caracteres');
    } else {
        setSuccessFor(inputNombre);
    }

    if (apellido === '') {
        setErrorFor(inputApellido, 'El apellido no puede estar vacío');
    } else if (!isLetters(apellido)) {
        setErrorFor(inputApellido, 'Debes escribir el Apellido');
    } else if (apellido.length < 3) {
        setErrorFor(inputApellido, 'Debe tener al menos 3 caracteres');
    } else if (apellido.length > 15) {
        setErrorFor(inputApellido, 'Debe tener menos de 15 caracteres');
    } else {
        setSuccessFor(inputApellido);
    }

    if (apellidoMaterno === '') {
        setErrorFor(inputApellidoMaterno, 'El apellido no puede estar vacío');
    } else if (!isLetters(apellidoMaterno)) {
        setErrorFor(inputApellidoMaterno, 'Debes escribir el Apellido');
    } else if (apellidoMaterno.length < 3) {
        setErrorFor(inputApellidoMaterno, 'Debe tener al menos 3 caracteres');
    } else if (apellidoMaterno.length > 15) {
        setErrorFor(inputApellidoMaterno, 'Debe tener menos de 15 caracteres');
    } else {
        setSuccessFor(inputApellidoMaterno);
    }

    if (dni === '') {
        setErrorFor(inputDni, 'El DNI no puede estar vacío');
    } else {
        setSuccessFor(inputDni);
    }

    if (edad === '') {
        setErrorFor(inputEdad, 'La edad no puede estar vacía');
    } else if (edad > 100 || edad <= 0) {
        setErrorFor(inputEdad, 'Debes escribir la edad');
    } else {
        setSuccessFor(inputEdad);
    }

    if (usuarios !== '' && isLetters(nombre) && isLetters(apellido) && isLetters(apellidoMaterno) && edad > 0 && edad <= 100) {
        usuarios.push(usuario);
        formulario.reset();
        limpiarTabla();
        agregarUsuariosTabla();
        almacenarUsuariosLocalStorage();
        Toastify({
            text: "Cliente agregado correctamente",
            className: "info",
            duration: 2000,
            gravity: "top",
            position: "right",
            style: {
                background: "linear-gradient(to right, #0f2027, #203a43, #2c5364)",
                color: "#ffffff",
            }
        }).showToast();
    }
}

function validarIngresos(e) {
    e.preventDefault();
    let cabins = parseInt(inputCabins.value);
    let adults = parseInt(inputAdults.value);
    let children = parseInt(inputChildren.value);
    let total = adults + children;
    let ingreso = new Ingresos(cabins, adults, children, total);

    if (adults < 1) {
        setErrorFor(inputAdults, 'No se pueden alquilar motorhome sin adultos');
    } else if (cabins <= 1 && total >= 7) {
        setErrorFor(inputAdults, 'El límite para este modelo de motorhome es de 6 personas');
    } else {
        setSuccessFor(inputAdults);
    }
    if (children === '') {
        setErrorFor(inputChildren, 'No puede estar vacía');
    } else if (cabins <= 1 && total >= 7) {
        setErrorFor(inputChildren, 'El límite para este modelo de motorhome es de 6 personas');
    } else if (adults === 0 && children > adults) {
        setErrorFor(inputChildren, 'No puede ser mayor a los adultos');
    } else {
        setSuccessFor(inputChildren);
    }
    if (cabins === '') {
        setErrorFor(inputCabins, 'No puede estar vacía');
    } else if (total >= 7 && cabins === 1) {
        setErrorFor(inputCabins, 'El máximo de personas es 6, si son mas personas seleccione el modelo 2 de motorhome.');
    } else if (total >= 13 && cabins === 2) {
        setErrorFor(inputCabins, 'El máximo de personas para los modelos disponibles es 12, si desea más debe contactar a la administración.');
    } else {
        setSuccessFor(inputCabins);
    }
    if (total !== 0 && total <= 12) {
        ingresos.push(ingreso);
        agregarTotalDetalles();
        Toastify({
            text: "Ahora agrega los detalles de los ingresos",
            className: "info",
            duration: 2500,
            gravity: "top",
            position: "right",
            style: {
                background: "linear-gradient(to right, #d6ae7b, #eacda3)",
                color: "#ffffff",
                border: "1px solid #ffffff",
            }
        }).showToast();
    }
}

function agregarTotalDetalles() {
    ingresos.forEach((ingreso) => {
        let Detalle = document.createElement('ul');

        Detalle.innerHTML = `
        <li>Cantidad de Motorhomes: ${ingreso.cabins}</li>
        <li>Adultos: ${ingreso.adults}</li>
        <li>Niños: ${ingreso.children}</li>
        <li>Total ingresos: ${ingreso.total}</li>
        `;
        listaDetalles.appendChild(Detalle);
    });
}

function agregarUsuariosTabla() { // agrega los usuarios a la cotización
    usuarios.forEach((usuario) => {
        let filaTabla = document.createElement('tr');
        filaTabla.innerHTML = `
            <td>${usuario.nombre}</td>
            <td>${usuario.apellido}</td>
            <td>${usuario.apellidoMaterno}</td>
            <td>${usuario.dni}</td>
            <td>${usuario.edad}</td>`;
        tabla.tBodies[0].append(filaTabla);
    });
}

function limpiarTabla() {
    while (tabla.rows.length > 1) {
        tabla.deleteRow(1);
    }
}

function almacenarUsuariosLocalStorage() {
    localStorage.setItem('listaUsuarios', JSON.stringify(usuarios));
}

function obtenerUsuariosLocalStorage() {
    let usuariosAlmacenados = localStorage.getItem('listaUsuarios');
     if (usuariosAlmacenados !== null) {
         usuarios = JSON.parse(usuariosAlmacenados);
     }
}
// vacía la lista de usuarios Almacenados
function vaciarUsuariosLocalStorage() {
    btnVaciar.onclick = () => localStorage.removeItem('listaUsuarios');
}

function botonImprimir() {
    btnImpr.onclick = () => window.print();
}

// se extrae usuario y correo de localStorage
function extraerLogin() {

    let usuarioRegistrados = localStorage.getItem('userList');
    let arrayUser = usuarioRegistrados ? JSON.parse(usuarioRegistrados) : [];

    console.log(arrayUser);

    if (arrayUser !== '') {
        arrayUser.forEach((username) => {
            let spanRegistros = document.createElement('p');
            spanRegistros.innerHTML = `
        <p> Estimado/a <b>${username.usernameValue} </b>,</p>
        <p> Correo: 
        <a href='mailto:${username.emailValue}' class='text-decoration-none mail' target='_blank'><b>${username.emailValue}</b></a></p>
        `;
            datosRegistros.insertBefore(spanRegistros, datosRegistros.firstChild);
        });
    }
}

//inicializar el programa
main();