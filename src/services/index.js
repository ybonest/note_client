import axios from 'axios';

const mdRequest = (params) => {
  return axios.get('/api/note',{
    params
  })
}

const sideBarData = () => {
  return axios.get('/api/sidebar')
}

export { mdRequest, sideBarData }