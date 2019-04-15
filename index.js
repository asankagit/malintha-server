var express = require('express')
var app = express()
var drive = require('./routes/gDrive')
var firebase = require('./routes/firebase.route')
var bodyParser = require('body-parser')


// parse body params and attache them to req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Add headers
app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    // Pass to next layer of middleware
    next();
});

app.use('/drive', drive);
app.use('/fb', firebase);

// respond with "hello world" when a GET request is made to the homepage
app.get('/', function (req, res) {
    let str = [{ title: 'new aba' ,url:'https://grantha.lk/media/catalog/product/cache/bfa4f59b59693a18ca4208a6e02422cd/n/a/narichchi_saha_nawwi.jpg',description:''},
    { title: 'new response',url:'https://grantha.lk/media/catalog/product/cache/bfa4f59b59693a18ca4208a6e02422cd/d/o/dosthara_haramitta.jpg',description:'' },
    { title: 'new response',url:'https://grantha.lk/media/catalog/product/cache/bfa4f59b59693a18ca4208a6e02422cd/d/o/dosthara_haramitta.jpg',description:'' }];
  res.send(str)
})
app.get('/calendar', function (req, res) {
    let str = [
      {name:'june-2018',id:'56dfsdsd1sdcxdf4sd46'}, 
      {name:'july-2018',id:'56dfsdsd1sdcxdf4sd46'} ,
      {name:'sep-2018',id:'56dfsdsd1sdcxdf4sd46'} ,
      {name:'oct-2018',id:'56dfsdsd1sdcxdf4sd46'} ,
      {name:'nov-2018',id:'56dfsdsd1sdcxdf4sd46'} ,
      {name:'dec-2018',id:'56dfsdsd1sdcxdf4sd46'}  
    
    ];
  res.send(str)
})
app.get('/api/:date', function (req, res) {
    let str = [
      { title: 'new response',url:'https://grantha.lk/media/catalog/product/cache/bfa4f59b59693a18ca4208a6e02422cd/d/o/dosthara_haramitta.jpg',description:'' },
      { title: 'new response',url:'https://grantha.lk/media/catalog/product/cache/bfa4f59b59693a18ca4208a6e02422cd/d/o/dosthara_haramitta.jpg',description:'' },
      { title: 'new response',url:'https://grantha.lk/media/catalog/product/cache/bfa4f59b59693a18ca4208a6e02422cd/d/o/dosthara_haramitta.jpg',description:'' },
      { title: 'new response',url:'https://grantha.lk/media/catalog/product/cache/bfa4f59b59693a18ca4208a6e02422cd/d/o/dosthara_haramitta.jpg',description:'' },
      { title: 'new response',url:'https://grantha.lk/media/catalog/product/cache/bfa4f59b59693a18ca4208a6e02422cd/d/o/dosthara_haramitta.jpg',description:'' },
    ];
  res.send(str)
})
app.get('/btn', function (req, res) {
    let str = [{ title: 'new aba' ,url:'https://grantha.lk/media/catalog/product/cache/bfa4f59b59693a18ca4208a6e02422cd/n/a/narichchi_saha_nawwi.jpg',description:''},
    { title: 'new response',url:'https://grantha.lk/media/catalog/product/cache/bfa4f59b59693a18ca4208a6e02422cd/d/o/dosthara_haramitta.jpg',description:'' },
    { title: 'new response',url:'https://grantha.lk/media/catalog/product/cache/bfa4f59b59693a18ca4208a6e02422cd/d/o/dosthara_haramitta.jpg',description:'' },
    { title: 'new response',url:'https://grantha.lk/media/catalog/product/cache/bfa4f59b59693a18ca4208a6e02422cd/d/o/dosthara_haramitta.jpg',description:'' },
    { title: 'new response',url:'https://grantha.lk/media/catalog/product/cache/bfa4f59b59693a18ca4208a6e02422cd/d/o/dosthara_haramitta.jpg',description:'' },
    { title: 'new response',url:'https://grantha.lk/media/catalog/product/cache/bfa4f59b59693a18ca4208a6e02422cd/d/o/dosthara_haramitta.jpg',description:'' },
    { title: 'new response',url:'https://grantha.lk/media/catalog/product/cache/bfa4f59b59693a18ca4208a6e02422cd/d/o/dosthara_haramitta.jpg',description:'' },
    { title: 'new response',url:'https://grantha.lk/media/catalog/product/cache/bfa4f59b59693a18ca4208a6e02422cd/d/o/dosthara_haramitta.jpg',description:'' },
    { title: 'new response',url:'https://grantha.lk/media/catalog/product/cache/bfa4f59b59693a18ca4208a6e02422cd/d/o/dosthara_haramitta.jpg',description:'' },
    { title: 'new response',url:'https://grantha.lk/media/catalog/product/cache/bfa4f59b59693a18ca4208a6e02422cd/d/o/dosthara_haramitta.jpg',description:'' },
    { title: 'new response',url:'https://grantha.lk/media/catalog/product/cache/bfa4f59b59693a18ca4208a6e02422cd/d/o/dosthara_haramitta.jpg',description:'' }];
  res.send(str)
})

app.listen(3001, () => {
    console.info(`server started on port 3001`); // eslint-disable-line no-console
  });