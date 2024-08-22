/* 
CS340 Project Group 146
Arberim Ame
Jenny Zhong

delete_genre_record.js
    This file is the JavaScript file for the delete genre record page.
    It sets up the functionality for deleting a genre record from the database.

Citation: 
    DATE: 02/28/2024
    This code is adopted from the CS340 Node.js starter guide.
    URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app
*/

function deleteGenreRecord(recordID, genre) {
    let data = {
        recordID: recordID,
        genre: genre
    };

    fetch('/delete-genre-record/', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        location.reload();
    })
    .catch(error => {
        console.error('Error:', error);
    });
}
