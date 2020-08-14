//esto es para que me redirija siempre al login
sessionStorage.setItem("logged", false);   //en este caso la key es logged



//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.


document.addEventListener("DOMContentLoaded", function(e){

    document.getElementById("signin").addEventListener("submit", (evento)=> { //este submit no es el type del botón ta
        evento.preventDefault();
        location.href = "./index.html";   //redireccionar a index
        sessionStorage.setItem("logged", true);
        return true;
    })

});
