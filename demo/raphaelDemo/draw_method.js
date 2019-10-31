let attr = {
    "fill": "#97d6f5",
    "stroke": "#eee",
    "stroke-width": 1,
    "stroke-linejoin": "round"
};
function drawPath(R,pathData){
    return R.path(pathData.path).attr(attr)
}

let addTextAndEvent=(path,name,r,color)=>{
    let text=null
    // path.color=Raphael.getColor(0.9);
    let centerX=path.getBBox().x+(path.getBBox().width/2)
    let centerY=path.getBBox().y+(path.getBBox().height/2)
    text=r.text(centerX,centerY,name).attr({fill:"#000",fontSize:"30px",cursor:"pointer"})
    text.node.onclick=(e)=>{
        window.location.href="https://map.baidu.com/search?querytype=s&da_src=shareurl&wd="+name
    }
    path[0].onmouseover=()=>{
        path.animate({fill:color,stroke:'#eee'},500)
        r.safari()
    }
    path[0].onmouseout=()=>{
        path.animate({fill:"#97d6f5",stroke:'#eee'},500)
        // text.toFront()
        r.safari()
    }
    return text
}