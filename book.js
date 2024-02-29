function Book(title, author, pages, read) {
	this.title = title;
	this.author = author;
	this.pages = pages;
	this.read = read;

	if (read) {
		this.readMsg = 'Has been read';
	} else {
		this.readMsg = 'Not read yet';
	}

	this.info = () => {
		console.log(`${this.title} by ${this.author}, ${this.pages} pages, ${this.readMsg}`);
	};
}

function addBookToLibrary() {
	let title = prompt('Book title:');
	let author = prompt('Author:');
	let pages = prompt('Number of pages:');
	let read = prompt('Has been read? (y/n)');

	myLibrary.push(new Book(title, author, pages, read));
	updateLibraryCards(myLibrary[myLibrary.length-1]);
}

function createCardItem(name) {
	let li = document.createElement('li');
	li.textContent = name;
	return li;
}

function updateLibraryCards(book) {
	let bookCard = document.createElement('div');
	bookCard.className = 'bookCard';
	bookCard.appendChild(createCardItem(book.title));
	bookCard.appendChild(createCardItem(book.author));
	bookCard.appendChild(createCardItem(book.pages + ' pages'));
	bookCard.appendChild(createCardItem(book.readMsg));

	libCards.appendChild(bookCard);
}

const myLibrary = [];

const libBtn = document.querySelector('.addLibBtn');
libBtn.addEventListener('click', addBookToLibrary);

const theHobbit = new Book('The Hobbit', 'J.R.R. Tolkien', '295', false);
myLibrary.push(theHobbit);

const libCards = document.querySelector('.libCards');

myLibrary.forEach((book) => {
	updateLibraryCards(book);
});





