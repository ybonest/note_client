import axios from 'axios';
var CancelToken = axios.CancelToken;
let cancel;
const mdRequest = (params) => {
  return axios.get('/api/note',{
    CancelToken: new CancelToken(function executor(c){
      cancel = c;
    }),
    params
  })
}

const sideBarData = () => {
  return axios.get('/api/sidebar')
}

const categoriesData = () => {
  return axios.get('/api/categories')
}

export { mdRequest, sideBarData, categoriesData }