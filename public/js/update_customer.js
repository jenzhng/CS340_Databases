/* 
CS340 Project Group 146
Arberim Ame
Jenny Zhong

update_customer.js
    This file is the JavaScript file for the update customer page.
    It sets up the functionality for upadting a customer in the database.

Citation: 
    DATE: 02/28/2024
    This code is adopted from the CS340 Node.js starter guide.
    URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app
*/


let updateCustomerForm = document.getElementById('update-customer-form');

updateCustomerForm.addEventListener('submit', function (e)
{
    e.preventDefault();

    let inputCustomerID = document.getElementById('mySelect');
    let inputFirstName = document.getElementById('first-name-upd');
    let inputLastName = document.getElementById('last-name-upd');
    let inputEmail = document.getElementById('email-upd');
    let inputPhoneNumber = document.getElementById('phone-upd');

    let firstNameVal = inputFirstName.value;
    let lastNameVal = inputLastName.value;
    let emailVal = inputEmail.value;
    let phoneNumberVal = inputPhoneNumber.value;

    let data = {
        customerID: inputCustomerID.value,
        firstName: firstNameVal,
        lastName: lastNameVal,
        email: emailVal,
        phoneNumber: phoneNumberVal,

    }

    var xhttp = new XMLHttpRequest();
    xhttp.open('PUT', '/update-customer/', true);
    xhttp.setRequestHeader('Content-Type', 'application/json');
    console.log('Requesting data from /update-customer');
    console.log('Data:' + JSON.stringify(data));

    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            updateRowInTable(xhttp.response);

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

updateRowInTable = (data) => {
    let table = document.getElementById("customers-table");
    let parsedData = JSON.parse(data);
    let newRow = parsedData;

    let row = document.getElementById(newRow.customerID);
    row.cells[1].innerHTML = newRow.firstName;
    row.cells[2].innerHTML = newRow.lastName;
    row.cells[3].innerHTML = newRow.email;
    row.cells[4].innerHTML = newRow.phoneNumber;
}