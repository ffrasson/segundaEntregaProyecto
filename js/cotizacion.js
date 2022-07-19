// declaramos las variables a ocupar

let usuarios = []; // guarda usuarios que accederán al sistema

let formulario;
let inputNombre;
let inputApellido;
let inputApellidoDos;
let inputDni;
let inputEdad;
let tabla;
let datosRegistros;
let btnVaciar;
let btnImpr;
let formSelect;
let inputCabins;
let inputAdults;
let inputChildren;
let oneCabin = 60000;
let twoCabin = 120000;
let totalPrice = oneCabin + twoCabin;


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
    constructor(nombre, apellido, apellidoDos, dni, edad) {
        this.nombre = nombre.toUpperCase();
        this.apellido = apellido.toUpperCase();
        this.apellidoDos = apellidoDos.toUpperCase();
        this.dni = dni;
        this.edad = edad;
    }
}

function inicializarElementos() { // inicializa los elementos
    formulario = document.getElementById("formulario");
    inputNombre = document.getElementById("inputNombre");
    inputApellido = document.getElementById("inputApellido");
    inputApellidoDos = document.getElementById("inputApellidoDos");
    inputDni = document.getElementById("inputDni");
    inputEdad = document.getElementById("inputEdad");
    tabla = document.getElementById("tablaUsuarios");
    datosRegistros = document.getElementById("datosRegistros");
    btnVaciar = document.getElementById("btnVaciar");
    btnImpr = document.getElementById("btnImpr");
    formSelect = document.getElementById("formSelect");
    inputCabins = document.getElementById("inputCabins");
    inputAdults = document.getElementById("inputAdults");
    inputChildren = document.getElementById("inputChildren");

}

function inicializarEventos() {
    formulario.onsubmit = (e) => validarFormulario(e);
    formSelect.onsubmit = (e) => validarIngresos(e);
}

function validarFormulario(e) {
    e.preventDefault();
    let nombre = inputNombre.value;
    let apellido = inputApellido.value;
    let apellidoDos = inputApellidoDos.value;
    let dni = inputDni.value;
    let edad = parseInt(inputEdad.value);
    let usuario = new Usuarios(nombre, apellido, apellidoDos, dni, edad);
    usuarios.push(usuario);
    formulario.reset();

    if (nombre === '') {
        setErrorFor(inputNombre, 'El nombre no puede estar vacío');
    } else if (nombre.length < 3) {
        setErrorFor(inputNombre, 'Debe tener al menos 3 caracteres');
    } else if (nombre.length > 15) {
        setErrorFor(inputNombre, 'Debe tener menos de 15 caracteres');
    } else {
        setSuccessFor(inputNombre);
    }

    if (apellido === '') {
        setErrorFor(inputApellido, 'El apellido no puede estar vacío');
    } else if (apellido.length < 3) {
        setErrorFor(inputApellido, 'Debe tener al menos 3 caracteres');
    } else if (apellido.length > 15) {
        setErrorFor(inputApellido, 'Debe tener menos de 15 caracteres');
    } else {
        setSuccessFor(inputApellido);
    }

    if (apellidoDos === '') {
        setErrorFor(inputApellidoDos, 'El apellido no puede estar vacío');
    } else if (apellidoDos.length < 3) {
        setErrorFor(inputApellidoDos, 'Debe tener al menos 3 caracteres');
    } else if (apellidoDos.length > 15) {
        setErrorFor(inputApellidoDos, 'Debe tener menos de 15 caracteres');
    } else {
        setSuccessFor(inputApellidoDos);
    }

    if (dni === '') {
        setErrorFor(inputDni, 'El DNI no puede estar vacío');
    } else {
        setSuccessFor(inputDni);
    }

    if (edad === '') {
        setErrorFor(inputEdad, 'La edad no puede estar vacía');
    } else if (edad === 0) {
        setErrorFor(inputEdad, 'La edad no puede ser 0');
    } else {
        setSuccessFor(inputEdad);
    }

    if (nombre && apellido && apellidoDos && dni && edad) {
        limpiarTabla();
        agregarUsuariosTabla();
        almacenarUsuariosLocalStorage();
    }
}


function validarIngresos(e) {
    e.preventDefault();
    let cabins = parseInt(inputCabins.value);
    let adults = parseInt(inputAdults.value);
    let children = parseInt(inputChildren.value);
    let total = adults + children;

    if (total > 0) {

    }
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
}


function agregarUsuariosTabla() { // agrega los usuarios a la cotización
    usuarios.forEach((usuario) => {
        let filaTabla = document.createElement("tr");
        filaTabla.innerHTML = `
            <td>${usuario.nombre}</td>
            <td>${usuario.apellido}</td>
            <td>${usuario.apellidoDos}</td>
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
    localStorage.setItem("listaUsuarios", JSON.stringify(usuarios));
}

function obtenerUsuariosLocalStorage() {
    let usuariosAlmacenados = localStorage.getItem("listaUsuarios");
    console.log(typeof usuariosAlmacenados)
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
            let spanRegistros = document.createElement("p");
            spanRegistros.innerHTML = `
        <p> Estimado/a <b>${username.usernameValue} </b>,</p>
        <p> Correo: 
        <a href="mailto:${username.emailValue}" class="text-decoration-none mail" target="_blank"><b>${username.emailValue}</b></a></p>
        `;
            datosRegistros.insertBefore(spanRegistros, datosRegistros.firstChild);
        });
    }
}

//inicializar el programa
main();