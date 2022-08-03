const uList = document.querySelector('.uList');
const form = document.querySelector('.input-form');
const menu = document.querySelector('.menu-ul');
const dateTime = document.querySelector('.date-time');

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
      this.preserveDataList = JSON.parse(localStorage.getItem('data')) ?? []; // Nullish Coelasing Operator
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

menu.addEventListener('click', (e) => {
  const target = e.target ?? null;
  if (target.nodeName.toLowerCase() === 'a') {
    const allAnchor = menu.querySelectorAll('.link');
    allAnchor.forEach((each) => {
      each.classList.remove('active');
    });
    target.classList.add('active');
    const sectionId = target.getAttribute('href');
    const targetSection = document.querySelector(sectionId);
    const getAllLink = document.querySelectorAll('.section');

    getAllLink.forEach((each) => {
      each.classList.remove('active');
    });

    targetSection.classList.add('active');
  }
});

const options = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
};

setInterval(() => {
  const dateObj = new Date();
  const dateString = dateObj.toLocaleString('en-US', options).split(',').slice(1).join('');
  const timeString = dateObj.toLocaleTimeString('en-US');
  dateTime.textContent = `${dateString}, ${timeString}`;
}, 1000);