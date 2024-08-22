/* 
CS340 Project Group 146
Arberim Ame
Jenny Zhong

add_customer.js
    This file is the JavaScript file for the add record order page.
    It sets up the functionality for adding a RecordOrder to the database.

Citation: 
    DATE: 02/28/2024
    This code is adopted from the CS340 Node.js starter guide.
    URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app
*/

let addRecordOrderForm = document.getElementById('add-record-order-form');

addRecordOrderForm.addEventListener('submit', function (e) {
    e.preventDefault();

    let inputCustomer = document.getElementById('recordOrderCustomerSelect');
    let inputRecord = document.getElementById('recordOrderRecordSelect');
    let inputQty = document.getElementById('qtyPurchased');

    let customerVal = inputCustomer.value;
    let recordVal = inputRecord.value;
    let qtyVal = inputQty.value;

    let data = {
        customer: customerVal,
        record: recordVal,
        qty: qtyVal
    }

    fetch('/add-record-order', {
        method: 'POST',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response failed.');
        }
        location.reload();
    })
    .catch(error => {
        console.error('Error:', error)
    });


})