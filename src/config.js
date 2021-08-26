let baseUrl, applicationTitle, displayChars;

if (process.env.REACT_APP_ENV === 'development') {
  baseUrl = 'https://dida.hmpf.cz/api/';
  applicationTitle = 'DIDA development'
  displayChars = true
} else if (process.env.REACT_APP_ENV === 'production') {
  baseUrl = 'https://dida.ujc.cas.cz/api/';
  applicationTitle = 'DIDA'
  displayChars = true
} else { // if (process.env.REACT_APP_ENV === 'public') {
  baseUrl = 'https://proponar.ujc.cas.cz/api/';
  applicationTitle = 'ProPONAR'
  displayChars = false
}

export { baseUrl, applicationTitle, displayChars };
