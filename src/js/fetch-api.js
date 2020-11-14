import API from './apiService';
import '../css/styles.css';
import debounce from 'lodash.debounce';
import imageCardTpl from '../templates/image-card.hbs';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
import { alert, info, error, defaultModules } from '@pnotify/core';

const inputEl = document.querySelector('input[name="query"]');
const galleryEl = document.querySelector('.js-gallery-container');
const loadMoreButtonEl = document.querySelector('.load-more-button');
let searchQuery;
galleryEl.innerHTML = '';
inputEl.addEventListener('input', debounce(onInputType, 500));

console.log(loadMoreButtonEl);
// loadMoreButtonEl.addEventListener('click', onButtonClick);

function onInputType(e) {
  e.preventDefault();
  const field = e.target;
  galleryEl.innerHTML = '';
  searchQuery = inputEl.value;
  API(searchQuery)
    .then(renderImageCards)
    .catch(onFetchError)
    .finally(() => field.reset);
}

function renderImageCards({ hits }) {
  console.log(hits);
  galleryEl.innerHTML = imageCardTpl(hits);
}

function onFetchError() {
  console.log('Something went wrong');
  alert({
    text: 'Something went wrong',
    maxTextHeight: null,
    sticker: false,
  });
}

function onButtonClick(e) {
  console.log('button click');
  // e.preventDefault();
  // const field = e.target;
  // galleryEl.innerHTML = '';
  // searchQuery = inputEl.value;
  // API(searchQuery)
  //   .then(renderImageCards)
  //   .catch(onFetchError)
  //   .finally(() => field.reset);
}
