var express = require('express')
var router = express.Router()
var jwt = require('express-jwt')
var firebase = require('./../controllers/firebase.controller')
var _ = require('lodash');

var caller = require('./../helpers/CurlReq')

// middleware that is specific to this router
router.use('/',/* jwt({secret: 'shhhhhhared-secret'}).unless({path: ['/auth']}),*/function timeLog(req, res, next) {
    console.log('Time: ', Date.now())

    next()
})
// define the home page route
router.get('/:dayTag', async function (req, res) {

    let fb_token = await firebase().then(function(token){
        console.log("TOKEN",token)

        caller.firebaseRequest(token).then(function(data){
            
            // console.log(_.values(_.mapKeys(data, function(value, key) {key; return value; })));
            // data =_.values(_.mapValues(data, (value, key) => { value[key] = key; return value; }))
            // data.join();
            let a =[];
            data = JSON.parse(data)
            a = _.values(data[req.params.dayTag])
            a.push()
            res.send(a);
        }).catch((e)=>{
            res.send("could not load firebase data");
        });
        
    }).catch((e)=>{
        console.log("token generation error",e);
        res.send("Token generation error")
    });

})


//save data into firebase
router.put('/:dayTag/:imageid', async function (req, res) {

    console.log(req.body);
    
    
    firebase().then(function(token){
        console.log(token)
        let fbUrl = `https://hewawissa-881d7.firebaseio.com/imagecard/${req.params.dayTag}/${req.params.imageid}/.json?access_token=${token}`;
        /*caller.apiCall(null,req.body,fbUrl).then(function(data){
            
            res.send(data);
        }).catch((e)=>{
            //res.status(200).send("could not load firebase data liine 66",e);
            res.send(e)
        });*/
        caller.apiCall(fbUrl,req.body).then((submitresponse)=>{
            res.send(submitresponse);
        }).catch((e)=>{
            res.send(e);
        });
       
        
    }).catch((e)=>{
        console.log("token generation error",e);
        res.send("Token generation error")
    });

})

module.exports = router