// Storing in web local storage
//libraryStorage = window.localStorage;

// Storing in myLibrary array
let myLibrary = [];

// The constructor
function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

// setters and getters for book
const book = {
    set setTitle(title) {
        this.title = title;
    },

    get getTitle() {
        return this.title;
    },

    set setAuthor(author) {
        this.author = author;
    },

    get getAuthor() {
        return this.author;
    },

    set setPages(pages) {
        this.pages = pages;
    },

    get getPages() {
        return this.pages;
    },

    set setRead(read) {
        this.read = read;
    },

    get getRead() {
        return this.read;
    }
};

// JavaScript variables to link HTML elements
const title = document.getElementById("title");
const author = document.getElementById("author");
const pages = document.getElementById("pages");
const read = document.getElementById("read");
const submit = document.getElementById("submit_btn");
const table = document.getElementById("books_table");
const tableHeader = document.getElementById("table_header");
const tableBody = document.getElementById("table_body");

let bookId, newRow, titleCell, authorCell, pagesCell, readCell, deleteCell, bookFromStorage, biggestKey;

let keyNameArray = [];

// Get the modal
let modal = document.getElementById("myModal");

// Get the button that opens the modal
let btn = document.getElementById("newBook_btn");

// Get the <span> element that closes the modal
let span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function () {
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// Create books objects
/*
const book1 = new Book("Jane Eyre", "Charlotte Bronte", 100, true);
const book2 = new Book("Wuthering Heights", "Emily Bronte", 200, false);
const book3 = new Book("Moby Dick", "Herman Melville", 300, true);
const book4 = new Book("Pride and Prejudice", "Jane Austen", 400, true);
const book5 = new Book("The Great Gatsby", "F. Scott Fitzgerald", 500, false);
const book6 = new Book("Frankenstein", "Mary Shelley", 600, false);
const book7 = new Book("Robinson Crusoe", "Daniel Defoe", 700, true);
const book8 = new Book("Little Women", "Louisa May Alcott", 800, false);
*/

// Add books to myLibrary
/*
myLibrary.push(book1);
myLibrary.push(book2);
myLibrary.push(book3);
myLibrary.push(book4);
myLibrary.push(book5);
myLibrary.push(book6);
myLibrary.push(book7);
myLibrary.push(book8);
*/

/*
if (libraryStorage.length === 0) {
    // Start book-id at 1
    bookId = 1;
} else {
    // Start book-id based on number of books in libraryStorage
    //bookId = libraryStorage.length + 1;

    for (let i = 0; i < libraryStorage.length; i++) {
        let keyName = libraryStorage.key(i);
        //console.log(keyName);
        keyNameArray.push(keyName);
        biggestKey = Math.max.apply(null, keyNameArray);
    }

    if (biggestKey > libraryStorage.length) {
        console.log("There was an key bigger than bookId. The key is " + biggestKey);
        console.log(libraryStorage.getItem(biggestKey));
        libraryStorage.setItem(libraryStorage.length, libraryStorage.getItem((biggestKey)));
        libraryStorage.removeItem(biggestKey);
    }
    
    

    bookId = biggestKey + 1;
}


console.log("libraryStorage length: " + libraryStorage.length);
console.log("bookId: " + bookId);
*/

// Start book-id at 1
bookId = 1;

// Start button-id at 1
let buttonId = 1;

// Onclick function for submit button
submit.addEventListener("click", addBookToLibrary);

// Adds book to library
function addBookToLibrary() {
    // Set Title, Author, Pages, Read for each book
    book.setTitle = title.value;
    book.setAuthor = author.value;
    book.setPages = pages.value;
    book.setRead = read.checked;

    // Create Cells on table
    newRow = tableBody.insertRow(-1);
    newRow.setAttribute("id", "row" + bookId);
    titleCell = newRow.insertCell();
    authorCell = newRow.insertCell();
    pagesCell = newRow.insertCell();
    readCell = newRow.insertCell();
    deleteCell = newRow.insertCell();

    // Insert info on page
    let titleText = document.createTextNode(book.getTitle);
    titleCell.appendChild(titleText);
    let authorText = document.createTextNode(book.getAuthor);
    authorCell.appendChild(authorText);
    let pagesText = document.createTextNode(book.getPages);
    pagesCell.appendChild(pagesText);
    //let readText = document.createTextNode(book.getRead);
    let readCheckBox = document.createElement("input")
    readCheckBox.setAttribute("type", "checkbox");
    readCheckBox.setAttribute("id", "checkBox")
    readCell.appendChild(readCheckBox);

    if (read.checked) {
        readCheckBox.checked = true;
    }


    // Add to myLibrary Array
    myLibrary.push(new Book(title, author, pages, read));

    /*
    if (typeof (Storage) !== "undefined") {
        // Code for localStorage/sessionStorage.
        let bookToAdd = new Book(book.getTitle, book.getAuthor, book.getPages, book.getRead);
        let bookToAddStringified = JSON.stringify(bookToAdd);
        libraryStorage.setItem(bookId, bookToAddStringified);
    } else {
        // Sorry! No Web Storage support..
    }
    */

    createDeleteButton();
    bookId++;
    //location.reload();
}

function createDeleteButton() {
    // Create delete button through JavaScript
    const deleteBtn = document.createElement("button");
    //deleteBtn.setAttribute("id", "delete_btn" + buttonId);
    deleteBtn.setAttribute("class", "deleteButtons");
    deleteBtn.setAttribute("onclick", "deleteBook(this)")
    deleteBtn.innerHTML = "Delete";
    deleteCell.appendChild(deleteBtn);
    //buttonId++;
}

// Onclick function for delete buttons to delete books from library
function deleteBook(row) {
    let rowId = row.parentNode.parentNode.rowIndex;
    table.deleteRow(rowId);
    myLibrary.splice(rowId, 1);
    //console.log(rowId);
    //libraryStorage.removeItem(rowId);
    //console.log(libraryStorage);
    //location.reload();
}

/*
let storageLength = libraryStorage.length;
let nullCount = 0;

for (let i = 1; i <= storageLength; i++) {

    console.log("libraryStorage: " + libraryStorage.getItem(i));

    bookFromStorage = JSON.parse(libraryStorage.getItem(i));

    if (bookFromStorage == null) {
        nullCount++;
        storageLength = storageLength + 1;
        console.log(nullCount);
    } else {
        // Create Cells on table
        newRow = tableBody.insertRow(-1);
        newRow.setAttribute("id", "row" + i);
        titleCell = newRow.insertCell();
        authorCell = newRow.insertCell();
        pagesCell = newRow.insertCell();
        readCell = newRow.insertCell();
        deleteCell = newRow.insertCell();

        // Insert info on page
        let titleText = document.createTextNode(bookFromStorage.title);
        titleCell.appendChild(titleText);
        let authorText = document.createTextNode(bookFromStorage.author);
        authorCell.appendChild(authorText);
        let pagesText = document.createTextNode(bookFromStorage.pages);
        pagesCell.appendChild(pagesText);
        let readCheckBox = document.createElement("input")
        readCheckBox.setAttribute("type", "checkbox");
        readCheckBox.setAttribute("id", "checkBox")
        readCell.appendChild(readCheckBox);

        if (bookFromStorage.read) {
            readCheckBox.checked = true;
        }

        createDeleteButton();
    }
}
*/