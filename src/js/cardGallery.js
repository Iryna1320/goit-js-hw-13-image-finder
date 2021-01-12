import API from './apiService';
import refs from './refs';
import error from './notifications';
import galleryList from '../templates/cardImg.hbs';
import { isIterable } from 'core-js';

refs.form.addEventListener('submit', onSearch);

let searchQuery = '';
let page = 1;
let totalImg = 0;

function onSearch(e) {
  e.preventDefault();
  page = 1;
  searchQuery = e.target.elements.query.value;
  clearCard();

  if (!searchQuery) {
    error.errorMsg();
    return;
  }

  API.fetchNameInput(searchQuery, page)
    .then(renderSearch)
    .catch(error.errorMsg);
}

refs.buttonMore.addEventListener('click', () => {
  page += 1;
  API.fetchNameInput(searchQuery, page)
    .then(renderSearch)
    .catch(error.errorMsg);
});

function renderSearch(query) {
  query.hits.map(e =>
    refs.cardGallery.insertAdjacentHTML('beforeend', galleryList(e)),
  );

  totalImg += query.hits.length;

  if (totalImg === query.totalHits || query.totalHits < 12) {
    btnIsHidden();
    return;
  }

  btnNoHidden();
  onLoadMore();
}

function btnIsHidden() {
  refs.buttonMore.classList.add('isHidden');
}

function btnNoHidden() {
  refs.buttonMore.classList.remove('isHidden');
  refs.form.reset();
}

function onLoadMore() {
  window.scrollTo({
    top: refs.cardGallery.scrollHeight,
    behavior: 'smooth',
  });
}

function clearCard() {
  refs.cardGallery.innerHTML = '';
  btnIsHidden();
}
