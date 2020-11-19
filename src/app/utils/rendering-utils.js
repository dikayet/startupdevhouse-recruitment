import {
  getArticleTemplate,
  getPageSelectOptionTemplate,
  getNoArticlesWarningTemplate,
  getSavedArticleTemplate,
} from './templates-utils';

export const renderNewsList = (list, container) => {
  if (!list.length) {
    container.innerHTML = getNoArticlesWarningTemplate();
    return;
  }

  container.innerHTML = list.reduce(
    (renderedHtml, article) => renderedHtml + getArticleTemplate(article),
    ''
  );
};

export const renderPageSelectOptions = (pagesAmount, container) => {
  let optionsHtmlString = getPageSelectOptionTemplate(1);

  for (let i = 1; i <= pagesAmount - 1; i++) {
    optionsHtmlString += getPageSelectOptionTemplate(i + 1);
  }

  container.innerHTML = optionsHtmlString;
  container.value = 1;
};

export const renderSavedArticles = (articles, container) => {
  let renderedHtml = '';

  for (let key in articles) {
    renderedHtml += getSavedArticleTemplate({ id: key, ...articles[key] });
  }

  container.innerHTML = renderedHtml || getNoArticlesWarningTemplate();
};
