// 引入请求模块
let http = require("http");
// 创建服务器
http.createServer(function (request,response) {
    response.writeHead(200,{'Content-type':"text/plain"})
    response.end("Hello World")
    
}).listen(8888)

console.log("Server running at http://localhost:8888/")