const path = require('path');
var webconfig = require('./config/vue.config.web');
let config = undefined;
let buildtype = process.env.buildtype
if('web' === buildtype){
    config = webconfig;
}else{
    config = {}
}

console.log(config)

module.exports = config;
