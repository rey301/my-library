class Book {
	constructor (title, author, pages, read) {
		this.title = title;
		this.author = author;
		this.pages = pages;
		this.read = read;
		if (read) {
			this.readMsg = 'Has been read';
		} else {
			this.readMsg = 'Has not been read';
		}
	}

	get title() {
		return this._title;
	}

	set title(value) {
		this._title = value;
	}

	get author() {
		return this._author;
	}

	set author(value) {
		this._author = value;
	}

	get pages() {
		return this._pages;
	}

	set pages(value) {
		this._pages = value;
	}

	get read() {
		return this._read;
	}

	set read(value) {
		this._read = value;
	}

	info = () => {
		console.log(`${this.title} by ${this.author}, 
		${this.pages} pages, ${this.readMsg}`);
	};
}

class Library {
	constructor(bookList) {
		this.bookList = bookList;
		this.libraryContainer = document.querySelector('.libraryContainer');
		this.addCard = document.createElement('div');
		this.addCard.addEventListener('click', this.handleAddCardClick.bind(this));
		this.addIcon = document.createElement('img');
		this.addIcon.src = './svgs/plus.svg';
		this.addIcon.id = 'icon';
		this.addCard.id = 'addCard';
		this.addCard.appendChild(this.addIcon);
		
	}


	checkRead() {
		let currRead = document.getElementById('read-' + this.id);
		if (currCheckBox.checked) {
			this.bookList[this.id].setRead(true);
			currRead.textContent = '';
		} else {
			this.bookList[this.id].setRead(false);
		}
	}

	// when clicked create a new book form within a card
	handleAddCardClick() {
		const createFormCard = () => {
			let formCard = document.createElement('div');
			formCard.className = 'form card';

			//create form
			let form = document.createElement('form');
			form.id = 'form';
			
			//title
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

			// author
			let authorLabel = document.createElement('label');
			authorLabel.setAttribute('for', 'author');

			let authorSpan = document.createElement('span');
			authorSpan.textContent = 'Author';
			authorLabel.appendChild(authorSpan);

			let authorRequired = document.createElement('span');
			authorRequired.setAttribute('aria-label', 'required');
			authorRequired.textContent = '*';
			authorLabel.appendChild(authorRequired);

			let authorDiv = document.createElement('div');
			authorDiv.appendChild(authorLabel);

			let authorInput = document.createElement('input');
			authorInput.setAttribute('type', 'text');
			authorInput.id = 'author';
			authorDiv.appendChild(authorInput);

			form.appendChild(authorDiv);
			
			// pages
			let pagesLabel = document.createElement('label');
			pagesLabel.setAttribute('for', 'pages');

			let pagesSpan = document.createElement('span');
			pagesSpan.textContent = 'Number of pages';
			pagesLabel.appendChild(pagesSpan);

			let pagesRequired = document.createElement('span');
			pagesRequired.setAttribute('aria-label', 'required');
			pagesRequired.textContent = '*';
			pagesLabel.appendChild(pagesRequired);

			let pagesDiv = document.createElement('div');
			pagesDiv.appendChild(pagesLabel);

			let pagesInput = document.createElement('input');
			pagesInput.setAttribute('type', 'text');
			pagesInput.id = 'pages';
			pagesDiv.appendChild(pagesInput);

			form.appendChild(pagesDiv);

			// read
			let readLabel = document.createElement('label');
			readLabel.setAttribute('for', 'read');

			let readSpan = document.createElement('span');
			readSpan.textContent = 'Has been read? (y/n)';
			readLabel.appendChild(readSpan);

			let readRequired = document.createElement('span');
			readRequired.setAttribute('aria-label', 'required');
			readRequired.textContent = '*';
			readLabel.appendChild(readRequired);

			let readDiv = document.createElement('div');
			readDiv.appendChild(readLabel);

			let readInput = document.createElement('input');
			readInput.setAttribute('type', 'text');
			readInput.id = 'read';
			readDiv.appendChild(readInput);
			
			form.appendChild(readDiv);

			//save button
			let saveBtn = document.createElement('button');
			saveBtn.setAttribute('type', 'submit');
			saveBtn.className = 'addLibBtn';
			saveBtn.textContent = 'save';

			saveBtn.addEventListener('click', () => {
				this.addBookToLibrary();
				const libraryContainer = document.querySelector('.libraryContainer');
				libraryContainer.removeChild(formCard);
			});

			form.appendChild(saveBtn);

			formCard.appendChild(form);

			return formCard;
		};
		// check if a form hasn't been saved, if so user must complete it before adding a new book
		if (!document.getElementById('form')) {
			document.getElementById('addCard').remove();
			let formCard = createFormCard();
			this.libraryContainer.appendChild(formCard);
		}
	};

	addToBookList(book) {
		this.bookList.push(book);
		this.book = this.bookList[this.bookList.length-1];
		this.id = this.bookList.length-1;
	}

	addBookToLibrary() {
		// this.preventDefault();
		const title = document.querySelector('#title');
		const author = document.querySelector('#author');
		const pages = document.querySelector('#pages');
		const read = document.querySelector('#read');
		this.addToBookList(new Book(title.value, author.value, pages.value, read.value));
		this.updateBookCards(this.bookList[this.bookList.length-1], this.bookList.length-1);
	}

	createCardItem(name, id, className) {
		let div = document.createElement('div');
		div.textContent = name;
		div.id= id;
		div.className = className;
		div.classList.add('info');
		return div;
	}

	updateBookCards() {
		// close icon
		let closeIcon = document.createElement('img');
		closeIcon.src = './svgs/close.svg';
		closeIcon.className = 'closeIcon';

		// book information
		let bookInfo = document.createElement('div');
		bookInfo.className = 'bookInfo';

		bookInfo.appendChild(this.createCardItem(this.book.author, 'author-' + this.id, 'author'));
		bookInfo.appendChild(this.createCardItem(this.book.pages + ' pages', 'pages-'+this.id, 'pages'));
		bookInfo.appendChild(this.createCardItem(this.book.readMsg, 'read-'+this.id, 'read'));

		// checkbox to check if book has been read
		let readSwitch = document.createElement('label');
		let inputCheckBox = document.createElement('input');
		inputCheckBox.type = 'checkbox';
		inputCheckBox.id = 'checkbox-' + this.id;

		let switchBtn = document.createElement('div');
		switchBtn.className = 'switch-btn';

		readSwitch.className = 'switch';

		// tick checkbox if book has been read
		if (this.book.read) {
			inputCheckBox.checked = true;
		} 

		readSwitch.appendChild(inputCheckBox);
		readSwitch.appendChild(switchBtn);

		bookInfo.appendChild(readSwitch);

		// book card
		let bookCard = document.createElement('div');

		bookCard.className = 'book card';
		bookCard.id = 'book-'+ this.id;
		bookCard.appendChild(closeIcon);
		bookCard.appendChild(this.createCardItem(this.book.title, 'title-' + this.id, 'title'));
		bookCard.appendChild(bookInfo);
		
		// button to add a new book

		this.libraryContainer.appendChild(bookCard);

		// remove last add button
		if (document.getElementById('addCard')) {
			document.getElementById('addCard').remove();
		}

		// add a new add button
		this.libraryContainer.appendChild(this.addCard);

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

	
}
const myLibrary = new Library([]);
const theHobbit = new Book('The Hobbit', 'J.R.R. Tolkien', '295', false);

myLibrary.addToBookList(theHobbit);
myLibrary.updateBookCards(myLibrary.bookList[myLibrary.bookList.length-1], myLibrary.bookList.length-1);

let lastBookId = myLibrary.length-1;
let lastBook = document.getElementById(lastBookId);






