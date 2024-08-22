/* 
CS340 Project Group 146
Arberim Ame
Jenny Zhong

add_record.js
    This file is the JavaScript file for the add record page.
    It sets up the functionality for adding a record to the database.

Citation: 
    DATE: 03/07/2024
    This code is adopted from the CS340 Node.js starter guide.
    URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app
*/

let addRecordForm = document.getElementById('add-record-form');

addRecordForm.addEventListener('submit', function (e)
{
    e.preventDefault();

    let inputTitle = document.getElementById('title');
    let inputArtist = document.getElementById('artist');
    let inputQtyStock = document.getElementById('qty-stock');
    let inputPrice = document.getElementById('price');

    let titleVal = inputTitle.value;
    let artistVal = inputArtist.value;
    let qtyStockVal = inputQtyStock.value;
    let priceVal = inputPrice.value;

    let data = {
        title: titleVal,
        artist: artistVal,
        qtyStock: qtyStockVal,
        price: priceVal
    }

    var xhttp = new XMLHttpRequest();
    xhttp.open('POST', '/add-record', true);
    xhttp.setRequestHeader('Content-Type', 'application/json');
    console.log("Requesting data from /add-record");

    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            addRowToTable(xhttp.response);

            inputTitle.value = '';
            inputArtist.value = '';
            inputQtyStock.value = '';
            inputPrice.value = '';
        } else if (xhttp.readyState == 4 && xhttp.status != 200) {
            alert('ERROR: ' + xhttp.responseText);
            console.log('Error: ' + xhttp.responseText);
        }
    }
    xhttp.send(JSON.stringify(data));
    
})

addRowToTable = (data) => {
    let table = document.getElementById("records-table")
    let newRowIndex = table.ariaRowSpan.length;

    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    let row = document.createElement("TR");
    let idCell = document.createElement("TD");
    let titleCell = document.createElement("TD");
    let artistCell = document.createElement("TD");
    let qtyStockCell = document.createElement("TD");
    let priceCell = document.createElement("TD");

    row.appendChild(idCell);
    row.appendChild(titleCell);
    row.appendChild(artistCell);
    row.appendChild(qtyStockCell);
    row.appendChild(priceCell)
}