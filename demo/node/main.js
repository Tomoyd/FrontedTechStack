let fs = require("fs")
// 阻塞式
let data = fs.readFileSync("input.txt")
console.log(data.toString())
console.log("**我在文件内容打印之后打印**")
// 非阻塞式
fs.readFile('input.txt',(err,data)=>{
    if(err){
        return console.log(err)
    }else{
        console.log(data.toString())
    }
})
console.log("我在文件内容打印之前打印")
