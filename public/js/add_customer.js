/* 
CS340 Project Group 146
Arberim Ame
Jenny Zhong

add_customer.js
    This file is the JavaScript file for the add customer page.
    It sets up the functionality for adding a customer to the database.

Citation: 
    DATE: 02/28/2024
    This code is adopted from the CS340 Node.js starter guide.
    URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app
*/

let addCustomerForm = document.getElementById('add-customer-form');

addCustomerForm.addEventListener('submit', function (e)
{
    e.preventDefault();

    let inputFirstName = document.getElementById('first-name');
    let inputLastName = document.getElementById('last-name');
    let inputEmail = document.getElementById('email');
    let inputPhoneNumber = document.getElementById('phone-number');

    let firstNameVal = inputFirstName.value;
    let lastNameVal = inputLastName.value;
    let emailVal = inputEmail.value;
    let phoneNumberVal = inputPhoneNumber.value;

    let data = {
        firstName: firstNameVal,
        lastName: lastNameVal,
        email: emailVal,
        phoneNumber: phoneNumberVal
    }

    var xhttp = new XMLHttpRequest();
    xhttp.open('POST', '/add-customer', true);
    xhttp.setRequestHeader('Content-Type', 'application/json');
    console.log('Requesting data from /add-customer');

    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            addRowToTable(xhttp.response);

            inputFirstName.value = '';
            inputLastName.value = '';
            inputEmail.value = '';
            inputLastName.value = '';
            inputPhoneNumber.value = '';
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            alert('Error: ' + xhttp.responseText);
            console.log('Error: ' + xhttp.responseText);
        }
    }
    xhttp.send(JSON.stringify(data));
})


addRowToTable = (data) => {
    let table = document.getElementById("customers-table");
    let newRowIndex = table.rows.length;

    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1];

    let row = document.createElement("TR");
    let idCell = document.createElement("TD");
    let firstNameCell = document.createElement("TD");
    let lastNameCell = document.createElement("TD");
    let emailCell = document.createElement("TD");
    let phoneNumberCell = document.createElement("TD");


    //idCell.innerText = newRow.customerID;
    firstNameCell.innerText = parsedData.firstName;
    lastNameCell.innerText = parsedData.lastName;
    emailCell.innerText = parsedData.email;
    phoneNumberCell.innerText = parsedData.phoneNumber;

    row.appendChild(idCell);
    row.appendChild(firstNameCell);
    row.appendChild(lastNameCell);
    row.appendChild(emailCell);
    row.appendChild(phoneNumberCell);

    table.appendChild(row);
}
