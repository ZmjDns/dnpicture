//两种方法解决H5跨域问题
//1.根目录中(即与App.vue同级目录)配置vue.config.js
module.exports = {
	devServer:{
		port:'8080',
		disableHostCheck:true,
		proxy:{
			'/dpc':{
				target:'http://157.122.54.189:9088',
				changeOrigin:true,
				pathRewrite:{
					'^/dpc': ''
				}
			}
		}
	}
}
//2.在manifest.json的代码视图中  根节点中(即{}中)，做如下声明
/* "h5": {
	"devServer": {
		"port": 8080,	//浏览器运行端口
		"disableHostCheck": true,
		"proxy": {
			"/dpc": {
				"target": "http://157.122.54.189:9088",		//实际请求服务器地址
				"changeOrigin": true,
				"secure": true,
				"pathRewrite": {
					"^/dpc": ""
				}
			}
		}
	}
} */

//最后，最重要的一点，在配置的网络请求BSAE_URL中做如下配置
/* var BASE_URL = 'http://157.122.54.189:9088';
// #ifdef H5  //声明h5平台使用代理地址，(app 小程序不存在跨域问题，直接使用原地址)
BASE_URL = '/dpc';
// #endif */
