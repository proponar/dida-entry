let baseUrl;
let applicationTitle;

if (process.env.REACT_APP_ENV === 'development') {
  baseUrl = 'https://dida.hmpf.cz/api/';
  applicationTitle = 'DIDA development'
} else if (process.env.REACT_APP_ENV === 'production') {
  baseUrl = 'https://dida.ujc.cas.cz/api/';
  applicationTitle = 'DIDA'
} else { // if (process.env.REACT_APP_ENV === 'public') {
  baseUrl = 'https://proponar.ujc.cas.cz/api/';
  applicationTitle = 'PROPONAR'
}

export { baseUrl, applicationTitle };
