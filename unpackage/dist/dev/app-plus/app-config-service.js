
var isReady=false;var onReadyCallbacks=[];
var isServiceReady=false;var onServiceReadyCallbacks=[];
var __uniConfig = {"pages":["pages/index/index","pages/landscreen/landscreen","pages/cutevideo/cutevideo","pages/search/search","pages/mine/mine","pages/albumdetail/albumdetail","pages/recommendDetail/recommendDetail","pages/imgDetail/imgDetail","pages/leranTouchEvent/leranTouchEvent","pages/imgCategory/imgCategory","pages/videoPage/videoPage"],"window":{"navigationBarTextStyle":"white","navigationBarTitleText":"懂你找图","navigationBarBackgroundColor":"#000000","backgroundColor":"#F8F8F8"},"tabBar":{"list":[{"text":"首页","pagePath":"pages/index/index","iconPath":"static/icon/_home.png","selectedIconPath":"static/icon/home.png"},{"text":"横屏","pagePath":"pages/landscreen/landscreen","iconPath":"static/icon/_img.png","selectedIconPath":"static/icon/img.png"},{"text":"精美视频","pagePath":"pages/cutevideo/cutevideo","iconPath":"static/icon/_videocamera.png","selectedIconPath":"static/icon/videocamera.png"},{"text":"搜索","pagePath":"pages/search/search","iconPath":"static/icon/_search.png","selectedIconPath":"static/icon/search.png"},{"text":"我的","pagePath":"pages/mine/mine","iconPath":"static/icon/_my.png","selectedIconPath":"static/icon/my.png"}]},"nvueCompiler":"uni-app","renderer":"auto","splashscreen":{"alwaysShowBeforeRender":true,"autoclose":false},"appname":"dnpicture","compilerVersion":"2.8.13","entryPagePath":"pages/cutevideo/cutevideo","entryPageQuery":"","networkTimeout":{"request":60000,"connectSocket":60000,"uploadFile":60000,"downloadFile":60000}};
var __uniRoutes = [{"path":"/pages/index/index","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"懂你找图"}},{"path":"/pages/landscreen/landscreen","meta":{"isQuit":true,"isTabBar":true},"window":{}},{"path":"/pages/cutevideo/cutevideo","meta":{"isQuit":true,"isTabBar":true},"window":{}},{"path":"/pages/search/search","meta":{"isQuit":true,"isTabBar":true},"window":{}},{"path":"/pages/mine/mine","meta":{"isQuit":true,"isTabBar":true},"window":{}},{"path":"/pages/albumdetail/albumdetail","meta":{},"window":{"navigationBarTitleText":"专辑详情"}},{"path":"/pages/recommendDetail/recommendDetail","meta":{},"window":{}},{"path":"/pages/imgDetail/imgDetail","meta":{},"window":{}},{"path":"/pages/leranTouchEvent/leranTouchEvent","meta":{},"window":{}},{"path":"/pages/imgCategory/imgCategory","meta":{},"window":{}},{"path":"/pages/videoPage/videoPage","meta":{},"window":{}}];
__uniConfig.onReady=function(callback){if(__uniConfig.ready){callback()}else{onReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"ready",{get:function(){return isReady},set:function(val){isReady=val;if(!isReady){return}const callbacks=onReadyCallbacks.slice(0);onReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
__uniConfig.onServiceReady=function(callback){if(__uniConfig.serviceReady){callback()}else{onServiceReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"serviceReady",{get:function(){return isServiceReady},set:function(val){isServiceReady=val;if(!isServiceReady){return}const callbacks=onServiceReadyCallbacks.slice(0);onServiceReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
service.register("uni-app-config",{create(a,b,c){if(!__uniConfig.viewport){var d=b.weex.config.env.scale,e=b.weex.config.env.deviceWidth,f=Math.ceil(e/d);Object.assign(__uniConfig,{viewport:f,defaultFontSize:Math.round(f/20)})}return{instance:{__uniConfig:__uniConfig,__uniRoutes:__uniRoutes,global:void 0,window:void 0,document:void 0,frames:void 0,self:void 0,location:void 0,navigator:void 0,localStorage:void 0,history:void 0,Caches:void 0,screen:void 0,alert:void 0,confirm:void 0,prompt:void 0,fetch:void 0,XMLHttpRequest:void 0,WebSocket:void 0,webkit:void 0,print:void 0}}}});