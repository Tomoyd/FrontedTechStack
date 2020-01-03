let events=require("events");
let eventEmitter=new events.EventEmitter();
let connectHandler=()=>{
    console.log("链接成功")
    eventEmitter.emit("data_received")
}

eventEmitter.on("connection",connectHandler)
eventEmitter.on("data_received",()=>{
    console.log("数据接收成功")
})
eventEmitter.emit("connection")
console.log("执行完毕")

//  nodejs 执行过程
/*
* 1.触发某个事件
* 2.处理事件程序,时间循环机制执行,
* 3.执行下面的代码
* 产生事件的实例都是events.EventEmitter的实例
*
*/