const path = require('path');

module.exports = {
    pages:{
        app: {
            entry: path.resolve(__dirname, '../src/main.web.ts'),
            template: path.resolve(__dirname, '../public/index.html'),
            filename: 'index.html',
        }
    },
    filenameHashing: false,
    chainWebpack: (config)=>{
        config.plugins.delete('preload')
        config.plugins.delete('prefetch')
    }
}