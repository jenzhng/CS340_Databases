/* 
CS340 Project Group 146
Arberim Ame
Jenny Zhong

add_genre.js
    This file is the JavaScript file for the add genre page.
    It sets up the functionality for adding a genre to the database.

Citation: 
    DATE: 02/28/2024
    This code is adopted from the CS340 Node.js starter guide.
    URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app
*/

let addGenreForm = document.getElementById('add-genre-form');

addGenreForm.addEventListener('submit', function (e)
{
    e.preventDefault();

    let inputName = document.getElementById('name');
    let inputDescription = document.getElementById('desc');

    let nameVal = inputName.value;
    let descVal = inputDescription.value

    let data = {
        name: nameVal,
        description: descVal
    }

    var xhttp = new XMLHttpRequest();
    xhttp.open('POST', '/add-genre', true);
    xhttp.setRequestHeader('Content-Type', 'application/json');
    console.log('Requesting data from /add-genre');

    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            addRowToTable(xhttp.response);

            inputName.value = '';
            inputDescription.value = '';
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            alert('Error: ' + xhttp.responseText);
            console.log('Error: ' + xhttp.responseText);
        }
    }
    xhttp.send(JSON.stringify(data));
})

addRowToTable = (data) => {
    let table = document.getElementById("genres-table");
    let newRowIndex = table.rows.length;

    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1];

    let row = document.createElement("TR");
    let idCell = document.createElement("TD");
    let nameCell = document.createElement("TD");
    let descCell = document.createElement("TD");

    nameCell.innerText = parsedData.name;
    descCell.innerText = parsedData.description;

    row.appendChild(idCell);
    row.appendChild(nameCell);
    row.appendChild(descCell);

    table.appendChild(row);
}