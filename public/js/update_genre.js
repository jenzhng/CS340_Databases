/* 
CS340 Project Group 146
Arberim Ame
Jenny Zhong

update_customer.js
    This file is the JavaScript file for the update genre page.
    It sets up the functionality for upadting a genre in the database.

Citation: 
    DATE: 02/28/2024
    This code is adopted from the CS340 Node.js starter guide.
    URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app
*/


let updateGenreForm = document.getElementById('update-genre-form');

updateGenreForm.addEventListener('submit', function (e)
{
    e.preventDefault();

    let inputGenreId = document.getElementById('genreSelect');
    let inputName = document.getElementById('name-upd');
    let inputDesc = document.getElementById('desc-upd');

    let nameVal = inputName.value;
    let descVal = inputDesc.value;

    let data = {
        genreID: inputGenreId.value,
        name: nameVal, 
        description: descVal
    }

    var xhttp = new XMLHttpRequest();
    xhttp.open('PUT', '/update-genre/', true);
    xhttp.setRequestHeader('Content-Type', 'application/json');
    console.log('Requesting data from /update-genre');
    console.log('Data:' + JSON.stringify(data));

    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            updateRowInTable(xhttp.response);

            inputName.value = '';
            inputDesc.value = '';
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            alert('Error: ' + xhttp.responseText);
            console.log('Error: ' + xhttp.responseText);
        }
    }
    xhttp.send(JSON.stringify(data));
})

updateRowInTable = (data) => {
    let table = document.getElementById('genres-table');
    let parsedData = JSON.parse(data);
    let newRow = parsedData;

    let row = document.getElementById(newRow.genreID);
    row.cells[1].innerHTML = newRow.name;
    row.cells[2].innerHTML = newRow.description;
}