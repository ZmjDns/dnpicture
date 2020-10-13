<template>
	<view @click="handleClick">
		<slot></slot>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		props:['list','index'],
		methods:{
			handleClick(){
				console.log('list',this.list);
				console.log('list',this.index);
				//1.将数据缓存下来
				getApp().globalData.imgList = this.list
				getApp().globalData.imgIndex = this.index
				//页面跳转
				uni.navigateTo({
					url:'/pages/imgDetail/imgDetail'
				})
			}
		}
	}
</script>

<style>

</style>
