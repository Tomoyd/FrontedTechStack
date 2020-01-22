## `XMLHttpRequest`

> 无需卸载页面也可以取得新的数据
>
> 1. 为向服务器发送请求和解析服务器响应提供了流畅的接口
> 2. 能够异步方式从服务器获取更多信息，不必刷新页面
>    - [ ] 熟练使用

- IE7之前的中可能会遇到几种三种版本的`XHR`的对象
  - MSXML2.XMLHttp
  - MSXML2.XMLHttp.3.0
  - MSXML2.XMLHttp.6.0

```javascript
function createMSXHR(){
    if（type of arguments.callee.activeXString!=='string'){
        let versions=["MSXML2.XMLHttp","MSXML2.XMLHttp.3.0","MSXML.XMLHttp.6.0"]
        for(let i=0,len=0;i<len;i++){
            try{
                new ActiveXObject(verision[i])
                arguments.callee.activeXString=version[i]
            }catch(ex){
                //
            }
        }
    }
    return new ActiveXObject(arguments.callee.activeXString)
}
```

- `IE7`之后及其他浏览器

  `new XMLHttpRequest()`

  兼容版本

  ```javascript
  function createXHR(){
      if(typeof XMLHttpRequest!=='undefined'){
          return new XMLHttpRequest()
      }else if(typeof ActiveXObject !=='undefined'){
          return createMS()
      }else{
          throw new Error("No XHR object available")
      }
  }
  ```

  

## `XHR`的用法

创建`XMLHttpRequest`的实例之后，使用该对象

1. 首先调用open()方法,它并不会真正的发送请求，而是启动一个请求以备发送：接收三个参数

   - 请求的类型

   - 请求的URL

   - 是否异步

     `xhr.open(type,url,isAsync)`

   > 只能像同一个域中相同端口和协议的URL发送请求，否则就会引发同源安全错误

2. `setRequestHeader` 方法

   > 设置请求头
   >
   > 接受两个参数
   >
   > 1. 头部字段的名称
   > 2. 头部字段的值

   必须在open之后，send之前进行调用

   `getResponseHeader()传如一个字段名称可以获取响应的响应同步信息`

   `getAllResponseHeaders()获取所有的头部信息的字符串`

3. send方法：

   > 接受一个参数，要通过请求主体发送的数据，不需要发送数据必须传null值，
   >
   > 调用之后，请求才真正的发送

4. 响应：

   >收到响应后，相关数据会填充到`xhr`对象的属性中

   - responseText:作为响应主体被返回的文本
   - `responseXML`:如果响应内容是`xml`  这个属性保存响应数据的XML DOM文档
   - status：响应的HTTP状态
   - `statusText`:响应状态的说明

5. 异步请求下检测 `readyState`属性：表示当前响应请求响应过程的活动阶段

   - 0：未初始化
   - 1：启动，已经调用open，尚未调用send 
   - 2：发送，未接到响应，send已经调用
   - 3：接收，已经接收到部分响应数据
   - 4.：完成，已经完全接受全部响应数据

6. `onreadystatechange`事件处理程序：

   - 为了保证兼容性，在open前指定onreadystatechange事件处理程序

```javascript
let xhr=createXHR()
xhr.onreadystatechange=()=>{
    if(xhr.readyState===4){
        if(xhr.status>=200&&xhr.status<300||xhr.status===304){
            alert(xhr.responseText)
        }else{
            alert("Request was unsuccessful:"+xhr.status)
        }
    }
}
xhr.open("get","example.json",true)
xhr.send(null)

```

6. 取消请求：abort()
7. 终止请求之后，可以进行解除引用操作，由于内存原因不建议重用`XHR`对象

## GET请求

1. 名称和值都必须使用`encodeURIComponent`进行编码

2. 多个键值对之间使用&分割

   ```javascript
   let addURLParam=(url,name,value)=>{
       url+=url.includes("?") ? "&":"?"
       url+=encodeURIComponent(name)+"="
            +encodeURIComponent(value)
       return url
   }
   ```



## POST 请求

在send中传入要发送的请求主体

默认情况下服务器对POST请求和提交表单的请求不会一视同仁

模仿表单提交：

- 将Content-type，设置为  `application/x-www-form-urlencoded`

- 数据格式和查询字符串格式相同，需要进行数据序列化

- 序列化格式:

  `encodeURIComponent(name1)=encodeURIComponent(value1)&...`

```javascript
function serializeForm(form){
    return Obeject.keys(form).map(key=>{
        return encodeURIComponent(key)+"="+encodeURIComponent(form[key])
    }).join('&')
}
xhr.open('post','postExample',true)
xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
let form={name:1,value:2}
xhr.send(serializeForm(form))
```

#### FormData

> send可以直接发送`FormData`且不要指定Content-type  `XHR`会识别传入的数据是`FormData`的实例，并配置合适的请求头

append()方法：接受两个参数，键，值，也可以直接传入一个表单

## GET与POST

POST请求消耗资源会更多一些，从性能角度来看，以发送相同数据两的数据计算，GET请求的速度最大可以是POST的两倍

## 超时处理

`xhr`的timeout属性，在open后send前设置

超时事件：ontimeout

超时之后不能访问status属性，使用status代码要进行异常捕获

## 重写`XHR`响应的MIME类型

`overrideMimeType()`，send之前调用，参数为MIME类型的字符串

## 进度事件

1. loadstart：接收第一个字节时触发
2. progress：回调函数中event对象
   - target指向xhr
   - `lengthComputable`：表示长度是否可计算，进度信息是否可以用
   - position：已接受的字节数
   - `totalSize`：表示根据Content-length响应头部确定的预期字节数
3. load：接收完数据时触发
4. abort
5. error
6. loadend：目前没有浏览器支持

## 跨域资源共享（`CORS`)

> 定义了访问跨域资源时，服务器浏览器之间的通信
>
> 基本思想：使用自定义的头部让浏览器与服务器进行沟通，从而决定请求或响应应该成功还是应该失败

如：请求时指定Origin头部

服务器认为可以允许就可以在Access-Control-Allow-Origin头部中指定相同的源，如果是公共资源可以指定为"*"

其他浏览器跨域时解决方法：绝对的URL

IE解决：XDR

#### 带凭据的请求

`withCredentials`：true，如果服务器接收凭据：`Access-Control-Allow-Credentials: true`

其他跨域：

#### 图像Ping

#### `JSONP`

> `JSON with padding`
>
> 在script上`scr`请求且callback指定函数名称，`json`数据会传入回调函数中
>
> 安全性，因为要从其他域加载代码执行可能会造成一些恶意代码
>
> 难以确定是否请求失败
>
> 动态添加脚本方式进行执行，服务器端返回参数指定的函数名称和数据的语句

#### Comet

#### 服务器发送事件

#### web socket

