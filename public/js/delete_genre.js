/* 
CS340 Project Group 146
Arberim Ame
Jenny Zhong

delete_genre.js
    This file is the JavaScript file for the delete genre page.
    It sets up the functionality for deleting a genre from the database.

Citation: 
    DATE: 02/28/2024
    This code is adopted from the CS340 Node.js starter guide.
    URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app
*/

function deleteGenre(genreID) {
    let data = {
        genreID: genreID
    };

    var xhttp = new XMLHttpRequest();
    xhttp.open('DELETE', '/delete-genre/', true);
    xhttp.setRequestHeader('Content-Type', 'application/json');
    console.log('Requesting data from /delete-genre');

    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 204) {
            deleteRow(genreID);
        }
        else if (xhttp.readyState == 4 && xhttp.status != 204) {
            console.log('Error: ' + xhttp.responseText);
        }
    }
    console.log(JSON.stringify(data));
    xhttp.send(JSON.stringify(data));
}


function deleteRow(genreID) {
    let table = document.getElementById("genres-table");
    for (let i = 0, row; row = table.rows[i]; i++) {
        if (table.rows[i].getAttribute("data-value") == genreID) {
            table.deleteRow(i);
            break;
        }
    }
}
