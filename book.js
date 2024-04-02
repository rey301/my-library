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
	let currRead = document.getElementById('read-' + id);

	if (currCheckBox.checked) {
		myLibrary[id].read = true;
		currRead.textContent = '';
		
	} else {
		myLibrary[id].read = false; 
	}
}

function addNewBook(book, id) {
	// close icon
	let closeIcon = document.createElement('img');
	closeIcon.src = './svgs/close.svg';
	closeIcon.className = 'closeIcon';

	// book information
	let bookInfo = document.createElement('div');
	bookInfo.className = 'bookInfo';
	bookInfo.appendChild(createCardItem(book.title, 'title-' + id));
	bookInfo.appendChild(createCardItem(book.author, 'author-' + id));
	bookInfo.appendChild(createCardItem(book.pages + ' pages', 'pages-'+id));
	bookInfo.appendChild(createCardItem(book.readMsg, 'read-'+id));

	// checkbox to check if book has been read
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

	// book card
	let bookCard = document.createElement('div');

	bookCard.className = 'book card';
	bookCard.id = 'book-'+ id;
	bookCard.appendChild(closeIcon);
	bookCard.appendChild(bookInfo);

	// add to library container
	const libraryContainer = document.querySelector('.libraryContainer');
	
	// button to add a new book
	let addBtn = document.createElement('img');
	addBtn.src = './svgs/plus.svg';

	let addCard = document.createElement('div');
	addCard.id = 'addCard';

	addCard.appendChild(addBtn);

	// when clicked create a new form within a card
	addBtn.addEventListener('click', function() {
		document.getElementById('addCard').remove();
		let formCard = createFormCard();
		libraryContainer.appendChild(formCard);
		libraryContainer.appendChild(addCard);
	});

	libraryContainer.appendChild(bookCard);

	// remove last add button
	if (document.getElementById('addCard')) {
		document.getElementById('addCard').remove();
	}

	// add a new add button
	libraryContainer.appendChild(addCard);

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

// create a new card and allow user to edit contents then save
function createFormCard() {

	let formCard = document.createElement('div');
	formCard.className = 'card ' + myLibrary.length;

	//create form
	let form = document.createElement('form');
	
	let legend = document.createElement('legend');
	legend.textContent = 'Add new book:';

	form.appendChild(legend);
	
	let titleLabel = document.createElement('label');
	titleLabel.setAttribute('for', 'title');

	let titleSpan = document.createElement('span');
	titleSpan.textContent = 'Title';
	titleLabel.appendChild(titleSpan);

	let titleRequired = document.createElement('span');
	titleRequired.setAttribute('aria-label', 'required');
	titleRequired.textContent = '*';
	titleLabel.appendChild(titleRequired);

	let titleDiv = document.createElement('div');
	titleDiv.appendChild(titleLabel);

	let titleInput = document.createElement('input');
	titleInput.setAttribute('type', 'text');
	titleInput.id = 'title';
	titleDiv.appendChild(titleInput);

	form.appendChild(titleDiv);

	formCard.appendChild(form);

	return formCard;
}

const myLibrary = [];
// dummy book
const theHobbit = new Book('The Hobbit', 'J.R.R. Tolkien', '295', false);
myLibrary.push(theHobbit);
addNewBook(myLibrary[myLibrary.length-1], myLibrary.length-1);

let lastBookId = myLibrary.length-1;
let lastBook = document.getElementById(lastBookId);






