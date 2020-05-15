const urlQa = 'http://localhost:8080'
const urlDev = 'http://localhost:8080'
var BASE_URL = ''
process.env.NODE_ENV === 'development'
  ? (BASE_URL = urlDev)
  : (BASE_URL = urlQa)
export default BASE_URL
