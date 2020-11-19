import '../styles/main.css';

import { fetchNewsList } from './utils/api-utils';
import {
  saveSearchParams,
  getSearchParams,
  saveArticle,
  getSavedArticles,
  removeSavedArticle,
} from './utils/storage-utils';
import {
  renderNewsList,
  renderPageSelectOptions,
  renderSavedArticles,
} from './utils/rendering-utils';

const searchInput = document.querySelector('#newsContentSearch');
const sectionSelect = document.querySelector('#sectionSelect');
const activePageSelect = document.querySelector('#activePageSelect');
const newsList = document.querySelector('#newsList');
const savedArticles = document.querySelector('#savedArticles');

window.saveArticle = (article) =>
  renderSavedArticles(saveArticle(article), savedArticles);
window.removeArticle = (id) =>
  renderSavedArticles(removeSavedArticle(id), savedArticles);

const searchHandler = async (params, onlyPageChange) => {
  const { error, response } = await fetchNewsList(params);

  if (error) {
    alert('There was an error, please try again later');
    return;
  }

  renderNewsList(response.results, newsList);

  if (onlyPageChange) {
    saveSearchParams(params);
    return;
  }

  renderPageSelectOptions(response.pages, activePageSelect);
  saveSearchParams({ ...params, currentPage: 1 });
};

searchInput.addEventListener('keyup', ({ target }) =>
  searchHandler({ phrase: target.value })
);
sectionSelect.addEventListener('change', ({ target }) =>
  searchHandler({ section: target.value })
);
activePageSelect.addEventListener('change', ({ target }) =>
  searchHandler({ currentPage: target.value }, true)
);

const initializeApp = async () => {
  const params = getSearchParams();
  renderSavedArticles(getSavedArticles(), savedArticles);

  await searchHandler(params);

  searchInput.value = params.phrase;
  sectionSelect.value = params.section || 'all';
};

initializeApp();
