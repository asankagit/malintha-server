var express = require('express')
var router = express.Router()
var jwt = require('express-jwt')
var gDrive = require('./../controllers/getDriveData').fetchGoogleDriveData
var folderDataGen = require('./../controllers/getDriveData').generaterFolderDetails
var _ = require('lodash');
var caller = require('./../helpers/CurlReq');


// middleware that is specific to this router
router.use('/',/* jwt({secret: 'shhhhhhared-secret'}).unless({path: ['/auth']}),*/function timeLog(req, res, next) {
  console.log('Time: ', Date.now())

  next()
})
// define the home page route
router.get('/', jwt({ secret: 'pass' }).unless({ path: ['/about'] }), function (req, res) {

  res.send('Birds home page')
})
// define the about route

router.get('/calendar', async function (req, response) {


  var drive = gDrive();
  var folders = [];
  let images = [];
  await drive.then((msg) => {
    msg.files.list({
      pageSize: 100,
      fields: 'nextPageToken, files(id, name)',
      // q: `'1SL1LUHtF2KNJI-lIdOyriJB-_DQ97QbJ' in parents`
    }, (err, res) => {
      if (err) return console.log('The API returned an error: ' + err);
      const files = res.data.files;

      if (files.length) {

        console.log(files);
        files.map((file) => {
          if (!_.includes(file.name, '.')) {
            folders.push({ name: file.name, id: file.id })
          } else {
            images.push(file);
            console.log("onlyimages", images)
          }
          //console.log(`${files.parent} (${file.id})`);
          // console.log(files)
        });

        response.send(folders);
      } else {
        console.log('No files found.');
      }

    });
    // console.log("msg",msg)
  })

  // res.send("hdhg");

})
//get all images dat from google drive

router.get('/imagedata', async function (req, response) {


  var drive = gDrive();
  var images = [];

  await drive.then((msg) => {
    msg.files.list({
      pageSize: 10,
      fields: 'nextPageToken, files(id, name)',
    }, (err, res) => {
      if (err) return console.log('The API returned an error: ' + err);
      const files = res.data.files;

      if (files.length) {


        files.map((file) => {
          if (_.includes(file.name, '.'))
            images.push({ name: file.name, id: file.id })
          // console.log(`${file.name} (${file.id})`);
        });

        response.send(images);
      } else {
        console.log('No files found.');
      }

    });
    // console.log("msg",msg)
  })

  // res.send("hdhg");

})

//get image url
router.get('/imageurl/:id', async function (req, res) {

  await caller.getImageUrl(req.params.id).then(function (data) {
    fileData = JSON.parse(data);
    res.send(fileData.webContentLink)
  }).catch((e) => { res.send("ee" + e) })
})



router.get('/children/:id', async function (req, response) {

  var drive = gDrive();
  var folders = [];
  let images = [];
  await drive.then((msg) => {
    msg.files.list({
      pageSize: 100,
      fields: 'nextPageToken, files(id, name)',
      q: `'${req.params.id}' in parents`
    }, async (err, res) => {
      if (err) return console.log('The API returned an error: ' + err);
      const files = res.data.files;



      if (files.length) {

        
        let urlList;
        //generate folder 
        await folderDataGen(files).then(function (value) {
          // console.log(value);
          urlList = value;
          // expected output: "Success!"
        });
        // console.log("urlList",urlList[1].url)
          
        // console.log(files);
        let count = 0;
        files.map((file) => {
          file.description = file.name;
          file.title = "Cartoon"
          file.url = urlList[count].url != undefined?urlList[count].url:"" ;// _.filter(urlList, { 'id': file.id }).pop()
          count++;
          // let match = urlList.find(obj=>obj.id == file.id);
         
        // if (!_.includes(file.name,  '.')) {
        //   folders.push({ name: file.name, id: file.id })
        // } else {
        //   images.push(file);
        //   console.log("onlyimages",images)
        // }
        //console.log(`${files.parent} (${file.id})`);
        // console.log(files)
        });
        response.send(files);

      } else {
        console.log('No files found.');
        response.send([])
      }

    });
    // console.log("msg",msg)
  })


})

module.exports = router