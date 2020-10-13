<template>
	<view>
		<!-- 用户信息 -->
		<view class="user_info" v-if="showUser">
			<view class="user_icon"><image :src="imgDetail.user.avatar" mode="widthFix"></image></view>
			<view class="user_desc">
				<view class="user_name">{{imgDetail.user.name}}</view>
				<view class="user_time">{{imgDetail.cnTime}}</view>
			</view>
		</view>
		<!-- 专辑大图 -->
		<view class="pic_info">
			<swiper-action @direction="swipDirection">
				<image :src="imgDetail.thumb" mode="widthFix"></image>
			</swiper-action>
			<view class="good_collect">
				<view class="iconfont icondianzan good">{{imgDetail.rank}}</view>
				<view class="iconfont iconshoucang collect">收藏</view>
			</view>
		</view>
		
		<!-- 相关 -->
		<view class="album_wrap">
			<view class="album_title">相关</view>
			<view class="album_list">
				<view class="album_item" v-for="item in album" :key="item.id">
					
				</view>
			</view>
		</view>
		
		<!-- 评论 -->
		
		<!-- 下载 -->
		<view class="download">
			<view class="download_btn" @click="handleDownload">下载图片</view>
		</view>
		<!-- 下载 -->
		
	</view>
</template>

<script>
	import swiperAction from '@/components/swiperAction/swiperAction.vue'
	import moment from "moment"
	moment.locale("zh-cn");
	export default {
		data() {
			return {
				imgList:[],
				imgDetail:{},
				album:[],
				comments:[],
				hots:[],
				imgIndex:0,
				showUser:false
			}
		},
		components:{
			swiperAction
		},
		onLoad() {
			this.imgList = getApp().globalData.imgList;
			this.imgIndex = getApp().globalData.imgIndex;
			this.getThisPageData();
		},
		methods: {
			getThisPageData(){
				this.imgDetail = this.imgList[this.imgIndex]
				this.showUser = this.imgDetail.hasOwnProperty('user');
				console.log('showUser',this.showUser);
				console.log('imgIndex',this.imgIndex);
				console.log('imgList',this.imgList.length);
				//console.log('imgDetail',this.imgDetail);
				this.imgDetail.cnTime = moment(this.imgDetail.atime*1000).fromNow();
				this.getComments();
			},
			getComments(){
				this.$request({
					url:'/image/v2/wallpaper/wallpaper/' + this.imgDetail.id + '/comment'
				}).then(result=>{
					console.log('comments',result);
					this.album = result.res.album;
					this.comments = result.res.comment;
					this.hots = result.res.hot;
				})
			},
			swipDirection(e){
				console.log(e);
				//左滑this.imhIndex++ 加载下一页
				//右滑this.imgIndex--
				if(e.direction === 'left' && (this.imgIndex < this.imgList.length -1)){
					this.imgIndex++;
					this.getThisPageData();
				}else if(e.direction === 'right' && (this.imgIndex > 0)){
					this.imgIndex--;
					this.getThisPageData();
				}else{
					uni.showToast({
						title:'没有数据了',
						icon:'none'
					})
				}
			},
			async handleDownload(){
				uni.showLoading({
					title:'下载中...'
				});
				const result1 = await uni.downloadFile({url:this.imgDetail.img})
				console.log('result1',result1);
				const {tempFilePath} = result1[1];
				const result2 = await uni.saveImageToPhotosAlbum({filePath:tempFilePath});
				console.log('result2',result2);
				uni.hideLoading();
				await uni.showToast({
					title:'下载完成'
				})
			}
		}
	}
</script>

<style lang="scss">
	.user_info{
		display: flex;
		.user_icon{
			margin: 5rpx 20rpx;
			image{
				width: 88rpx;
				height: 88rpx;
				border-radius: 50%;
			}
		}
		.user_desc{
			margin-left: 20rpx;
			.user_name{
				color: #000;
				font-weight: 600;
				font-size: 30rpx;
				margin: 5rpx 0;
			}
			.user_time{
				font-size: 24rpx;
				color: #999;
			}
		}
	}
	.pic_info{
		image{
			padding: 10rpx 0;
		}
		.good_collect{
			display: flex;
			justify-content: space-between;
			padding: 10rpx 80rpx;
			border-bottom: 5rpx solid #eee;
			.good{}
			.collect{}
		}
	}
	
	
	.download{
		height: 100rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		.download_btn{
			width: 96%;
			height: 85%;
			background-color: $theme-color;
			color: #FFFFFF;
			font-size: 35rpx;
			font-weight: 600;
			display: flex;
			align-items: center;
			justify-content: center;
		}
	}
</style>
