let buf = Buffer.from('root','ascii')
buf.write("Hello",3,3,"utf8")
console.log(JSON.stringify(buf))