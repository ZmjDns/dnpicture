<template>
	<view>
		<view class="album_bg">
			<view class="cover_img">
				<image :src="album.cover" mode="widthFix"></image>
				<view class="album_info">
					<view class="album_name">{{album.name}}</view>
					<view class="album_btn">关注专辑</view>
				</view>
			</view>
		</view>
		
		<!-- 专辑作者 -->
		<view class="album_author">
			<view class="album_author_info">
				<image :src="album.user.avatar" mode="widthFix"></image>
				<text>{{album.user.name}}</text>
			</view>
			<view class="album_author_desc">
				<text>{{album.desc}}</text>
			</view>
		</view>
		<!-- 专辑作者 -->
		
		<!-- 图片列表 -->
		<view class="album_list">
			<view class="album_list_item" v-for="(item,index) in wallpaper" :key="item.id">
				<go-detail :list="wallpaper" :index="index">
					<image :src="item.thumb + item.rule.replace('$<Height>',360)" mode="aspectFill"></image>
				</go-detail>
			</view>
		</view>
		<!-- 图片列表 -->
	</view>
</template>

<script>
	import goDetail from '@/components/goDetail/goDetail.vue'
	export default {
		data() {
			return {
				album:{},
				wallpaper:[],
				pageId:'',
				params:{
					limit:20,
					order:'new',
					skip:0,
					first:1  //值为1是，表示第一次请求，值为0时，表示不是第一次请求
				},
				hasMore:true
			}
		},
		components:{
			goDetail
		},
		onLoad(options) {
			this.pageId = options.id
			console.log('pageId',this.pageId)
			this.requesAlbumData()
		},
		methods: {
			requesAlbumData(){
				this.$request({
					url:'/image/v1/wallpaper/album/' + this.pageId + '/wallpaper',
					data:this.params
				}).then(result=>{
					console.log('AlbumDetail',result)
					
					if(Object.keys(this.album).length === 0){
						this.album = result.res.album
					}
					
					if(result.res.wallpaper.length === 0){
						this.hasMore = false
						uni.showToast({
							title:'没有更多数据了',
							icon:'none'
						})
						return;
					}
					
					this.wallpaper = [...this.wallpaper,...result.res.wallpaper]
				})
			}
		},
		onReachBottom() {
			console.log('触底了.........')
			if(this.hasMore){
				this.params.first = 0
				this.params.skip += this.params.limit
				this.requesAlbumData()
			}else{
				uni.showToast({
					title:'没有更多数据了',
					icon:'none'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.album_bg{
		position: relative;
		.cover_img{
			image{
				
			}
			.album_info{
				position: absolute;
				width: 100%;
				left: 0;
				bottom: 0;
				display: flex;
				justify-content: space-between;
				height: 80rpx;
				align-items: center;
				color: #FFFFFF;
				padding: 0 15rpx;
				.album_name{
					font-size: 40rpx;
				}
				.album_btn{
					background-color: $theme-color;
					width: 152rpx;
					height: 60rpx;
					display: flex;
					justify-content: center;
					align-items: center;
					border-radius: 10rpx;
				}
			}
		}
	}
	
	.album_author{
		.album_author_info{
			padding: 10rpx 0;
			display: flex;
			image{
				width: 50rpx;
			}
			text{
				color: #000;
				margin-left: 20rpx;
				line-height: 50rpx;
			}
		}
		.album_author_desc{
			font-size: 30rpx;
		}
	}

	.album_list{
		display: flex;
		flex-wrap: wrap;
		.album_list_item{
			width: 33.33%;
			border: 3rpx solid #FFFFFF;
			image{
				height: 160rpx;
			}
		}
	}
</style>
