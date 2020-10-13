<template>
	<view>
		<view class="video_tap">
			<view class="title_inner">
				<uni-segmented-control :current="current" :values="items.map(it=>it.title)" 
					@clickItem="onClickItem" style-type="text" active-color="#d4237a">
				</uni-segmented-control>
				
				<view class="iconfont iconsearch"></view>
			</view>
		</view>
		
		<view class="video_content">
			<view v-if="current < 4">
				<video-main :urlobj="{url : items[current].url,params : items[current].params}"></video-main>
			</view>
			<view v-if="current === 4">
				<video-category :url="items[current].url"></video-category>
			</view>
		</view>
		
	</view>
</template>

<script>
	import uniSegmentedControl from "@/components/uni-segmented-control/uni-segmented-control.vue"
	import videoMain from "./videoMain/videoMain.vue"
	import videoCategory from "./videoCategory/videoCategory.vue"
	export default {
		components: {
			uniSegmentedControl,
			videoMain,
			videoCategory
		},
		data() {
			return {
				items: [
					{title:'推荐',url:'/videoimg/v1/videowp/featured',params:{limit:20,skip:0,order:'hot'}},
					{title:'娱乐',url:'/videoimg/v1/videowp/category/59b25abbe7bce76bc834198a',params:{limit:20,skip:0,order:'new'}},
					{title:'最新',url:'/videoimg/v1/videowp/videowp',params:{limit:20,skip:0,order:'new'}},
					{title:'热门',url:'/videoimg/v1/videowp/videowp',params:{limit:20,skip:0,order:'hot'}},
					{title:'分类',url:'/videoimg/v1/videowp/category',params:{}}
				],
				current: 4
			}
		},
		methods: {
			onClickItem(e) {
				if (this.current !== e.currentIndex) {
					this.current = e.currentIndex;
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.video_tap{
		position: relative;
		.title_inner{
			width: 70%;
			margin: 0 auto;
			.iconsearch{
				position: absolute;
				top: 50%;
				transform:translateY(-50%);
				right: 8%;
			}
		}
	}
</style>
