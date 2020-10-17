let baseUrl;

if (process.env.REACT_APP_ENV === 'development') {
  baseUrl = 'https://dida.ujc.cas.cz/api/';
} else if (process.env.REACT_APP_ENV === 'production') {
  baseUrl = 'https://dida.ujc.cas.cz/api/';
}

export { baseUrl };
