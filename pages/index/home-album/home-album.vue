<template>
	<scroll-view class="album_view" @scrolltolower="handleLower" scroll-y="true" v-if="binners.length > 0">
		
		<view class="binner_wrap">
			<swiper autoplay indicator-dots circular="">
				<swiper-item v-for="item in binners" :key="item.id">
					<image :src="item.thumb" mode="widthFix"></image>
				</swiper-item>
			</swiper>
		</view>
		
		<view class="album_wrap">
			<view class="album_list">
				<view class="album_item" v-for="item in albums" :key="item.id" @click="navToDetail(item.id)">
					<image class="item_img" :src="item.cover" mode="aspectFill"></image>
					<view class="item_info">
						<view class="item_title">{{item.name}}</view>
						<view class="item_desc">{{item.desc}}</view>
						<view class="item_care">
							<view class="item_btn">+关注</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		
	</scroll-view>
</template>

<script>
	export default{
		data(){
			return{
				binners:[],
				albums:[],
				params:{
					limit:20,
					order:'new',
					skip:0
				},
				hasMore:true
			}
		},
		mounted() {
			uni.setNavigationBarTitle({
				title:'专辑'
			})
			this.getAlbumData()
		},
		methods:{
			getAlbumData(){
				this.$request({
					url:'/image/v1/wallpaper/album',
					data:this.params
				}).then(result=>{
					console.log('result',result)
					if(this.binners.length === 0){
						this.binners = result.res.banner
					}
					
					if(result.res.album.length === 0){
						this.hasMore = false
						return
					}
					this.albums = [...this.albums,...result.res.album]
				})
			},
			handleLower(){
				console.log('触底了.....')
				if(this.hasMore){
					this.params.skip += this.params.limit
					this.getAlbumData()
				}else{
					uni.showToast({
						title:'没有更多数据了',
						icon:'none'
					})
				}
			},
			navToDetail(id){
				uni.navigateTo({
					url:'/pages/albumdetail/albumdetail?id=' + id
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.album_view{
		height: calc(100vh - 36px);
	}
	.binner_wrap{
		swiper{
			height: calc(750rpx / 2.3);
			image{
				height: 100%;
			}
		}
	}
	.album_wrap{
		.album_list{
			padding: 10rpx;
			.album_item{
				padding: 10rpx 0;
				display: flex;
				border-bottom: 1px solid #eee;
				.item_img{
					flex: 1;
					padding: 10rpx;
					width: 200rpx;
					height: 200rpx;
					
				}
				.item_info{
					flex: 3;
					padding: 0 10rpx;
					overflow: hidden;		//超出盒子部分截取字符
					.item_title{
						font-size: 30rpx;
						color: #000000;
						padding: 10rpx 0;
					}
					.item_desc{
						padding: 10rpx 0;
						font-size: 24rpx;
						
						text-overflow: ellipsis;//这三行代码与父类中的overflow: hidden;共同形成图片右侧的盒子内信息效果
						overflow: hidden;
						white-space: nowrap;
					}
					.item_care{
						padding: 10rpx;
						display: flex;
						justify-content: flex-end;
						.item_btn{
							color: $theme-color;
							border: 1px solid $theme-color;
							padding: 10rpx;
						}
					}
				}
				
			}
		}
	}
	
</style>
