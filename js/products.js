//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {

});


//en esta parte inserto los elementos en el html con sus estilos correspondientes
var productsArray = [];

function showProducts(array) {

    let contenido = "";

    for (i = 0; i < array.length; i++) {
        let products = array[i];
        contenido += `
    <a href="product-info.html" class="list-group-item list-group-item-action">
    <div class="row">

        <div class="col-3">
            <img src="`+ products.imgSrc + `"class="img-thumbnail">
        </div>

        <div class="col">
            <div class="d-flex w-100 justify-content-between">
                <h2 class="mb-1">`+ products.name + `</h2>
                <p class="text-muted">Vendidos: `+ products.soldCount + `</p>
            </div>
            <div>
                <p class="mb-1 text-muted">`+ products.description + `</p>
                <p class="mb-1 text-muted">`+ products.currency + " " + products.cost + `</p>
            </div>
        </div>

    </div>
    </a>
`
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
});



document.getElementById("filtroProductos").addEventListener("click", function () {
    getJSONData(PRODUCTS_URL).then(function (resultObj) {

        var valorMin = document.getElementById("filtroMin").value;
        var valorMax = document.getElementById("filtroMax").value;

        if (resultObj.status === "ok") {
            let filtro = resultObj.data.filter(function (elemento) {
                return elemento.cost >= valorMin && elemento.cost <= valorMax;
            })

            showProducts(filtro);
        };
    });
});

document.getElementById("limpiar").addEventListener("click", function () {

    getJSONData(PRODUCTS_URL).then(function (resultObj) {

        document.getElementById("filtroMin").value = "";
        document.getElementById("filtroMax").value = "";

        if (resultObj.status === "ok") {
            showProducts(resultObj.data);
        }
    });
});


//aca empieza lo del orden ascendente

function ordenAscendente(array, property) {  //esta function la saque de internet
    return array.sort(function (a, b) {
        var x = a[property]; var y = b[property];
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
}

document.getElementById("precioAsc").addEventListener("click", function () {

    document.getElementById("listado").innerHTML = ""; //lo saco para volver a ponerlo

    getJSONData(PRODUCTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            var az = ordenAscendente(resultObj.data, "cost"); //devuelve el array que es az
            showProducts(az);
        }
    });
});


function ordenDescendente(array, property) { 
    return array.sort(function (a, b) {
        var x = a[property]; var y = b[property];
        return ((x > y) ? -1 : ((x < y) ? 1 : 0)); //el ? es una forma de acortar un if no entendimos bien
    });
}

document.getElementById("precioDesc").addEventListener("click", function () {

    document.getElementById("listado").innerHTML = "";

    getJSONData(PRODUCTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            var za = ordenDescendente(resultObj.data, "cost"); //devuelve el array que es za
            showProducts(za);
        }
    });
});

//ahora voy a hacer el orden de relevancia jeje

document.getElementById("relevDesc").addEventListener("click", function () {

    document.getElementById("listado").innerHTML = "";

    getJSONData(PRODUCTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            var relevancia = ordenDescendente(resultObj.data, "soldCount");
            showProducts(relevancia);
        }
    });
});

