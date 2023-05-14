const bookList = document.getElementById('bookList');
const bookURL = "https://cse342-mybookproject.onrender.com/read";

fetch(bookURL)
    .then(function (response) {
        return response.json();
    })
    .then(function(jsonObject) {
        //console.log(jsonObject);
        const lists = jsonObject;
        
        lists.forEach(displayBooks);
    });

function displayBooks(list) {
    //Create elements to add to div
    let section = document.createElement('section');
    let h2 = document.createElement('h2');
    let p1 = document.createElement('p');
    let p2 = document.createElement('p');
    let p3 = document.createElement('p');
    let p4 = document.createElement('p');
    let p5 = document.createElement('p');
    let p6 = document.createElement('p');

    //Add text content
    h2.textContent = list.title;
    p1.textContent = list.author;
    p2.textContent = list.genre;
    p3.textContent = `Year Published: ${list.published}`;
    p4.textContent = `Series: ${list.series}`;
    p5.textContent = list.numberInSeries;
    p6.textContent = `Read Again: ${list.readAgain}`;

    //Append book list to section
    section.appendChild(h2);
    section.appendChild(p1);
    section.appendChild(p2);
    section.appendChild(p3);
    section.appendChild(p4);
    section.appendChild(p5);
    section.appendChild(p6);

    //Append list to div (DOM)
    bookList.appendChild(section);
}