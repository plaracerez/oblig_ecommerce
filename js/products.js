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
            <img src="`+ products.imgSrc +`"class="img-thumbnail">
        </div>

        <div class="col">
            <div class="d-flex w-100 justify-content-between">
                <h2 class="mb-1">`+products.name+`</h2>
                <p class="text-muted">Vendidos: `+products.soldCount+`</p>
            </div>
            <div>
                <p class="mb-1 text-muted">`+products.description+`</p>
                <p class="mb-1 text-muted">`+products.currency+" "+products.cost+`</p>
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
})