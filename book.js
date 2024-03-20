function Book(title, author, pages, read) {
	this.title = title;
	this.author = author;
	this.pages = pages;
	this.read = read;
	this.readMsg = '';

	if (read) {
		this.readMsg = 'Has been read';
	} else {
		this.readMsg = 'Has not been read';
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

function createCardItem(name, id) {
	let li = document.createElement('li');
	li.textContent = name;
	li.id = id;
	return li;
}

function checkRead() {
	let checkBox = document.getElementById('checkbox-'+id);
	let currRead = document.getElementById('read-' + id);
	console.log(currRead);
	console.log(currCheckBox);


	if (currCheckBox.checked) {
		myLibrary[id].read = true;
		console.log(currCheckBox);
		currRead.textContent = '';
		
	} else {
		myLibrary[id].read = false; 
	}
}

function updateLibraryCards(book, id) {
	let bookCard = document.createElement('div');
	let bookInfo = document.createElement('div');
	let closeIcon = document.createElement('img');

	closeIcon.src = './svgs/close.svg';
	closeIcon.className = 'closeIcon';

	bookInfo.className = 'bookInfo';
	bookInfo.appendChild(createCardItem(book.title, 'title-' + id));
	bookInfo.appendChild(createCardItem(book.author, 'author-' + id));
	bookInfo.appendChild(createCardItem(book.pages + ' pages', 'pages-'+id));
	bookInfo.appendChild(createCardItem(book.readMsg, 'read-'+id));

	// checkbox
	let readSwitch = document.createElement('label');
	let inputCheckBox = document.createElement('input');
	inputCheckBox.type = 'checkbox';
	inputCheckBox.id = 'checkbox-' + id;

	let switchBtn = document.createElement('div');
	switchBtn.className = 'switch-btn';

	readSwitch.className = 'switch';

	// tick checkbox if book has been read
	if (book.read) {
		inputCheckBox.checked = true;
	} 

	readSwitch.appendChild(inputCheckBox);
	readSwitch.appendChild(switchBtn);

	bookInfo.appendChild(readSwitch);

	bookCard.className = 'bookCard';
	bookCard.id = 'book-'+ id;
	bookCard.appendChild(closeIcon);
	bookCard.appendChild(bookInfo);

	libraryContainer.appendChild(bookCard);

	closeIcon.addEventListener('click', () => {
		myLibrary.splice(closeIcon.parentNode.id, 1);
		closeIcon.parentNode.remove();
	});

	inputCheckBox.addEventListener('change', function() {
		let readMsg = document.getElementById('read-' + id);
		if(this.checked) {
			book.read = true;
			readMsg.textContent = 'Has been read';
		} else {
			book.read = false;
			readMsg.textContent = 'Has not been read';
		}
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





