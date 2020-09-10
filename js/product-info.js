//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
var producto = {};
var comentariosArray = [];

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
        <div class="container">
            <img class="m-2 img-thumbnail" src="${auto.images[1]}" width="500px" alt="">
            <img class="m-2 img-thumbnail" src="${auto.images[2]}" width="500px" alt="">
            <img class="m-2 img-thumbnail" src="${auto.images[3]}" width="500px" alt="">
            <img class="m-2 img-thumbnail" src="${auto.images[4]}" width="500px" alt="">
        </div>`;


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

    //comentar
    let userLogged = localStorage.getItem("user-logged");

    if (userLogged) {
        document.getElementById("newCommentContent").style = "display: inline-block";
    }

    document.getElementById("enviarComm").addEventListener("click", function () {
        let now = new Date();

        let dateTime = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()} `;
        dateTime += `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;

        let newComment = {
            score: parseInt(document.getElementById("newCal").value),
            description: document.getElementById("newComm").value,
            user: JSON.parse(localStorage.getItem("user-logged")).username,
            dateTime: dateTime
        };

        comentariosArray.push(newComment);

        showProduct(auto, comentariosArray);

        document.getElementById("newComm").value = "";
    })



    document.getElementById("contenido").innerHTML = info;
    document.getElementById("imagenes").innerHTML = imgs;
    document.getElementById("comentarios").innerHTML = comments;
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
})