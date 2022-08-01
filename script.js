let bookObject = {};
let preserveDataList = [];
const uList = document.querySelector('.uList');
const form = document.querySelector('.input-form');

const localStorageHandler = (arrObj, mode = true) => {
  if (mode) {
    localStorage.setItem('data', JSON.stringify(arrObj));
  } else {
    return JSON.parse(localStorage.getItem('data'));
  }

  return null;
};

const requestedDataHandler = (preserveDataList) => {
  if (preserveDataList.length === 0) {
    return localStorageHandler(preserveDataList, false);
  }
  return preserveDataList;
};

const objIteratorHandler = (preserveDataList, mode = false) => {
  const htmlObjList = preserveDataList.map((each, id) => `<li class="list">
        <h2 class="bookTitle">${each.title}</h2>
        <h3 class="bookAuthor">${each.author}</h3>
        <button class="remove-btn btn-${id}">Remove</button>
      </li>`);

  uList.textContent = '';

  if (!mode) {
    localStorageHandler(preserveDataList);
  }

  htmlObjList.forEach((each) => {
    uList.insertAdjacentHTML('afterbegin', each);
  });
};

const addBook = (obj) => {
  preserveDataList.push(obj);
  objIteratorHandler(preserveDataList);
};

// ADD BUTTON FUNCTION
form.addEventListener('click', function formHandler(e) {
  e.preventDefault();
  const { target } = e;
  if (target.type === 'submit') {
    const title = this.querySelector('.form-title').value;
    const author = this.querySelector('.form-author').value;
    bookObject = { title, author };
    addBook(bookObject);
    this.reset();
  }
});

// REMOVE BUTTON FUNCTION
uList.addEventListener('click', (e) => {
  const { target } = e;
  if (target.nodeName.toLowerCase() === 'button') {
    const getId = target.classList[1].split('-')[1];
    preserveDataList = Object.assign(requestedDataHandler(preserveDataList));
    preserveDataList.splice(getId, 1);
    objIteratorHandler(preserveDataList);
  }
});

const fetchDataLocalStorage = localStorageHandler([], false);

if (fetchDataLocalStorage !== null && fetchDataLocalStorage.length) {
  objIteratorHandler(fetchDataLocalStorage, true);
}