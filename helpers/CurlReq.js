// function getData(token){


// console.log("inside getdata");
// const curl = new (require( 'curl-request' ))();
// const url = "https://www.googleapis.com/drive/v3/files/1t3JQo0DgmClG1Ne2blu4QvnXLg8Y1VqL?fields=thumbnailLink&key=AIzaSyDVk04OwdyuPc6Nf3qnHZfUb1B8eE5HyOI";
// // const url = "https://www.googleapis.com/drive/v3/files/${imgId}?fields=webContentLink&key=${apiKey}";

// return await curl.setHeaders([
//     // 'user-agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.94 Safari/537.36'
//     'Content-Type: multipart/form-data'
// ])
// .get(`https://www.googleapis.com/drive/v3/files/1t3JQo0DgmClG1Ne2blu4QvnXLg8Y1VqL?fields=thumbnailLink&key=${token}`)
// .then(({statusCode, body, headers}) => {
//     console.log("no err",statusCode, body, headers)
// })
// .catch((e) => {
//     console.log("error",e);
// });

// }


/*@parameters g()*/
var request = require('request');
var Promise = require('promise');

function getImageUrl(id) {

  let imgId = id;
  // let apiKey = 'AIzaSyDVk04OwdyuPc6Nf3qnHZfUb1B8eE5HyOI';
  let apiKey = 'AIzaSyDEZAWdMIwBpqhQ2XZWKA8fKVyWlMWOgSA';

  return new Promise((resolve, reject) => {

    request(`https://www.googleapis.com/drive/v3/files/${id}?fields=webContentLink&key=${apiKey}`, function (error, response, body) {
      if (error) return reject(error)
      resolve(body)

    })
  })


}
// getData();


function firebaseRequest(token) {
  let path = "/imagecard/";

  return new Promise((resolve, reject) => {

    request(`https://hewawissa-881d7.firebaseio.com${path}.json?access_token=${token}`, function (error, response, body) {
      if (error) return reject(error)
      resolve(body)

    })
  })

}


function apiCall(api,method,body = null, head = null) {
  // console.log("url:", api)
  //{ 'title': 'new aba', 'url': 'https://grantha.lk/media/catalog/product/cache/bfa4f59b59693a18ca4208a6e02422cd/n/a/narichchi_saha_nawwi.jpg', 'description': '' }
  if(body!=null)
  body = JSON.stringify(body);
  else
  body = {};

  var options = {
    url: api,
    uri: api,
    method: method,
    // formData: { amount: "777", likes: "888" },
    form: body
  };

  // console.log("options",options )
  //add aditonal header data
  /*if (head != null) {
    head.keys(myObject).map(function (key, index) {
      header[key] = head[key];
    });
  }*/
  return new Promise(function (resolve, reject) {
    request(options, function (err, httpResponse, body) {
      if (!err) {
        
        console.log("info", body)
        resolve(body);
      } else {
        console.log("status code", httpResponse.statusCode)
        console.log("error", err)
        reject(err);
      }
    })
  })


 



}
/*
module.exports = getImageUrl//firebaseRequest
module.exports = firebaseRequest
exports.apiCall = apiCall*/
module.exports = {

  getImageUrl,
  firebaseRequest,
  apiCall
}
// or
// exports.getImageUrl = getImageUrl;
// exports.firebaseRequest = firebaseRequest;
// exports.apiCall = apiCall;