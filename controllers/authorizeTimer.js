module.exports = {
    timeBasedAuth: function(){
        setInterval(function(){ console.log("Hello in second"); }, 3000);
    }
}