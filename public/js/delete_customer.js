/* 
CS340 Project Group 146
Arberim Ame
Jenny Zhong

delete_customer.js
    This file is the JavaScript file for the delete customer page.
    It sets up the functionality for deleting a customer from the database.

Citation: 
    DATE: 02/28/2024
    This code is adopted from the CS340 Node.js starter guide.
    URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app
*/

function deleteCustomer(customerID) {
    let data = {
        customerID: customerID
    };

    var xhttp = new XMLHttpRequest();
    xhttp.open('DELETE', '/delete-customer/', true);
    xhttp.setRequestHeader('Content-Type', 'application/json');
    console.log('Requesting data from /delete-customer');

    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 204) {
            deleteRow(customerID);
        }
        else if (xhttp.readyState == 4 && xhttp.status != 204) {
            console.log('Error: ' + xhttp.responseText);
        }
    }
    console.log(JSON.stringify(data));
    xhttp.send(JSON.stringify(data));
}


function deleteRow(customerID) {
    let table = document.getElementById("customers-table");
    for (let i = 0, row; row = table.rows[i]; i++) {
        if (table.rows[i].getAttribute("data-value") == customerID) {
            table.deleteRow(i);
            break;
        }
    }
}
