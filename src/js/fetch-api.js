import API from './apiService';
import debounce from 'lodash.debounce';
import imageCardTpl from '../templates/image-card.hbs';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
import { alert, info, error, defaultModules } from '@pnotify/core';

const inputEl = document.querySelector('input[name="query"]');
const galleryEl = document.querySelector('.js-gallery-container');
const loadMoreButtonEl = document.querySelector('.load-more-button');
let page = 1;
let searchQuery;

galleryEl.innerHTML = '';

inputEl.addEventListener('input', debounce(onInputType, 500));
loadMoreButtonEl.addEventListener('click', onButtonClick);

function onInputType(e) {
  e.preventDefault();

  const field = e.target;
  galleryEl.innerHTML = '';
  searchQuery = inputEl.value;
  if (searchQuery == '') {
    galleryEl.innerHTML = '';
    return;
  }
  API(searchQuery, page)
    .then(renderContent)
    .catch(onFetchError)
    .finally(() => field.reset);
}

function renderContent(response) {
  console.log('renderContent');
  const { hits } = response;
  renderImageCards(hits);

  if (hits.length === 12) {
    loadMoreButtonEl.classList.remove('hidden');
  } else {
    loadMoreButtonEl.classList.add('hidden');
  }
}

function renderImageCards(hits) {
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
  console.log(searchQuery);
  e.preventDefault();
  page += 1;
  API(searchQuery, page).then(renderImageCards).catch(onFetchError);
}
