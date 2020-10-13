<template>
	<view class="category_page">
		<view class="category_list">
			<view class="category_item" v-for="item in category" :key="item.id" @click="handleClick(item.id)">
				<image :src="item.cover" mode="aspectFill"></image>
				<view class="cate_name">{{item.name}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				category:[]
			}
		},
		mounted() {
			uni.setNavigationBarTitle({
				title:'分类'
			});
			this.getCategoryList();
		},
		methods:{
			getCategoryList(){
				this.$request({
					url:'/image/v1/vertical/category'
				})
				.then(result=>{
					console.log(result);
					this.category = result.res.category;
				})
			},
			handleClick(id){
				console.log('进入店家。。。。。')
				uni.navigateTo({
					url:'/pages/imgCategory/imgCategory?id=' + id
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.category_page{
		height: calc(100vh - 36px);
	}
	
	.category_list{
		display: flex;
		flex-wrap: wrap;
		.category_item{
			position: relative;
			width: 33.33%;
			border: 5rpx solid #FFFFFF;
			image{
				height: 240rpx;
			}
			.cate_name{
				position: absolute;
				width: 100%;
				height: 50rpx;
				left: 0;
				bottom: 0rpx;
				color: #FFFFFF;
				background-image: linear-gradient(to right top,rgba(0,0,0,.2),rgba(0,0,0,0));
				font-size: 40rpx;
				display: flex;
				align-items: center;
				padding-left: 20rpx;
			}
		}
	}
</style>
