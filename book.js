class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
        this.readMsg = read ? 'Has been read' : 'Has not been read';
    }
}

class Library {
    constructor(bookList = []) {
    	this.bookList = bookList;
        this.libraryContainer = document.querySelector('.libraryContainer');
        this.addCard = this.createAddCard();
        this.libraryContainer.appendChild(this.addCard);
		console.log(this.libraryContainer);
        this.initEvents();
    }

    createElement(tag, classNames = []) {
        const element = document.createElement(tag);
        classNames.forEach(className => element.classList.add(className));
        return element;
    }

    createAddCard() {
        const addCard = this.createElement('div', ['addCard']);
        const addIcon = this.createElement('img', ['icon']);
        addIcon.src = './svgs/plus.svg';
        addCard.appendChild(addIcon);
        addCard.addEventListener('click', this.handleAddCardClick.bind(this));
        return addCard;
    }

    handleAddCardClick() {
        const existingForm = document.getElementById('form');
        if (!existingForm) {
            this.libraryContainer.removeChild(this.addCard);
            const formCard = this.createFormCard();
            this.libraryContainer.appendChild(formCard);
        }
    }

    createFormCard() {
        const formCard = this.createElement('div', ['form', 'card']);
        const form = this.createElement('form', ['form']);
        form.id = 'form';

        const fields = [
            { label: 'Title', id: 'title', type: 'text' },
            { label: 'Author', id: 'author', type: 'text' },
            { label: 'Number of pages', id: 'pages', type: 'text' },
            { label: 'Has been read? (y/n)', id: 'read', type: 'text' }
        ];

        fields.forEach(({ label, id, type }) => {
            const div = this.createElement('div');
            const labelElement = this.createElement('label');
            labelElement.setAttribute('for', id);
            labelElement.textContent = `${label} *`;
            const input = this.createElement('input');
            input.type = type;
            input.id = id;
            div.appendChild(labelElement);
            div.appendChild(input);
            form.appendChild(div);
        });

        const saveBtn = this.createElement('button', ['addLibBtn']);
        saveBtn.type = 'submit';
        saveBtn.textContent = 'Save';
        form.appendChild(saveBtn);

        const cancelBtn = this.createElement('button', ['cancelLibBtn']);
        cancelBtn.type = 'button';
        cancelBtn.textContent = 'Cancel';
        form.appendChild(cancelBtn);

        formCard.appendChild(form);
        return formCard;
    }

    saveBook(event) {
        event.preventDefault();
        const form = document.getElementById('form');
        const newBook = new Book(
            form.title.value,
            form.author.value,
            form.pages.value,
            form.read.value.toLowerCase() === 'y'
        );
        this.bookList.push(newBook);
        this.updateBookCards(newBook, this.bookList.length - 1);
        this.libraryContainer.replaceChild(this.addCard, form.closest('.card'));
    }

    cancelForm() {
        const formCard = document.querySelector('.form.card');
        this.libraryContainer.replaceChild(this.addCard, formCard);
    }

    removeBook(event) {
        const bookCard = event.target.closest('.book.card');
        const id = parseInt(bookCard.id.split('-')[1]);
        this.bookList.splice(id, 1);
        bookCard.remove();
    }

    toggleReadStatus(event) {
        const checkbox = event.target;
        const id = parseInt(checkbox.id.split('-')[1]);
        const book = this.bookList[id];
        book.read = checkbox.checked;
        document.getElementById(`read-${id}`).textContent = book.read ? 'Has been read' : 'Has not been read';
    }

    createCardItem(name, id, className) {
        const div = this.createElement('div', [`${className}`, 'info']);
        div.textContent = name;
        div.id = id;
        return div;
    }

    updateBookCards(book, id) {
        const closeIcon = this.createElement('img', ['closeIcon']);
        closeIcon.src = './svgs/close.svg';

        const bookInfo = this.createElement('div', ['bookInfo']);
        bookInfo.appendChild(this.createCardItem(book.author, `author-${id}`, 'author'));
        bookInfo.appendChild(this.createCardItem(`${book.pages} pages`, `pages-${id}`, 'pages'));
        bookInfo.appendChild(this.createCardItem(book.readMsg, `read-${id}`, 'read'));

        const readSwitch = this.createElement('label', ['switch']);
        const inputCheckBox = this.createElement('input');
        inputCheckBox.type = 'checkbox';
        inputCheckBox.id = `checkbox-${id}`;
        inputCheckBox.checked = book.read;
        const switchBtn = this.createElement('div', ['switch-btn']);
        readSwitch.appendChild(inputCheckBox);
        readSwitch.appendChild(switchBtn);
        bookInfo.appendChild(readSwitch);

        const bookCard = this.createElement('div', ['book', 'card']);
        bookCard.id = `book-${id}`;
        bookCard.appendChild(closeIcon);
        bookCard.appendChild(this.createCardItem(book.title, `title-${id}`, 'title'));
        bookCard.appendChild(bookInfo);

        this.libraryContainer.appendChild(bookCard);
    }

    initEvents() {
        this.libraryContainer.addEventListener('click', (event) => {
            const addCard = event.target.closest('.addCard');
            const addLibBtn = event.target.closest('.addLibBtn');
            const cancelLibBtn = event.target.closest('.cancelLibBtn');
            const closeIcon = event.target.closest('.closeIcon');
            const switchCheckbox = event.target.closest('.switch input[type="checkbox"]');

            if (addCard) this.handleAddCardClick();
            if (addLibBtn) this.saveBook(event);
            if (cancelLibBtn) this.cancelForm();
            if (closeIcon) this.removeBook(event);
            if (switchCheckbox) this.toggleReadStatus(event);
        });
    }
}

new Library([]);
