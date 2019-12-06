// canvas处理程图片并传到后台导出
const exportURL=()=>{
    let img=renderer.domElement.getContext("experimental-webgl", {preserveDrawingBuffer: true});
    let url=img.canvas.toDataURL("image/png")

    let b64=window.atob(url.substring(22))
    let bLength=b64.length
    const arr=[]
    for(let i=0;i<bLength;i++){
        arr.push(b64.charCodeAt(i))
    }
    const blob=new Blob([new Uint8Array(arr),{type:"image/png"}])
    let param=new FormData()
    param.append("b64",blob)
    param.append("fileDir",document.getElementById("filepath").value)
    // axios.post("/api/upload/img",param,{headers: { 'Content-Type': 'multipart/form-data;charset=utf-8' }})
}