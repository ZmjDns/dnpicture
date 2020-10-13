<template>
	<view 
		@touchstart="handleTouchStart"
		@touchend="handleTouchEnd">
		触摸事件
	</view>
</template>

<script>
	export default {
		data() {
			return {
				startX:0,
				startY:0,
				startTime:0
			}
		},
		methods: {
			handleTouchStart(e){
				// console.log("按下");
				// console.log('按下X',e.changedTouches[0].clientX);
				// console.log('按下Y',e.changedTouches[0].clientY);
				this.startTime = Date.now();
				this.startX = e.changedTouches[0].clientX;
				this.startY = e.changedTouches[0].clientY;
			},
			handleTouchEnd(e){
				// console.log("抬起");
				// console.log('抬起X',e.changedTouches[0].clientX);
				// console.log('抬起Y',e.changedTouches[0].clientX);
				const endTime = Date.now();
				const endX = e.changedTouches[0].clientX;
				const endY = e.changedTouches[0].clientY;
				
				if((endTime - this.startTime) > 2000){
					return;
				}
				
				let direction = "";
				if(Math.abs(endX - this.startX) > 10){
					direction = endX - this.startX > 0 ? "right" : "left";
				}else{
					return;
				}
				
				//合法的滑动
				console.log(direction);
				
			}
		}
	}
</script>

<style>
	view{
		width: 100%;
		height: 500rpx;
		background-color: #007AFF;
	}
</style>
