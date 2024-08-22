/* 
CS340 Project Group 146
Arberim Ame
Jenny Zhong

update_record.js
    This file is the JavaScript file for the update customer page.
    It sets up the functionality for upadting a customer in the database.

Citation: 
    DATE: 02/28/2024
    This code is adopted from the CS340 Node.js starter guide.
    URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app
*/

let updateRecordForm = document.getElementById('update-record-form')

updateRecordForm.addEventListener('submit', function (e)
{
    e.preventDefault();

    let inputRecordID = document.getElementById('recordSelect');
    let inputTitle = document.getElementById('title-upd');
    let inputArtist = document.getElementById('artist-upd');
    let inputStock = document.getElementById('stock-upd');
    let inputPrice = document.getElementById('price-upd');

    let data = {
        recordID: inputRecordID.value,
        title: inputTitle.value,
        artist: inputArtist.value,
        qtyStock: inputStock.value,
        price: inputPrice.value,
    }

    var xhttp = new XMLHttpRequest();
    xhttp.open('PUT', '/update-record/', true);
    xhttp.setRequestHeader('Content-Type', 'application/json');
    console.log('Requesting data from /update-record/');
    console.log('Data:' + JSON.stringify(data));

    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            updateRowInTable(xhttp.response);

            inputTitle.value = '';
            inputArtist.value = '';
            inputStock.value = '';
            inputPrice.value = '';
        } else if (xhttp.readyState == 4 && xhttp.status != 200) {
            alert("ERROR:" + xhttp.responseText);
            console.log("ERROR:" + xhttp.responseText);
        }
    }
    xhttp.send(JSON.stringify(data));
})

updateRowInTable = (data) => {
    let table = document.getElementById('records-table');
    let parsedData = JSON.parse(data);
    let newRow = parsedData;

    let row = document.getElementById(newRow.recordID);
    row.cells[1].innerHTML = newRow.title;
    row.cells[2].innerHTML = newRow.artist;
    row.cells[3].innerHTML = newRow.qtyStock;
    row.cells[4].innerHTML = newRow.price;
}