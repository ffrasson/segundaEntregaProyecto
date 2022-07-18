const users = [];
let tableUsers;

class User {
  constructor(firstName, lastName, age, dni, email) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
    this.dni = dni;
    this.email = email;
  }
}

function initializeElements() {
  tableUsers = document.getElementById("tabla-usuarios");
}

function registerUsers() {
  let numberUsers = parseInt(prompt("Cuantos usuarios va a registrar?"));
  for (let i = 0; i < numberUsers; i++) {
    let firstName = prompt("Ingrese el nombre: ");
    let lastName = prompt("Ingrese el apellido: ");
    let age = parseInt(prompt("Ingrese la edad: "));
    let dni = prompt("Ingrese el DNI: ");
    let email = prompt("Ingrese el email: ");
    let userToRegister = new User(
        firstName,
        lastName,
        age,
        dni,
        email
    );
    users.push(userToRegister);
  }
}

function addUser() {
  users.forEach((user) => {
    let rowTable = document.createElement("tr");
    rowTable.innerHTML = `
      <td>${user.firstName}</td>
      <td>${user.lastName}</td>
      <td>${user.age}</td>
      <td>${user.dni}</td>
      <td>${user.email}</td>`;
    tableUsers.tBodies[0].append(rowTable);
  });
}

function main() {
  initializeElements();
  registerUsers();
  addUser();
}

main();