const cloud = require('wx-server-sdk')
const axios = require('axios')
const CircularJSON = require('circular-json');
const token = 'be6cf78904e54f1a5c265535c871354f818570f2'

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

const axiosInstance = axios.create({
    baseURL: 'https://api.github.com',
    headers: {
        Accept: 'application/vnd.github.v3.star+json',
        Authorization: `token ${token}`
    }
})

axios.interceptors.response.use((response) => {
    // Do something with response data
    let json = CircularJSON.stringify(response);
    const jsonData = JSON.parse(JSON.stringify(json))
    // let json = JSON.stringify(JSON.decycle(response));
    // const jsonData = JSON.retrocycle(JSON.parse(response));
    res.send(jsonData);
    // res.send(response)
}, function (error) {
    // Do something with response error
    return Promise.reject(error);
});


exports.main = async (event, context) => {
  console.log('event', event)
  console.log('context', context)
//   const wxContext = cloud.getWXContext()
  const stargazersUrl = `/repos/${event.repo}/stargazers`
  const starRes = await axiosInstance.get(stargazersUrl)
  return {
    list: starRes.data
  }
}