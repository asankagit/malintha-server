

const fs = require('fs');
const readline = require('readline');
const { google } = require('googleapis');
var Promise = require('promise');
var authTimer = require('./authorizeTimer');
var curlReq = require('../helpers/CurlReq').getImageUrl;
// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/drive.metadata.readonly',
  'https://www.googleapis.com/auth/drive',
  'https://www.googleapis.com/auth/drive.file',
  'https://www.googleapis.com/auth/drive.readonly',
  'https://www.googleapis.com/auth/drive.appdata',
  'https://www.googleapis.com/auth/drive.metadata',
  'https://www.googleapis.com/auth/drive.photos.readonly',
];
const TOKEN_PATH = 'token.json';

// Load client secrets from a local file.
function fetchGoogleDriveData() {
  // authTimer.timeBasedAuth();

  return new Promise(function (resolve, reject) {
    fs.readFile('credentials.json', (err, content) => {
      if (err) return console.log('Error loading client secret file:', err);
      // Authorize a client with credentials, then call the Google Drive API.

      authorize(JSON.parse(content), function (a) {
        // console.log("A obj", a);
        resolve(listFiles(a));
      });

      // authorize(JSON.parse(content), writeFun);
    })


  });

}

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials, callback) {
  const { client_secret, client_id, redirect_uris } = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(
    client_id, client_secret, redirect_uris[0]);

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, (err, token) => {
    console.log("google-drive-token", JSON.parse(token))
    if (err) return getAccessToken(oAuth2Client, callback);
    oAuth2Client.setCredentials(JSON.parse(token));
    callback(oAuth2Client);

  });
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
function getAccessToken(oAuth2Client, callback) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });
  console.log('Authorize this app by visiting this url:', authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question('Enter the code from that page here: ', (code) => {
    rl.close();
    oAuth2Client.getToken(code, (err, token) => {
      console.log("Google-drive-token82", token)
      if (err) return console.error('Error retrieving access token', err);
      oAuth2Client.setCredentials(token);
      console.log("Google-drive-token", token)
      // Store the token to disk for later program executions
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
        if (err) console.error(err);
        console.log('Token stored to', TOKEN_PATH);
      });
      callback(oAuth2Client);
    });
  });
}

/**
 * Lists the names and IDs of up to 10 files.
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
function listFiles(auth) {

  const drive = google.drive({ version: 'v3', auth });





  return drive //delete after test

  //parent https://developers.google.com/drive/api/v3/folder
  console.log("befre parent folder retrieve")


}


async function generaterFolderDetails(folderObj) {
  let urlList = [];
  for (var obj in folderObj) {
    await curlReq(folderObj[obj].id).then(function (res) {
        link = JSON.parse(res)
        let imgId = folderObj[obj].id;
      if (link.webContentLink != undefined ) {
        responseElemet = {id:imgId,url:link.webContentLink}
        urlList.push(responseElemet);
      }else{
        urlList.push("");
      }
    }).catch((error) => {
      console.log("error in gen older detail ", error)
    });
    // ;
    // console.log( "xxx",res)
  }
  return urlList;
}
module.exports = { fetchGoogleDriveData, generaterFolderDetails };
// exports.otherMethod = generaterFolderDetails;
