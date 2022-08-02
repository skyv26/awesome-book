const uList = document.querySelector('.uList');
const form = document.querySelector('.input-form');

class Book {
  constructor() {
    this.bookObject = {};
    this.preserveDataList = [];
  }

  loadData() {
    this.localStorageHandler(false);
    this.objIteratorHandler(true);
  }

  add(title, author) {
    this.bookObject = { title, author };
    this.preserveDataList.push(this.bookObject);
    this.objIteratorHandler();
  }

  remove(objId) {
    this.requestedDataHandler();
    this.preserveDataList.splice(objId, 1);
    this.objIteratorHandler();
  }

  objIteratorHandler(mode = false) {
    const htmlObjList = this.preserveDataList.map((each, id) => `<li class="list"><h2 class="bookTitle">"${each.title}"&nbsp;by</h2><h3 class="bookAuthor">&nbsp;${each.author}</h3><button class="remove-btn btn-${id}">Remove</button></li>`);
    uList.textContent = '';

    if (!mode) {
      this.localStorageHandler();
    }

    htmlObjList.forEach((each) => {
      uList.insertAdjacentHTML('afterbegin', each);
    });
  }

  localStorageHandler(mode = true) {
    if (mode) {
      localStorage.setItem('data', JSON.stringify(this.preserveDataList));
    } else {
      this.preserveDataList = JSON.parse(localStorage.getItem('data'));
    }
  }

  requestedDataHandler() {
    if (this.preserveDataList.length === 0) {
      this.localStorageHandler(false);
    }
  }
}

const book = new Book();
book.loadData();

form.addEventListener('submit', function formHandler(e) {
  e.preventDefault();
  const title = this.querySelector('.form-title').value;
  const author = this.querySelector('.form-author').value;
  book.add(title, author);
  this.reset();
});

uList.addEventListener('click', (e) => {
  const { target } = e;
  if (target.nodeName.toLowerCase() === 'button') {
    const getId = target.classList[1].split('-')[1];
    book.remove(getId);
  }
});