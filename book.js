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
	updateLibraryCards(myLibrary[myLibrary.length-1], myLibrary.length-1);
}

function createCardItem(name) {
	let li = document.createElement('li');
	li.textContent = name;
	return li;
}

function updateLibraryCards(book, id) {
	let bookCard = document.createElement('div');
	let bookInfo = document.createElement('div');
	let closeIcon = document.createElement('img');

	closeIcon.src = './svgs/close.svg';
	closeIcon.className = 'closeIcon';
	

	bookInfo.className = 'bookInfo';
	
	bookInfo.appendChild(createCardItem(book.title));
	bookInfo.appendChild(createCardItem(book.author));
	bookInfo.appendChild(createCardItem(book.pages + ' pages'));
	bookInfo.appendChild(createCardItem(book.readMsg));
	
	bookCard.className = 'bookCard';
	bookCard.id = id;
	bookCard.appendChild(closeIcon);
	bookCard.appendChild(bookInfo);

	libraryContainer.appendChild(bookCard);

	closeIcon.addEventListener('click', () => {
		myLibrary.splice(closeIcon.parentNode.id, 1);
		console.log(myLibrary);
		closeIcon.parentNode.remove();
	});
}

const myLibrary = [];

const libBtn = document.querySelector('.addLibBtn');
libBtn.addEventListener('click', addBookToLibrary);


const theHobbit = new Book('The Hobbit', 'J.R.R. Tolkien', '295', false);
myLibrary.push(theHobbit);

const libraryContainer = document.querySelector('.libraryContainer');

for (let i=0; i<myLibrary.length; i++) {
	updateLibraryCards(myLibrary[i], [i]);
}





