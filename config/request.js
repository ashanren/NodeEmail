/**
 * @file request.js
 * @author Jarel Pellew
 * @desc exports.class for handling ajax requests and parsing results
 *
**/

  const axios = require('axios');

/*
* @name get
* @desc send an ajax get request and returns a result
* @param {String} url url to send data to
*/
exports.get = async (url, callback) => {
  const options = {
    method: 'GET',
    uri   : url,
    json  : true
  };
  return await axios.get(url).then(success).catch(failure);
}
  
/*
* @name post
* @desc send an ajax post request and returns a result
* @param {String} url url to send data to
*/
exports.post = async (url, data) => {
  return await axios.post(url, data).then(success).catch(failure);
}

/*
* @name put
* @desc send an ajax put request and returns a result
* @param {String} url url to send data to
*/
exports.put = async (url, data)  => {
  return await axios.put(url, data).then(success).catch(failure);
}

/*
* @name del
* @desc send an ajax delete request and returns a result
* @param {String} url url to send data to
*/
exports.del = async (url) => {
  return await axios.delete(url).then(success).catch(failure);
}

success = (res) => {
  return {data: res.data, status: res.status};
}

failure = (err) => {
  //console.log(err.response);
  const data = {data: err.response?.data, status: (err.response?.status || 500) };
  return data;
}
