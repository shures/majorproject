const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: __dirname+'/src/app.js', //my first look to enter
    output: {
        path: path.join(__dirname, '/bundle'), //output the folder the project root during build command
        filename: 'index_bundle.js' // filename to be prepared...these are for build propose run by run build command
    },
    mode:'development',
    devServer: {
        // this can be also done with webpack cli like webpack-dev-server --open --hot
        host: '127.0.0.1',
        port: 3000,
        historyApiFallback: {
            disableDotRule: true
        }, // allow user to go back and forth in the browser
        open: true, //open the browser
        disableHostCheck: true,
        headers: {
            'Access-Control-Allow-Origin': '*'
        },
        inline:true,
    },
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.js?$/, //if it encounters .js file use babel-loader with it's plugin preset-env and preset-react, it tells babel that i am using react and es different virsion
                exclude: /node_modules/, //don't look at this..leave it
                loader: 'babel-loader', //use this to load js file
            },
            {
                test:/\.css$/,
                use:['style-loader','css-loader']
            },
            {
                test: /\.(pdf|jpg|png|gif|svg|ico|jpeg|JPG|mp4)$/,
                use: [
                    {
                        loader: 'file-loader'
                    },
                ]
            },
        ]
    },
    // it's a plugin of webpack that generates html file with the name
    plugins: [
        new HtmlWebpackPlugin({
            template: __dirname+'/src/index.html',
            filename: "index.html",
            inject: 'body'
        })
    ]
}