var cartArray = [];

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

        //let sub = purchase.unitCost * purchase.cantidad;
        let sub = costoDol * purchase.count;
        
        contenido += `
        <div class="container cart-bucket border rounded">
      <table id="cartTable">
        <tr style="width: 60px;">
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

//totales y etc-------------------------



function calcTotal() {
    /* antigua forma
    let total = 0;
    let subtotalesDol = document.getElementsByClassName("subtotalUSD");
    let subtotalesUy = document.getElementsByClassName("subtotalUYU");
    let subtotales = subtotalesUy / 40 + subtotalesDol;


    for (let i = 0; i < subtotalesUy.length; i++) {

        total += parseInt(subtotalesUy[i].innerHTML) / 40;
        total += parseInt(subtotalesDol[i].innerHTML);
    }
    document.getElementById("total").innerHTML = total;

    */
    
    /* acá voy a probar la nueva forma */

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