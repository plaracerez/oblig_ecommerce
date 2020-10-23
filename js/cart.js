var cartArray = [];
var paymentType = undefined;

function changeCurrency(moneda, costoUnitario) {
    if (moneda === "UYU") {
        return costoUnitario / 40;
    } else {
        return costoUnitario;
    }
};

function showCart(array) {
    let contenido = "";

    for (let i = 0; i < array.length; i++) {
        let purchase = array[i]; //purchase = resultObj.data.articles[i]

        let costoDol = changeCurrency(purchase.currency, purchase.unitCost);

        let sub = costoDol * purchase.count;

        contenido += `
        <div class="container cart-bucket border rounded">
      <table id="cartTable">
        <tr style="width: 60px;">
          <td id="td0"><div class="container"><button class="btn" onclick="eliminar(${i})">&times;</button></td>
          <td id="td1"><div class="container"><img src="${purchase.src}" height ="150px"></div></td>
          <td id="td2"><strong><a href="product-info.html">${purchase.name}</a></strong></td>
          <td id="td3">Cantidad: <input type="number" value="${purchase.count}" onchange="calcSubtotal(${costoDol}, ${i})" id="cantidad${i}" min="0"></td>
          <td id="td4">Precio por unidad:<br>${purchase.unitCost} ${purchase.currency}</td>
          <td id="td5">Subtotal:<br><span class="subtotal" id="productSubtotal${i}">${sub}</span> USD</td>
        </tr>
      </table>
    </div>
    <br>
        `
    };



    document.getElementById("purchaseList").innerHTML = contenido;
    document.getElementById("productCount").innerHTML = cartArray.length;

    calcTotal();
}

function eliminar(i) {
    if (cartArray.length > 1) {
        cartArray.splice(i, 1);
        showCart(cartArray);
    } else {
        document.getElementById("purchaseList").innerHTML = `<div class="container" style="font-size: 40px; text-align: center;">Nada para mostrar :(</div>`
    }
}



//totales y etc-------------------------

function calcTotal() {

    let total = 0;
    let subs = document.getElementsByClassName("subtotal");

    for (let i = 0; i < subs.length; i++) {

        total += parseInt(subs[i].innerHTML);
    }

    document.getElementById("total").innerHTML = total;

}


function calcSubtotal(precio, i) {
    let cantidad = parseInt(document.getElementById(`cantidad${i}`).value);
    let subtotal = cantidad * precio;

    document.getElementById(`productSubtotal${i}`).innerHTML = subtotal;
    calcTotal();

    calcEnvioPorc()

}

function calcTotalPosta() {

    let totalParcial = document.getElementById("total").innerHTML; //el valor de la compra sin envío as displayed
    let porcentEnvio = document.getElementsByName("envio"); //un array con los radio de tipo de envío
    let resultado = ""; //lo que quiero que se muestre al final

    for (let i = 0; i < porcentEnvio.length; i++) {
        if (porcentEnvio[i].checked) {
            resultado = (porcentEnvio[i].value) * totalParcial;
        }
    }

    calcEnvioPorc()
    document.getElementById('totalPosta').innerHTML = resultado.toFixed(2);
}


function calcEnvioPorc() {
    
    let totalAplicar = document.getElementById("total").innerHTML;

    let costoPrem;
    let costoExp;
    let costoEst;

    costoPrem = totalAplicar * 0.15;
    costoExp = totalAplicar * 0.07;
    costoEst = totalAplicar * 0.05;

    document.getElementById("envPrem").innerHTML = costoPrem.toFixed(2); //esto es para las cifras significativas
    document.getElementById("envExp").innerHTML = costoExp.toFixed(2);
    document.getElementById("envEst").innerHTML = costoEst.toFixed(2);
}

//-----------------------------------

//lo del método de pago-----------------

function showpaymentMethod() {
    let contenido = "";
    let payments = document.getElementsByName("pago");

    for (var i = 0; i < payments.length; i++) {
        if (payments[i].checked) {
            if (payments[i].value === "c") {
                contenido = `
                <h5>Titular de la tarjeta</h5>
                <div class="row">
                    <div class="col-8">
                        <input type="text" id="titTarjeta" class="form-control">
                    </div>
                    <div class="col"></div>
                </div><br>
                <h5>Número de tarjeta</h5>
                <div class="row">
                  <input type="text" id="numTarjeta" class="form-control col-5 ml-3" placeholder="" required> – 
                  <input type="text" id="numTarjeta" class="form-control col-2" placeholder="" required>
                  <div class="col"></div>
                </div><br>
                <div>
                  <h5>Dirección de la factura</h5>
                  <input type="text" id="dirTarjeta" class="form-control" required>
                </div>
                <br>
              </div>`;

            } else {
                contenido = `
                <h5>Titular de la cuenta</h5>
                <div class="row">
                    <div class="col-8">
                        <input type="text" id="titBanco" class="form-control" required>
                    </div>
                    <div class="col"></div>
                </div><br>
                <h5>Entidad bancaria</h5>
                <div class="row">
                    <div class="col-5">
                    <select name="bancos" id="bancos" class="form-control" required>
                        <option>BBVA</option>
                        <option>Banco República</option>
                        <option>Santander</option>
                        <option>HSBC</option>
                        <option>Itaú</option>
                    </select>
                        
                    </div>
                    <div class="col"></div>
                </div><br>
                <h5>Número de cuenta</h5>
                <div class="row">
                    <div class="col-8">
                        <input type="number" id="numBanco" class="form-control" placeholder="" required>
                    </div>
                    <div class="col"></div>
                </div>
                <br>
                <h5>Dirección de la factura</h5>
                <input type="text" id="dirBanco" class="form-control" required>
                <br>`
            }
        }
    }

    document.getElementById("paymentMethod").innerHTML = contenido;
}


//-----------------------------------

//validar el modal-----------------------------------------

function validPayment() {
    let titularTarj = document.getElementById("titTarjeta");
    let numTarj = document.getElementById("numTarjeta")
    let dirTarj = document.getElementById("dirTarjeta");

    let titularBan = document.getElementById("titBanco");
    let numBan = document.getElementById("numBanco")
    let dirBan = document.getElementById("dirBanco");

    let formaPago = document.getElementsByName("pago");
    let pagoValido = true;

    for (var i = 0; i < formaPago.length; i++) {

        if ((formaPago[i].checked) && (formaPago[i].value == "c")) {
            if (titularTarj.value == "" || numTarj.value == "" || dirTarj.value == "") {
                pagoValido = false;
            } else {
                pagoValido = true;
            }
        }

        else if ((formaPago[i].checked) && (formaPago[i].value == "t")) {
            if (titularBan.value == "" || numBan.value == "" || dirBan.value == "") {
                pagoValido = false;
            } else {
                pagoValido = true;
            }
        }
    }

    return pagoValido
}



//---------------------------------------------------------

document.addEventListener("DOMContentLoaded", function (e) {

    getJSONData(CART_TWO_PRODS).then(function (resultObj) {
        if (resultObj.status === "ok") {
            cartArray = resultObj.data.articles;
        };

        showCart(cartArray);
    });

    let payments = document.getElementsByName("pago");
    for (var i = 0; i < payments.length; i++) {
        payments[i].addEventListener("change", function () {
            showpaymentMethod();
        });
    };


    //validacion del form de atroden------------------------

    let form = document.getElementById("form-adentro");

    form.addEventListener('submit', function (event) {

        event.preventDefault();
        event.stopPropagation();

        if (validPayment()) {
            document.getElementById("botonModal").classList.remove("btn-dark");
            document.getElementById("botonModal").classList.remove("btn-danger");
            document.getElementById("botonModal").classList.add("btn-success");

            document.getElementById("alertModal").innerHTML = `
            <div class="alert alert-primary" role="alert">
            Tu método de pago fue ingresado correctamente
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
            </div>`;

        } else {
            event.preventDefault();
            event.stopPropagation();
            document.getElementById("botonModal").classList.remove("btn-dark");
            document.getElementById("botonModal").classList.remove("btn-success");
            document.getElementById("botonModal").classList.add("btn-danger");

            document.getElementById("alertModal").innerHTML = `
            <div class="alert alert-danger" role="alert">
            Tenés que llenar todos los campos del método de pago para continuar
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
            </div>
          `;
        }


        if (form.checkValidity()) {
            $("#modal1").modal("hide")

            paymentType = validPayment();
        }


        form.classList.add('was-validated');
    });

    //validacion del form de afuera
    let formulario = document.getElementById("form-afuera");

    formulario.addEventListener('submit', function (event) {

        event.preventDefault();
        event.stopPropagation();
        formulario.classList.add('was-validated');

        if (formulario.checkValidity() && paymentType) {
            document.getElementById("alertSuccess").innerHTML = `
            <div class="alert alert-success" role="alert">
            Tu compra fue ingresada con éxito. ¡Que la disfrutes!
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
          </div>`;
        }
    });
});