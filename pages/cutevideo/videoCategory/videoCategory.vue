<template>
	<view class="">
		分类
	</view>
</template>

<script>
	export default{
		props:['url'],
		mounted() {
			console.log('url',this.url);
			this.getCategoryData();
		},
		watch:{
			url(){
				console.log('watchUrl',this.url);
			}
		},
		methods:{
			getCategoryData(){
				this.$request({
					url:this.url
				}).then(result=>{
					console.log('categoryData',result);
				});
			}
		}
	}
</script>

<style>
</style>
