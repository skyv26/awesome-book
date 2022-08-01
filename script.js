
const bookObject = {};
const preserveDataList = [];

const bookStoreSection=document.querySelector('.book-store');

const uList=document.createElement('ul');
uList.className="uList";
bookStoreSection.appendChild(uList);

const list=document.createElement('li');
list.className="list";
uList.appendChild(list);

const bookTitle=document.createElement('h2');
bookTitle.className="bookTitle";
list.appendChild(bookTitle);

const bookAuthor=document.createElement('h3');
bookAuthor.className="bookAuthor";
list.appendChild(bookAuthor);

const removeButton=document.createElement('button');
removeButton.className="remove-btn";
list.appendChild(removeButton);

const localStorageHandler = () => {

};

const objIteratorHandler = () => {

};

const addBook = () => {

};

const removeBook = () => {

};