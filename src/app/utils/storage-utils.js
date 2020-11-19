const storageNames = {
  searchParams: 'search-params',
  savedArticles: 'saved-articles',
};

const defaultSearchParams = {
  currentPage: 1,
  phrase: '',
  section: '',
};

export const saveSearchParams = (params) => {
  const newParams = { ...getSearchParams(), ...params };
  sessionStorage.setItem(storageNames.searchParams, JSON.stringify(newParams));

  return newParams;
};

export const getSearchParams = () => {
  const paramsString = sessionStorage.getItem(storageNames.searchParams);

  return paramsString ? JSON.parse(paramsString) : defaultSearchParams;
};

export const saveArticle = ({ id, title, url }) => {
  const savedArticles = getSavedArticles();
  const newSavedArticles = { ...savedArticles, [id]: { title, url } };
  localStorage.setItem(
    storageNames.savedArticles,
    JSON.stringify(newSavedArticles)
  );

  return newSavedArticles;
};

export const getSavedArticles = () => {
  const paramsString = localStorage.getItem(storageNames.savedArticles);
  return paramsString ? JSON.parse(paramsString) : {};
};

export const removeSavedArticle = (id) => {
  const savedArticles = getSavedArticles();
  delete savedArticles[id];
  localStorage.setItem(
    storageNames.savedArticles,
    JSON.stringify(savedArticles)
  );

  return savedArticles;
};
