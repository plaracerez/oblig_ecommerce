var cartArray = [];

function showCart(array) {
    let contenido = "";

    for (let i = 0; i < array.length; i++) {
        let purchase = array[i]; //purchase = resultObj.data.articles[i]

        let sub = purchase.unitCost * purchase.cantidad;
        contenido += `
        <div class="container cart-bucket border rounded">
      <table id="cartTable">
        <tr style="width: 60px;">
          <td id="td1"><div class="container"><img src="${purchase.src}" height ="150px"></div></td>
          <td id="td2"><strong><a href="product-info.html">${purchase.name}</a></strong></td>
          <td id="td3">Cantidad: <input type="number" value="0" onchange="calcSubtotal(${purchase.unitCost}, ${i})" id="cantidad${i}" min="0"></td>
          <td id="td4">Precio por unidad:<br>${purchase.unitCost} ${purchase.currency}</td>
          <td id="td5">Subtotal:<br><span class="subtotal${purchase.currency}" id="productSubtotal${i}"></span> ${purchase.currency}</td>
        </tr>
      </table>
    </div>
    <br>
        `
    };

    document.getElementById("purchaseList").innerHTML = contenido;
    document.getElementById("productCount").innerHTML = cartArray.length;

}

//totales y etc-------------------------

function calcTotal() {
    let total = 0;
    let subtotalesDol = document.getElementsByClassName("subtotalUSD");
    let subtotalesUy = document.getElementsByClassName("subtotalUYU");
    let subtotales = subtotalesUy / 40 + subtotalesDol;

    /*
    for (let i=0; i < subtotales.length; i++) {

        total += parseInt(subtotales[i].innerHTML);
    }*/

    for (let i = 0; i < subtotalesUy.length; i++) {

        total += parseInt(subtotalesUy[i].innerHTML) / 40;
        total += parseInt(subtotalesDol[i].innerHTML);
    }
    /*
    let subs = 0;
    let sub1 = 0;
    let sub2 = 0;

    for (let i=0; i < subs.length; i++) {
        sub1 = parseInt(subtotalesUy[i].innerHTML) / 40;
        sub2 = parseInt(subtotalesDol[i].innerHTML);
        subs = sub1 + sub2;
        total += subs;
    }
    */

    document.getElementById("total").innerHTML = total;

}


function calcSubtotal(precio, i) {
    let cantidad = parseInt(document.getElementById(`cantidad${i}`).value);
    let subtotal = cantidad * precio;


    document.getElementById(`productSubtotal${i}`).innerHTML = subtotal;
    calcTotal();
}

//-----------------------------------


document.addEventListener("DOMContentLoaded", function (e) {

    getJSONData(CART_TWO_PRODS).then(function (resultObj) {
        if (resultObj.status === "ok") {
            cartArray = resultObj.data.articles;
        };

        showCart(cartArray);
    });
});