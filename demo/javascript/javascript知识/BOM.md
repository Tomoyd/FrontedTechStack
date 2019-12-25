__BOM纳入HTML5的规范中__

## window对象

> 表示浏览器的一个实例,
>
> 在浏览器中,window具有双重角色:
>
> 1. `javascript`访问浏览器窗口的接口
> 2. `ECMAScript`规定的Global对象

#### 全局作用域

所有在全局作用声明的变量函数都会变成window对象的属性和方法;

- 定义的全局变量,不能够通过delete删除

- 在window对象上直接定义的属性是可以通过delete删除的
- 访问未声明的变量会抛出错误,查询window对象,可以指定某个未声明的变量是否存在

#### 窗口关系及框架

> 如果页面中包含框架,每个框架都有自己的window对象,并且保存在frames集合中,
>
> 在frames集合中可以通过数值索引或者框架名称来访问相应的window对象,每个window对象都有name属性
>
> top对象始终指向最外层(最高层)的框架.也就是浏览器窗口,
>
> parent对象始终指向当前框架的直接上级框架,没有框架时,parent等于top
>
> 最高层代码除非是通过window.open打开的否则window对象的name属性不包含任何值

#### 窗口位置

窗口左上边信息:screenLeft和screenTop或者screenX和screenY

- IE和Opera中:screenLeft和ScreenTop保存的是从屏幕左边到上边到由window对象表示的页面可见区域的距离,受外边距影响
- Firefox,Safari和Chrome中,screenY和screenTop保存是整个浏览器窗口相对屏幕的坐标值,即使因外边距发生偏移的情况下也会返回相同的值,不受外边距影响

无法跨浏览器获取精准坐标值,可以用过moveTo和moveBy移动位置

这两个方法都接受两个参数,moveTo表示定位到某一坐标,moveBy是在水平和垂直方向向上移动的距离

#### 窗口大小

- innerWidth和innerHeight:
- Opera中,返回页面视图区的大小,减去边框值

返回视口的大小

- outerWidth和outerHeight:

  IE,Safari和Firefox中返回浏览器窗口本身的大小

  Chrome中返回视口的大小

  Opera中,返回页面视图容器的大小

- 标准模式下

  document.documentElement.clientWidth

  和

  document.documentElement.clientHeight

  保存了视口信息]

  IE6中在混杂模式下通过document.body.clientWidth和

  document.body.clientHeight获取相同的信息

  所有可以获取页面视口的大小

  文档模式:document.compatMode获取

- resizeTo和resizeBy可以调整浏览器窗口的大小

  不适用与框架,且可能被浏览器禁用

#### 导航和打开浏览器

`window.open`:四个参数

1. 要加载的URL

2. 窗口目标

3. 一个特性字符串:

   逗号分割符分隔的设置只字符串,如"height=400,width=400,top=10,left=10,resizable=yes"

   如果没有设置此参数,默认为全部设置,

   如果第二个参数并不是已经存在的窗口和框架,那么会根据这个参数进行创建新窗口或者新标签页,

   如果不是新窗口,忽略这个参数

4. 一个表示新页面是否取代浏览器历史记录中当前加载页面的布尔值

必须使用第一个参数,最后一个参数只有在不打开新窗口时使用

- 会返回一个指向新窗口的引用,调用close(),moveTo,resizeTo等方法
- 不过仅适用于window.open打开的才能close()关闭
- 弹出的窗口也可以调用top.close()关闭

`安全限制`

广告商可能会无线的弹出广告;对弹出窗口的限制

`弹出窗口屏蔽程序`

大多数浏览器都内存弹出窗口屏蔽程序,检查window.open() 返回值是否为null即可确定是否被屏蔽,有时屏蔽,可能使用open会抛出一个错误

用try-catch来确定

#### 间歇调用和超时调用

- 超时调用:setTimeout(),clearTimeout()
- 间歇调用:setInterval(),clearInterval

#### 系统对话框

> 和显示的网页没有关系,也不包含HTML,他们的外观由操作系统或浏览器设置决定而不是css决定,打开之后代码会停止运行,关闭后恢复运行

- alert()

- confirm()

  点击确定返回true,点击取消返回false

- prompt()

  弹出输入框点击Ok返回输入的值

  否则返回null

- print():打印对话框

- find():查找对话框

## location对象

> 既是window对象的属性,也是document对象的属性
>
> 当前文档的信息,将URL解析为独立片段

#### 属性:

- hash:hash值即#号后跟0个或多个字符
- host:服务器名和端口(如果有)
- hostname:服务器名
- href:完整的URL
- pathname:URL的目录和文件名
- port:端口
- protocol:协议
- search:查询字符串,以?开头

#### 位置操作:

使用assign()方法,传递一个URL浏览器就会立即打开新的URL,并在历史记录中生成一条记录;

下面两条与直接调用assign一样

``` javascript
window.location = "http://www.wrox.com";
location.href = "http://www.wrox.com";
```

每次修改location的属性(hash除外),页面都会以新的URL重新加载

且浏览器的历史记录会生成一天新的记录

要禁用这种行为可以使用replace()只接受一个URL参数

reload()方法:重新加载页面,如果不传递参数以最有效的方式重新加载.会到浏览器缓存中重新加载页面,传递true值,从服务器中重新加载

## navigator对象

浏览器的信息:

#### 属性:

- appName
- appVersion
- appMinorVersion
- appCodeName
- online
- cookieEnabled
- .....

等

#### 检测插件

1. 对于非IE浏览器,可以通过使用plugins数组来达到这个目的:

   每一项都包含下列属性:

   name:插件的名字

   description:插件的描述

   filename:插件的文件名

   length:插件所处理的MIME类型数量

2. 对于IE
   - 使用专有的ActiveXObject类型,并创建一个特定的插件实例
   - IE是以COM对象方式实现插件,使用唯一标识符来表示,检查特定插件必须知道器COM标识符

```javascript
//检测 IE 中的插件
function hasIEPlugin(name){
try {
        new ActiveXObject(name);
        return true;
    } catch (ex){
    	return false;
    }
}
```

#### 注册处理程序

1. registerContentHandler():

   > 接受三个参数

   - 要处理的MIME类型
   - 可以处理该MIME类型的页面的URL
   - 应用程序的名称

2. registerProtocolHandler()

   > 接受三个参数

   - 要处理的协议
   - 可以处理该协议的页面的URL
   - 应用程序的名称

   这两个方法可以让一个站点指明它可以处理特定类型的信息

## screen对象

>  screen对象基本上只是用来表明客户端的能力

包括浏览器窗口外部的显示器信息如像素的宽度和高度等

## history对象

> 保存用户上网的历史记录,是window的属性,因此每个浏览器窗口,每个标签页乃至每个框架都有自己的history对象和特定的window对象相关联

#### 方法

1. go():在用户记录中任意跳转,可以向前也可以向后,接受一个参数
   - 如果参数是数值,负数向后,整数向前
   - 如果是字符串参数,记录中最近的与该字符串匹配的位置
2. 可以使用back()和forward()来代替go()

#### 属性:

length属性

