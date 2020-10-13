<template>
	<view class="video_main">
		<scroll-view class="scroll" @scrolltolower="handleLower" scroll-y="true">
			<view class="vide_list">
				<view class="video_item" v-for="item in videoList" :key="item._id" @click="handleClick(item)">
					<image :src="item.img" mode="widthFix"></image>
				</view>
			</view>
			
		</scroll-view>
	</view>
</template>

<script>
	export default{
		props:['urlobj'],
		watch:{
			urlobj(){
				console.log(this.urlobj);
				this.hasMore = true;
				this.videoList = [];
				this.getVideoList();
			}
		},
		data(){
			return{
				videoList:[],
				hasMore:true
			}
		},
		mounted() {
			console.log(this.urlobj);
			this.getVideoList();
		},
		methods:{
			getVideoList(){
				this.$request({
					url:this.urlobj.url,
					data:this.urlobj.params
				}).then(result=>{
					console.log('result',result);
					if(result.res.videowp.length === 0){
						this.hasMore = false;
						uni.showToast({
							title:'没有更多数据le',
							icon:'none'
						});
						return;
					}
					this.videoList = [...this.videoList,...result.res.videowp];
				});
			},
			handleLower(){
				if(this.hasMore){
					this.urlobj.params.skip += this.urlobj.params.limit
					this.getVideoList();
				}else{
					uni.showToast({
						title:'没有更多数据了',
						icon:'none'
					});
				}
			},
			handleClick(item){
				getApp().globalData.videoItem = item;
				uni.navigateTo({
					url:'/pages/videoPage/videoPage'
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.video_main{
		.scroll{
			height: calc(100vh - 36px);
			.vide_list{
				display: flex;
				flex-wrap: wrap;
				.video_item{
					width: 33.33%;
					border: 5rpx solid #FFFFFF;
					image{
						
					}
				}
			}
		}
	}
	
</style>
