const path = require('path');

module.exports = {
  	context: path.join(__dirname),
	//This property defines where the application starts  
	entry:'index',
	//This property defines the file path and the file name which will be used for deploying the bundled file  
	output:{    
		path: path.join(__dirname, '/public'),    
		filename: 'bundle.js'  
	},
	//Setup loaders  
	module:{
	    rules:[
		    {
				test: /\.css$/,
				use: ['style-loader', 'css-loader'],
		    },
		    {
				test: /\.(jpg|png|svg)$/,
				use: ['url-loader'],
		    },
	        {
	        	test: /\.jsx?$/,
	        	exclude: /node_modules/,
	        	use: {          
	        		loader: 'babel-loader'        
	        	}
	        }    
    	]  
	},
	resolve: {
		extensions: ['.js', '.jsx'],
		modules: [
		  path.join(__dirname, 'client'),
		  'node_modules'
		]
	}
}