const https=require('https');
const fs=require('fs');
const key=fs.readFileSync('./public/4628655_pk.zhanghaichuan.com.key');
const cert=fs.readFileSync('./public/4628655_pk.zhanghaichuan.com.crt');

module.exports = {
    outputDir:'dist',
    assetsDir: 'assets',
    lintOnSave:false,
    publicPath: './',
    devServer:{
        open:true,
        host:'localhost',
        port:"8080",
        https: {
            key:key,
            cert:cert,
            ca:cert,
        },
        hotOnly:false,
        proxy:{
            '/img':{
                target:'https://pk.zhanghaichuan.com/dzi_list_data?page_no=1&item_per_page=20',
                ws:true,
                changeOrigin:true,
                pathRewrite:{
                    '^/img':''
                }
            },
        },
    }
};
