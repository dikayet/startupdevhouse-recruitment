let searchParams = {
  phrase: '',
  section: '',
  currentPage: 0,
};

export const get30DaysAgoDateString = (date) => {
  const timeOf30days = 30*24*60*60*1000;
  const date30DaysAgo = new Date(date.getTime() - timeOf30days);

  return [
    date30DaysAgo.getFullYear(),
    date30DaysAgo.getMonth(),
    date30DaysAgo.getDate(),
  ].join('-');
};

export const getEndpoint = (params) => {
  searchParams = { ...searchParams, ...params };

  const baseEndpoint = 'https://content.guardianapis.com/search';
  const apiKey = '7d012150-1ab0-4ab9-9a3f-1415916c4817';
  const queryParamsArray = [`?from-date=${get30DaysAgoDateString(new Date())}`];

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
