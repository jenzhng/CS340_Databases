/* 
CS340 Project Group 146
Arberim Ame
Jenny Zhong

delete_record.js
    This file is the JavaScript file for the delete record page.
    It sets up the functionality for deleting a record from the database.

Citation: 
    DATE: 02/28/2024
    This code is adopted from the CS340 Node.js starter guide.
    URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app
*/

function deleteRecord(recordID) {
    let data = {
        recordID: recordID
    };

    var xhttp = new XMLHttpRequest();
    xhttp.open('DELETE', '/delete-record/', true);
    xhttp.setRequestHeader('Content-Type', 'application/json');
    console.log('Requesting data from /delete-record/');

    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 204) {
            deleteRow(recordID);
        } else if (xhttp.readyState == 4 && xhttp.status != 204) {
            console.log('ERROR:' + xhttp.responseText)
        }
    }
    xhttp.send(JSON.stringify(data));
}

function deleteRow(recordID) {
    let table = document.getElementById("records-table");
    for (let i = 0, row; row = table.rows[i]; i++) {
        if (table.rows[i].getAttribute("data-value") == recordID) {
            table.deleteRow(i);
            break;
        }
    }
}