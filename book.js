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

function addBookToLibrary(event) {
	event.preventDefault();

	const title = document.querySelector('#title');
	const author = document.querySelector('#author');
	const pages = document.querySelector('#pages');
	const read = document.querySelector('#read');


	myLibrary.push(new Book(title.value, author.value, pages.value, read.value));
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

	libraryContainer.appendChild(bookCard);
}

const myLibrary = [];

const libBtn = document.querySelector('.addLibBtn');
libBtn.addEventListener('click', event => addBookToLibrary(event));


const theHobbit = new Book('The Hobbit', 'J.R.R. Tolkien', '295', false);
myLibrary.push(theHobbit);

const libraryContainer = document.querySelector('.libraryContainer');

myLibrary.forEach((book) => {
	updateLibraryCards(book);
});





