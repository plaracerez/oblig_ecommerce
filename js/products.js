//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

const ORDER_ASC_BY_PRICE = "price->PRICE";
const ORDER_DESC_BY_PRICE = "PRICE->price";
const ORDER_DESC_BY_RELEV = "RELEV->relev";

var productsArray = [];

var minPrice = undefined;
var maxPrice = undefined;

var buscar = undefined;

//------------------------
document.addEventListener("DOMContentLoaded", function (e) {

});

function verProduct(name) {
    localStorage.setItem('product', JSON.stringify({ productId: name}));
    window.location = 'product-info.html';
}

//en esta parte inserto los elementos en el html con sus estilos correspondientes y hago el filtro de rango
//y la funcion de busqueda

function showProducts(array) {

    let contenido = "";
    for (let i = 0; i < array.length; i++) {
        let products = array[i];

           

        if (((minPrice == undefined) || (minPrice != undefined && parseInt(products.cost) >= minPrice)) &&
            ((maxPrice == undefined) || (maxPrice != undefined && parseInt(products.cost) <= maxPrice))) {

            if (buscar == undefined || products.name.toLowerCase().indexOf(buscar) != -1) {
                contenido += `
                <div class="col-md-4 my-3">
                <a href="product-info.html" class="list-group-item-action my-3">
                    <div class="card px-2 py-3" style=" height: 31rem;">
                        <img class="card-img-top" src="${products.imgSrc}" alt="">
                        <div class="card-body">
                        <h2>${products.name}</h2>
                            <p class="card-text text-muted">${products.description}</p>
                            <p class="card-text text-muted">${products.currency} ${products.cost}</p>
                            <p class="card-text text-muted" style="text-align:right;">Vendidos: ${products.soldCount}</p> 
                        </div>
                    </div>
                </a>
                </div>
                
            `
            }
        }
        document.getElementById("listado").innerHTML = contenido;
        //acá empiezo
    }
}


//orden ascendente y descendente en precio y descendente en relevancia
function sortProducts(criterio, array) {
    let result = [];

    if (criterio === ORDER_ASC_BY_PRICE) {
        result = array.sort(function (a, b) {
            if (a.cost < b.cost) { return -1; }
            if (a.cost > b.cost) { return 1; }
            return 0;
        });
    } else if (criterio === ORDER_DESC_BY_PRICE) {
        result = array.sort(function (a, b) {
            if (a.cost > b.cost) {
                return -1;
            }
            if (a.cost < b.cost) {
                return 1;
            }
            return 0;
        });
    } else if (criterio === ORDER_DESC_BY_RELEV) {
        result = array.sort(function (a, b) {
            if (a.soldCount > b.soldCount) { return -1; }
            if (a.soldCount < b.soldCount) { return 1; }
            return 0;
        });
    }
    return result;
}

//estos son todos los eventlisteners 

document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            productsArray = resultObj.data;

            showProducts(productsArray);
        }
    })

    //botones de filtro

    document.getElementById("filtroProductos").addEventListener("click", function () {

        minPrice = document.getElementById("filtroMin").value;
        maxPrice = document.getElementById("filtroMax").value;

        if ((minPrice != undefined) && (minPrice != "" && parseInt(minPrice)) >= 0) {
            minPrice = parseInt(minPrice);
        } else {
            minPrice = undefined;
        }

        if ((maxPrice != undefined) && (maxPrice != "" && parseInt(maxPrice)) >= 0) {
            maxPrice = parseInt(maxPrice);
        } else {
            maxPrice = undefined;
        }

        showProducts(productsArray);
    });


    document.getElementById("limpiar").addEventListener("click", function () {

        document.getElementById("filtroMin").value = "";
        document.getElementById("filtroMax").value = "";

        minPrice = undefined;
        maxPrice = undefined;

        showProducts(productsArray);

    });

    //botones de orden
    document.getElementById("precioAsc").addEventListener("click", function () {
        productsArray = sortProducts(ORDER_ASC_BY_PRICE, productsArray);

        showProducts(productsArray);
    });

    document.getElementById("precioDesc").addEventListener("click", function () {
        productsArray = sortProducts(ORDER_DESC_BY_PRICE, productsArray);

        showProducts(productsArray);
    });

    document.getElementById("relevDesc").addEventListener("click", function () {
        productsArray = sortProducts(ORDER_DESC_BY_RELEV, productsArray);

        showProducts(productsArray);
    });

    //botones del buscador

    document.getElementById("search").addEventListener('input', function () {

        buscar = document.getElementById("search").value.toLowerCase();

        showProducts(productsArray);
    });

    document.getElementById("cleanSearch").addEventListener("click", function () {
        document.getElementById("search").value = "";

        buscar = undefined;

        showProducts(productsArray);
    });

    //filtros predet
    document.getElementById('filtro1').addEventListener('click', function (e) {
        minPrice = 0;
        maxPrice = 13999;

        showProducts(productsArray);
    });

    document.getElementById('filtro2').addEventListener('click', function (e) {
        minPrice = 14000;
        maxPrice = 16000;

        showProducts(productsArray);
    });

    document.getElementById('filtro3').addEventListener('click', function (e) {
        minPrice = 16001;
        maxPrice = 10000000;

        showProducts(productsArray);
    });
});