const express = require('express')
const app = express()
var {google} = require('googleapis');
//const google.auth.JWT = require('googleapis');


var admin = require("firebase-admin");

var serviceAccount = require("./../config/hewawissa-881d7-firebase-adminsdk-0u7ui-23379319a7.json");


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://fuelcenter-7331d.firebaseio.com"
  
  //console.log()
});
console.log(admin)


function getAccessToken() {
  return new Promise(function(resolve, reject) {
    var key = require('./../config/hewawissa-881d7-firebase-adminsdk-0u7ui-23379319a7.json');
    var jwtClient = new google.auth.JWT(
      key.client_email,
      null,
      key.private_key,
      ['https://www.googleapis.com/auth/firebase.messaging','https://www.googleapis.com/auth/firebase.database','https://www.googleapis.com/auth/userinfo.email'],
      null
    );
    jwtClient.authorize(function(err, tokens) {
      if (err) {
        return reject(err);
        //return;
      }
	  
	  
      resolve(tokens.access_token);
    });
  });
}

module.exports = getAccessToken;