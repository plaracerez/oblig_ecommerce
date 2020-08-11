//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {

});




var productsArray = [];

function showProducts(array) {

    let contenido = "";
    for (let i = 0; i < array.length; i++) {
        let products = array[i];

        contenido += products.name + '<br>';
        contenido += products.description + '<br>';
        contenido += 'Costo: ' + products.cost + '<br>';
        contenido += 'Moneda: ' + products.currency + '<br>';
        contenido += 'Imagen: ' + products.imgSrc + '<br>';
        contenido += 'Cantidad de ventas: ' + products.soldcount + '<br>';

        contenido += '<br><hr><br>'


        document.getElementById("listado").innerHTML = contenido;
    }
}

document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            productsArray = resultObj.data;

            showProducts(productsArray);
        }
    })
})