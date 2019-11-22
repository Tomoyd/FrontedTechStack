// 全屏核心方法为requestFullScreen
// 浏览器兼容
const requestFullScreen=()=>{
    let element=document.documentElement
    return element.requestFullscreen||element.webkitRequestFullScreen||element.mozRequestFullScreen||element.msRequestFullScreen
}
const exitFullScreen=()=>{
    return document.exitFullscreen||document.mozCancelFullScreen||document.webkitCancelFullScreen||document.msExitFullscreen
}
const doFullScreen=(e)=>{
    let openScreen=requestFullScreen()
    let shutScreen=exitFullScreen()

    let isFullScreen=(document.fullscreenElement&&document.fullscreenElement!==null)||!!document.webkitIsFullScreen||!!document.mozFullScreen
    if(isFullScreen){
        shutScreen.call(document)
        e.target.innerText="全屏"
        // console.log(!!document.fullscreenElement,document.webkitIsFullScreen,document.mozFullScreen)
    }else{
        openScreen.call(e.target)
        e.target.innerText="退出全屏"
    }




}