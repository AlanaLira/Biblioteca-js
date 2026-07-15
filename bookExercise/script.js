let myLibrary = [];

function Book(title, author, pages, read) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

Book.prototype.info = function () {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read ? "read" : "not read yet"
        }`;
};

Book.prototype.toggleRead = function () {
    this.read = !this.read;
};

function addBookToLibrary(title, author, pages, read) {
    const newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
}

const dialog = document.querySelector("#book-dialog");
const newBookButton = document.querySelector("#new-book-button");
const cancelButton = document.querySelector("#cancel-button");
const form = document.querySelector("#book-form");

newBookButton.addEventListener("click", function () {
    dialog.showModal();
});

cancelButton.addEventListener("click", function () {
    dialog.close();
    form.reset();
});

form.addEventListener("submit", function (event) {
    event.preventDefault();

    const title = document.querySelector("#title").value;
    const author = document.querySelector("#author").value;
    const pages = Number(document.querySelector("#pages").value);
    const readStatus = document.querySelector("#read-status").checked;

    addBookToLibrary(title, author, pages, readStatus);

    displayBooks();

    form.reset();
    dialog.close();
});

addBookToLibrary("Outsider", "Stephen King", 561, true);
addBookToLibrary("Notes from Underground", "Fyodor Dostoevsky", 130, true);
addBookToLibrary("S.", "J. j. Abrams", 456, false);
addBookToLibrary("House of Leaves", "Mark Z. Danielewski", 709, false);

const library = document.getElementById("library");

function displayBooks() {
    library.innerHTML = "";

    myLibrary.forEach((book) => {
        const card = document.createElement("div");

        card.classList.add("book-card");
        card.dataset.bookId = book.id;

        const title = document.createElement("h2");
        title.textContent = book.title;

        const author = document.createElement("p");
        author.textContent = `Author: ${book.author}`;

        const pages = document.createElement("p");
        pages.textContent = `Pages: ${book.pages}`;

        const readStatus = document.createElement("p");
        readStatus.textContent = book.read ? "Read" : "Not read yet";

        const btnRemove = document.createElement("button");
        btnRemove.textContent = "Remove";
        btnRemove.classList.add("btn");
       
        btnRemove.addEventListener("click", function(){
            myLibrary = myLibrary.filter(item => item.id !== book.id); 
            displayBooks();
        })

        const btnStatus = document.createElement("button");
        btnStatus.textContent = "Change status";
        btnStatus.classList.add("btn");
        btnStatus.addEventListener("click", () =>{
            book.toggleRead();
            displayBooks();
        })

        card.appendChild(title);
        card.appendChild(author);
        card.appendChild(pages);
        card.appendChild(readStatus);
        card.appendChild(btnRemove);
        card.appendChild(btnStatus);

        library.appendChild(card);
    });
}

displayBooks();