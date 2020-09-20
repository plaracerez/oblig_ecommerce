//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
var producto = {};
var comentariosArray = [];
var productsArray = [];

function showProduct(auto, arrayComments) {

    let info = "";
    let imgs = "";
    let comments = "";


    info += `
                <h2  class='text-center'>${auto.name}</h2>
    
                <br><img class="img-thumbnail mx-auto d-block" id="imgcentral" src="${auto.images[0]}" width="600px" alt=""><br>
                `
    info += `<div class="container">
                <br>
                <h2>Descripción</h2>
                <p class="lead">${auto.description}</p><br>
                <p class="lead">Llevate este compañero por solo ${auto.cost} ${auto.currency}.</p><br>
                <p class="lead">¡Apurate!, ya llevamos ${auto.soldCount} vendidos.</p>
            </div>
            
                `

    imgs += `
    <div class="container" id="carrusel">
        <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
            <ol class="carousel-indicators">
                <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
                <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                <li data-target="#carouselExampleIndicators" data-slide-to="3"></li>
            </ol>
            <div class="carousel-inner img-thumbnail">
                <div class="carousel-item active">
                    <img src="${auto.images[1]}" class="d-block w-100" alt="...">
                </div>
                <div class="carousel-item">
                    <img src="${auto.images[2]}" class="d-block w-100" alt="...">
                </div>
                <div class="carousel-item">
                    <img src="${auto.images[3]}" class="d-block w-100" alt="...">
                </div>
                <div class="carousel-item">
                    <img src="${auto.images[4]}" class="d-block w-100" alt="...">
                </div>
            </div>
            <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="sr-only">Previous</span>
            </a>
            <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="sr-only">Next</span>
            </a>
        </div>
    </div>
    <br>

    <!--esto lo oculto porque es versión vieja
        <div class="container">
            <img class="m-2 img-thumbnail" src="${auto.images[1]}" width="500px" alt="">
            <img class="m-2 img-thumbnail" src="${auto.images[2]}" width="500px" alt="">
            <img class="m-2 img-thumbnail" src="${auto.images[3]}" width="500px" alt="">
            <img class="m-2 img-thumbnail" src="${auto.images[4]}" width="500px" alt="">
        </div>
    -->`;
    


    arrayComments.forEach(function (comment) {
        let puntos = "";

        comments += `
                    <p><i>${comment.user}</i>:<br>
                    <p>${comment.description}</p>
                    `;

        for (let i = 1; i <= comment.score; i++) {
            puntos += `<span class="fa fa-star checked"></span>`;
        }

        for (let i = comment.score + 1; i <= 5; i++) {
            puntos += `<span class="fa fa-star"></span>`;
        }

        comments += `<sub>${comment.dateTime}</sub><br>
                    <div style="text-align: right;">${puntos}</div><hr>`;

    });





    document.getElementById("contenido").innerHTML = info;
    document.getElementById("imagenes").innerHTML = imgs;
    document.getElementById("comentarios").innerHTML = comments;
}


//relacionados
function showRelatedProducts(arrayListado, arrayRelacionados) {
    let contenido = "";

    arrayRelacionados.forEach(function (i) {
        contenido += `<strong>${arrayListado[i].name}</strong><br>${arrayListado[i].description}<br>
        <img src="${arrayListado[i].imgSrc}" width="100px"><br><br>`
    });

    document.getElementById("relatedProducts").innerHTML = contenido;
}


document.addEventListener("DOMContentLoaded", function (e) {

    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            comentariosArray = resultObj.data;
        }
    })

    getJSONData(PRODUCT_INFO_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            auto = resultObj.data;

            showProduct(auto, comentariosArray);
        }
    });

    //relacionados
    getJSONData(PRODUCTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            productsArray = resultObj.data;

            showRelatedProducts(productsArray, auto.relatedProducts); //el auto. es la variable del json anterior
            
        }
    })


    //comentar
    let userLogged = localStorage.getItem("user-logged");

    if (userLogged) {
        document.getElementById("newCommentContent").style = "display: inline-block";
    }

    document.getElementById("enviarComm").addEventListener("click", function () {
        let now = new Date();

        let dateTime = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()} `;
        dateTime += `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;

        //las estrellitas
        var elements = document.getElementsByName("rating");
        let score;
        for (var i = 0; i < elements.length; i++) {
            if (elements[i].checked) {
                score = parseInt(elements[i].value);
            }
        }


        let newComment = {
            score: score,
            description: document.getElementById("newComm").value,
            user: JSON.parse(localStorage.getItem("user-logged")).username,
            dateTime: dateTime
        };

        comentariosArray.push(newComment);

        showProduct(auto, comentariosArray);

        document.getElementById("newComm").value = "";
    })
})