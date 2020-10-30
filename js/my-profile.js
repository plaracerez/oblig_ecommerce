const nombres = document.getElementById("perfNombres");
const apellidos = document.getElementById("perfApellidos");
const edades = document.getElementById("perfEdad");
const emails = document.getElementById("perfEmail");
const tels = document.getElementById("perfTel");

const perfil = {
    nombres: "",
    apellidos: "",
    edad: "",
    email: "",
    tel: ""
}

function guardar () {
    perfil.nombres = nombres.value;
    perfil.apellidos = apellidos.value;
    perfil.edad = edades.value;
    perfil.email = emails.value;
    perfil.tel = tels.value;

    localStorage.setItem("datos", JSON.stringify(perfil))
}



document.addEventListener("DOMContentLoaded", function (e) {

    let datos = JSON.parse(localStorage.getItem("datos"));

    nombres.value = datos.nombres;
    apellidos.value = datos.apellidos;
    edades.value = datos.edad;
    emails.value = datos.email;
    tels.value = datos.tel;

});