var config = {
   entry: './main.js',
	
   output: {
      path:'/index1',
      filename: 'index1.html',
   },
	
   devServer: {
      inline: true,
      port: 8084
   },
	
   module: {
      loaders: [
         {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
				
            query: {
               presets: ['es2015', 'react']
            }
         }
      ]
   }
}

module.exports = config;