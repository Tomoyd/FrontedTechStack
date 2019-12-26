> <canvas>
>
> - 负责子页面设定一个区域,在这个区域中绘制图形
> - `2D`上下文:`getContext('2d')`
> - `3D`上下文:`WebGL`

## 基本用法

- 必须设置大小,指定宽高
- 绘制图形需要获得画布的绘图上下文的引用: 
  - 方法`getContext("2d")`
- 可以在开始结束标签之间写入后备信息内容
- 使用`toDataURL()`可以导出图像,接受参数为MIME类型格式如:"image/`png`"

## 2D上下文

> 使用上下文提供的方法可以进行绘制简单的2D图形
>
> 坐标开始与<canvas>元素的左上角,原点坐标为(0,0)

#### 填充与描边

> - 填充与描边是`2D`上下文两种基本操作
>
> - 操作结果取决于两个属性:
>
>   - `fillStyle`
>
>   - `strokeStyle`
>
>     属性值可以是字符串渐变对象和模式对象,默认值是'#000000'
>
> 

#### 绘制矩形

> 矩形是唯一一种可以直接在`2D`上下汶上绘制的图形
>
> 相关方法:
>
> - `fillRect()`:填充矩形
> - `strokeRect()`:描边
> - `clearRect()`:本质上是变透明
>
> - 这三个方法都接受四个参数,分别为,x,y,宽,,高

<script>
    let context2D=document.getElementById("drawing").getContext("2d")
    context2D.fillStyle='#FF0'
    context2D.fillRect(100,50,30,30)
    context2D.lineWidth=5
    context2D.strokeStyle='#F00'
    context2D.lineCap="round"
    context2D.lineJoin="bevel"
    context2D.strokeRect(100,50,30,30)
</script>

#### 绘制路径

> 绘制路径必须首先告诉开始绘制路径,
>
> - `beginPath方法:`
>
>   其他方法:
>
>   - `arc(x, y, radius, startAngle, endAngle, counterclockwise)`
>
>   - `arcTo(x1, y1, x2, y2, radius)`
>
>   - `bezierCurveTo(c1x, c1y, c2x, c2y, x, y)`
>
>   - `lineTo(x, y)`
>
>   - `moveTo(x, y)`
>
>   - `quadraticCurveTo(cx, cy, x, y)`
>
>   - `rect(x, y, width, height)`
>
>     路径绘制完成后可以
>
>     `closePath`
>
>     fill
>
>     stroke
>
>     clip

#### 绘制文本

> `fillText`
>
> `strokeText`
>
> 这两个方法都接受四个参数:
>
> - 要绘制的文本
> - x坐标
> - y坐标
> - 可选的最大像素宽度
>
> 要以下面三个上下文属性为基础:
>
> - font:文本的样式,大小及字体	
> - `textAlign`文本对齐方式,可能值,start,end,left right 和 center
> - `textBaseLine`:表示文本的基线,可能有,top hanging,middle,alphabetic,ideographic,bottom

<script>
    context2D.beginPath()
    context2D.arc(100,100,99,0,2*Math.PI,false)
    context2D.moveTo(194,100)
    context2D.arc(100,100,94,0,2*Math.PI,false)
    context2D.moveTo(100,100)
    context2D.lineTo(35,100)
    context2D.moveTo(100,100)
    context2D.lineTo(100,15)
    context2D.isPointInPath(88,90) // 画布关闭之前判断是否在某条路径上
    context2D.stroke()
    context2D.font="bold 14px Arial"
    context2D.textAlign="center"
    context2D.textBaseline="middle"
    context2D.fillText("12",100,20)

</script>

####  变换

> rotate():
>
> scale()
>
> translate()
>
> transform()
>
> `setTransform()`

#### 绘制图像

> `drawImage(image,x,y,width,height)`
>
> `drawImage(image,x,y,width,height,x1,y1,width1,height1)`

#### 阴影

> `shadowColor` :用 `CSS` 颜色格式表示的阴影颜色,默认为黑色
>
> `shadowOffsetX` :形状或路径 x 轴方向的阴影偏移量,默认为 0
>  `shadowOffsetY` :形状或路径 y 轴方向的阴影偏移量,默认为 0
> `shadowBlur` :模糊的像素数,默认 0,即不模糊。
>
> 

#### 渐变

> `CanvasGradient`的实例来表表示
>
> 线性渐变:`createLinearGradient()`,接受四个参数,起点和终点
>
> 该实例有以下方法:
>
> `addColorStop()`:接受两个参数,色标位置和 `CSS` 颜色值。色标位置是一个 0(开始的颜色)到 1(结束的颜色)之间的数字

> 径向渐变:`createRadialGradient()`,接受六个参数,两个圆形

#### 模式

> 其实就是重复的图像
>
> `createPattern()`:接受两个参数,`img`元素,video或者canvas元素和如何重复的字符串

#### 使用图像数据

> `getImageData()`:接收
> 4 个参数:要取得其数据的画面区域的 x 和 y 坐标以及该区域的像素宽度和高度

#### 合成

> `globalAlpha`:是一个介于 0 和 1 之间的值(包括 0 和 1)
>
> `globalCompositionOperation`:表示后绘制的图形怎样与先绘制的图形结合