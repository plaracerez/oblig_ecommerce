//esto es para que me redirija siempre al login
sessionStorage.setItem("logged", false);   //en este caso la key es logged



//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.


document.addEventListener("DOMContentLoaded", function (e) {

    document.getElementById("signinBtn").addEventListener("click", function (e) {
        let inputUser = document.getElementById("inputUsername");
        let inputPassword = document.getElementById("inputPassword");
        let camposCompletos = true;

        if (inputUser.value === "") {
            inputUser.classList.add("invalid");
            camposCompletos = false;
        }

        if (inputPassword.value === "") {
            inputPassword.classList.add("invalid");
            camposCompletos = false;
        }

        if (camposCompletos) {
            localStorage.setItem("user-logged", JSON.stringify({ username: inputUser.value }));
            window.location = "index.html";
        }

        else {
            alert("Tenés que ingresar tus datos")
        }
    }
    ); 

});
