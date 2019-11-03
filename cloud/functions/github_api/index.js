const cloud = require('wx-server-sdk')
const rp = require('request-promise')
const token = 'be6cf78904e54f1a5c265535c871354f818570f2'

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

exports.main = async (event, context) => {
  console.log('event', event)
  console.log('context', context)
  const star_params = {
    method: 'GET',
    url: `https://api.github.com/repos/${event.repo}/stargazers`,
    qs: {
    },
    headers: {
      'Accept': 'application/vnd.github.v3.star+json',
      'User-Agent': 'taro-star-history',
      // Authorization: `token ${token}`
    },
    json: true
  };
  const starRes = await rp(star_params)
  return {
    list: starRes
  }
}