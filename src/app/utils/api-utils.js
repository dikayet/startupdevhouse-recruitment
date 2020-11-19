let searchParams = {
  phrase: '',
  section: '',
  currentPage: 0,
};

const get30DaysAgoDateString = () => {
  const today = new Date();
  const date30DaysAgo = new Date(new Date().setDate(today.getDate() - 30));

  return [
    date30DaysAgo.getFullYear(),
    date30DaysAgo.getMonth(),
    date30DaysAgo.getDate(),
  ].join('-');
};

const getEndpoint = (params) => {
  searchParams = { ...searchParams, ...params };

  const baseEndpoint = 'https://content.guardianapis.com/search';
  const apiKey = '7d012150-1ab0-4ab9-9a3f-1415916c4817';
  const queryParamsArray = [`?from-date=${get30DaysAgoDateString()}`];

  if (searchParams.phrase) {
    queryParamsArray.push(`q=${encodeURI(searchParams.phrase)}`);
  }
  if (searchParams.section && searchParams.section !== 'all') {
    queryParamsArray.push(`section=${encodeURI(searchParams.section)}`);
  }
  if (searchParams.currentPage) {
    queryParamsArray.push(`page=${encodeURI(searchParams.currentPage)}`);
  }

  queryParamsArray.push(`api-key=${apiKey}`);

  return baseEndpoint + queryParamsArray.join('&');
};

export const fetchNewsList = async (params) => {
  try {
    const response = await fetch(getEndpoint(params));

    if (response.status !== 200) {
      return { error: true };
    }

    const data = await response.json();

    return data;
  } catch (error) {
    return { error: true };
  }
};
