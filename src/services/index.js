import axios from 'axios';
import qs from 'qs';
var CancelToken = axios.CancelToken;
let cancel;

const service = axios.create({
  baseURL: '/',
});

service.interceptors.request.use(
  config => {
    if (config.method === 'post' || config.method === 'put') {
      config.headers['Content-Type'] = 'application/x-www-form-urlencoded' //可以不配置，会自动识别
    }
    return config
  },
  err => {
    return Promise.reject(err)
  });

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

const bloglinkData = () => {
  return axios.get('/api/bloglink')
}

const addbloglink = (params) => {
  console.log(params);
  
  return axios.post('/api/addbloglink', {
    params
  })
}

const reptileData = () => {
  return axios.get('/api/aeptile')
}

const uploadFiles = (params) => {
  // return axios.post('/files/file_upload',{
  //   params
  // })
  // 解决 params 过长 413
  return service({
    method: 'post',
    url: '/files/file_upload',
    data: {
      ...params
    },
    transformRequest: [function(data, headers) {
      data = qs.stringify(data);
      return data;
    }]
  })
}

const uploadNotes = (params) => {
  return service({
    method: 'post',
    url: '/files/note_upload',
    data: {
      ...params
    },
    transformRequest: [function(data, headers) {
      data = qs.stringify(data);
      return data;
    }]
  })
}

export { 
  mdRequest,
  sideBarData,
  categoriesData,
  bloglinkData,
  addbloglink,
  reptileData,
  uploadFiles,
  uploadNotes,
}