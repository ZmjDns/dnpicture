<template>
	<scroll-view class="recommend_view" @scrolltolower="handleScrollToLower" scroll-y="true" v-if="recommend.length > 0">
		<!-- 推荐开始 -->
		<view class="recommend_wrap">
			<view class="recommend_item" v-for="item in recommend" :key="item.id" @click="navToRecDetail(item.id)">
				<image :src="item.thumb" mode="widthFix"></image>
			</view>
		</view>
		<!-- 推荐结束 -->
		
		<!-- 月份开始 -->
		<view class="month_wrap">
			<view class="month_title">
				<view class="month_title_info">
					<view class="month_info">
						<text>{{months.DD}}/</text>
						{{months.MM}} 月
					</view>
					<view class="month_text">{{months.title}}</view>
				</view>
				<view class="month_title_more">更多 ></view>
			</view>
			<view class="montn_content">
				<view class="month_item" v-for="(item,index) in months.items" :key="item.id">
					<go-detail :list="months.items" :index="index">
						<image :src="handleUrl(item)" mode="aspectFill"></image>
					</go-detail>
				</view>
			</view>
		</view>
		<!-- 月份结束 -->
		
		<!-- 热门 -->
		<view class="hots_wrap">
			<view class="hots_title">
				<text>热门</text>
			</view>
			<view class="hots_content">
				<view class="hots_item" v-for="(item,index) in hots" :key="item.id">
					<go-detail :list="hots" :index="index">
						<image :src="item.thumb" mode="widthFix"></image>
					</go-detail>
				</view>
			</view>
		</view>
		<!-- 热门 -->
	</scroll-view>
</template>

<script>
	import goDetail from '@/components/goDetail/goDetail.vue'
	export default{
		data(){
			return{
				recommend:[],
				months:{},
				hots:[],
				params:{
					limit:10,
					order:'hot',
					skip:0
				},
				hasMore:true
			}
		},
		components:{
			goDetail
		},
		mounted() {
			uni.setNavigationBarTitle({
				title:'首页'
			})
			this.getRequestData()
		},
		methods:{
			getRequestData(){
				this.$request({
					url:'/image/v3/homepage/vertical',
					data:this.params
				}).then(result=>{
					console.log(result)
					if(result.res.vertical.length === 0){
						this.hasMore = false
						return
					}
					
					if(this.recommend.length === 0){
						this.recommend = result.res.homepage[1].items
						const montnResp = result.res.homepage[2]
						this.changeTime(montnResp)
					}
					this.hots = [...this.hots ,...result.res.vertical]
				})
			},
			changeTime(resp){
				const date = new Date(resp.stime)
				this.months = resp
				this.months.MM = date.getMonth().toString().padStart(2,0)
				this.months.DD = date.getDay().toString().padStart(2,0)
			},
			handleUrl(item){
				var thumb = item.thumb
				var rule = item.rule
				//rule = rule.substring(0,rule.indexOf('$')) + '360'
				rule = rule.replace('$<Height>','360')
				var url = thumb + rule
				console.log('imageUrl',url)
				return url
			},
			handleScrollToLower(){
				console.log('触底了.......')
				if(this.hasMore){
					this.params.skip += this.params.limit
					this.getRequestData()
				}else{
					uni.showToast({
						title:'没有更多数据了',
						icon:'none'
					})
				}
			},
			navToRecDetail(id){
				console.log('进入方法.......')
				uni.navigateTo({
					url:'/pages/recommendDetail/recommendDetail'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.recommend_view{
		height: calc(100vh - 36px);
	}
	.recommend_wrap{
		display: flex;
		flex-wrap: wrap;
		.recommend_item{
			width: 50%;
			border: 5rpx solid #FFFFFF;
		}
	}
	.month_wrap{
		.month_title{
			display: flex;
			justify-content: space-between;
			padding: 20rpx;
			line-height: 60rpx;
			.month_title_info{
				display: flex;
				font-size: 30rpx;
				font-weight: 600;
				.month_info{
					color: $theme-color;
					text{
						font-size: 36rpx;
					}
				}
				.month_text{
					font-size: 34rpx;
					color: #666666;
					margin-left: 30rpx;
				}
			}
			.month_title_more{
				font-size: 24rpx;
				color: $theme-color;
			}
		}
		.montn_content{
			display: flex;
			flex-wrap: wrap;
			.month_item{
				width: 33.33%;
				border: 5rpx solid #FFFFFF;
			}
		}
	}
	.hots_wrap{
		.hots_title{
			padding: 20rpx;
			text{
				padding-left: 20rpx;
				border-left: 20rpx solid $theme-color;
				font-size: 34rpx;
				font-weight: 600;
			}
		}
		.hots_content{
			display: flex;
			flex-wrap: wrap;
			.hots_item{
				width: 33.33%;
				border: 5px solid #FFFFFF;
				image{
					
				}
			}
		}
	}
</style>