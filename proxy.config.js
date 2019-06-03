const proxy = [
  {
    context: '/jserver',
    target: 'https://34.66.204.86:8443',
    pathRewrite: {'^/jserver' : ''},
	  secure: false,
	  changeOrigin: true
  }
];
module.exports = proxy;
