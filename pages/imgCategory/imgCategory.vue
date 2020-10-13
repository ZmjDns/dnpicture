<template>
	<view class="category">
		<view class="cate_tab">
			<uni-segmented-control :current="current" :values="items.map(it=>it.title)"
			@clickItem="onClickItem" style-type="text" active-color="#d4237a"></uni-segmented-control>
			
		</view>
		
		<scroll-view @scrolltolower="handleScrollLower" scroll-y="true" class="scroll">
			<view class="cate_content">
				<view class="cate_item" v-for="item in images" :key="item.id">
					<image :src="item.thumb" mode="widthFix"></image>
				</view>
			</view>
		</scroll-view>
		
		
	</view>
</template>

<script>
	import uniSegmentedControl from "@/components/uni-segmented-control/uni-segmented-control.vue"
	export default {
		components: {
			uniSegmentedControl
		},
		data() {
			return {
				items: [{
						title:'最新',
						order:'new'
					},
					{
						title:'热门',
						order:'hot'
					}
				],
				current: 0,
				id:0,
				params:{
					limit:20,
					skip:0,
					order:'new'
				},
				images:[],
				hasMore:true
			}
		},
		onLoad(options) {
			console.log(options);
			this.id = options.id;
			this.requestData()
		},
		methods: {
			onClickItem(e) {
				if (this.current !== e.currentIndex) {
					this.current = e.currentIndex;
				}else{
					return;
				}
				this.params.skip = 0;
				this.hasMore = true;
				this.params.order = this.items[e.currentIndex].order;
				this.images = [];
				this.requestData();
			},
			requestData(){
				uni.showLoading({
					title:'正在获取数据...'
				});
				this.$request({
					url:'/image/v1/vertical/category/' + this.id + '/vertical',
					data:this.params
				}).then(result=>{
					uni.hideLoading();
					console.log('newData:',result);
					if(result.res.vertical.length === 0){
						this.hasMore = false;
						uni.showToast({
							title:'没有更多数据了',
							icon:'none'
						});
						return;
					}else{
						this.images = [...this.images,...result.res.vertical];
					}
				});
			},
			handleScrollLower(){
				if(this.hasMore){
					this.params.skip += this.params.limit;
					this.requestData();
				}else{
					uni.showToast({
						title:'没有更多数据了',
						icon:'none'
					});
				}
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	.category{
		height: calc(100vh - 36px);
	}
	
	.cate_tab{
		width: 60%;
		margin: 0 auto;
	}
	.scroll{
		height: calc(100vh - 36px);
		.cate_content{
			display: flex;
			flex-wrap: wrap;
			.cate_item{
				width: 33.33%;
				border: 5rpx solid #FFFFFF;
				image{
					
				}
			}
		}
	}
</style>
