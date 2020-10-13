var BASE_URL = 'http://157.122.54.189:9088';
// #ifdef H5
BASE_URL = '/dpc';
// #endif

export default (options)=>{
	uni.showLoading({
		title:'加载中...'
	})
	return new Promise((resolve,reject) =>{
		uni.request({
			url:BASE_URL + options.url,
			method:options.method || 'GET',
			data:options.data || {},
			success(res) {
				if(res){
					resolve(res.data)
				}
			},
			fail(err) {
				reject(err)
			},
			complete() {
				uni.hideLoading()
			}
		})
	})
}