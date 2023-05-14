const authorList = document.getElementById('authorList');
const authorsURL = "https://cse342-mybookproject.onrender.com/authors";

fetch(authorsURL)
    .then(function (response) {
        return response.json();
    })
    .then(function(jsonObject) {
        //console.log(jsonObject);
        const lists = jsonObject;
        
        lists.forEach(displayList);
    });

function displayList(list) {
    //Create elements to add to div
    let p = document.createElement('p');

    //Add text content
    p.textContent = list.name;

    //Append list to div (DOM)
    authorList.appendChild(p);
}