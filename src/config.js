let baseUrl, applicationTitle, displayChars, locationNumbers;

if (process.env.REACT_APP_ENV === 'development') {
  baseUrl = 'https://dida.hmpf.cz/api/';
  applicationTitle = 'DIDA development'
  displayChars = true
  locationNumbers = true
} else if (process.env.REACT_APP_ENV === 'production') {
  baseUrl = 'https://dida.ujc.cas.cz/api/';
  applicationTitle = 'DIDA'
  displayChars = true
  locationNumbers = true
} else { // if (process.env.REACT_APP_ENV === 'public') {
  baseUrl = 'https://proponar.ujc.cas.cz/api/';
  applicationTitle = 'ProPONAR'
  displayChars = false
  locationNumbers = false
}

export { baseUrl, applicationTitle, displayChars, locationNumbers };
