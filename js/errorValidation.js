// Valida datos de usuarios

function setErrorFor(input, message) { // elimina el error de los campos
	const formControl = input.parentElement; // .form-control
	const small = formControl.querySelector('small');
	// agrega el mensaje de error debajo de small
	small.innerText = message;
	//agrega la clase error
	formControl.className = 'form-control error';
} 

function setSuccessFor(input) { // elimina el error de los campos
	const formControl = input.parentElement; // .form-control
	formControl.className = 'form-control success';
} 

function isEmail(email) { // valida el correo electrónico
	return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
} 

function isLetters(inputLetters) { // valida las letras
	return /^[a-zA-Z\s]+$/.test(inputLetters);
} 