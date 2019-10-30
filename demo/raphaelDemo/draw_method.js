let attr = {
    "fill": "#97d6f5",
    "stroke": "#eee",
    "stroke-width": 1,
    "stroke-linejoin": "round"
};
function drawPath(R){
    let url="./path.json"
    let request =new XMLHttpRequest()
    request.open("get",url)
    request.send(null)
    request.onload=(res)=>{
    }
    return {
        name:"河南",
        path:R.path(HUAI_YANG).attr(attr)
    }
}