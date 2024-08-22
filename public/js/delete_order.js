/* 
CS340 Project Group 146
Arberim Ame
Jenny Zhong

delete_order.js
    This file is the JavaScript file for the delete order page.
    It sets up the functionality for deleting an order from the database.

Citation: 
    DATE: 02/28/2024
    This code is adopted from the CS340 Node.js starter guide.
    URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app
*/
function deleteOrder(orderID) {
    let data = {
        orderID: orderID
    };

    var xhttp = new XMLHttpRequest();
    xhttp.open('DELETE', '/delete-order/', true);
    xhttp.setRequestHeader('Content-Type', 'application/json');
    console.log('Requesting data from /delete-order');

    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 204) {
            deleteRow(orderID);
        }
        else if (xhttp.readyState == 4 && xhttp.status != 204) {
            console.log('Error: ' + xhttp.responseText);
        }
    }
    console.log(JSON.stringify(data));
    xhttp.send(JSON.stringify(data));
}


function deleteRow(orderID) {
    let table = document.getElementById("orders-table");
    for (let i = 0, row; row = table.rows[i]; i++) {
        if (table.rows[i].getAttribute("data-value") == orderID) {
            table.deleteRow(i);
            break;
        }
    }
}
