var app = require("express")(),//生成express的应用
    http = require("http").Server(app),//基于 express 应用创建服务器
    io = require("socket.io")(http);//服务器端创建socket.io实例
    //路由
    app.get('/',(req,res)=>{
        // res.send("ni");
        res.sendFile(__dirname + "/index.html");
    });
     //给服务器端socket.io实例绑定connection事件
    io.on("connection",function(sys){
          console.log("有人连接");
        sys.on("disconnect",function(){
            console.log("有人掉线了");
          }); 
    // 服务器端socket.io实例定义chat message，
        sys.on("chat message",function(msg){
            console.log("message:" + msg);
    // 服务器端触发客户端定义的show message事件；
    //实现客户端显示消息的刷新
            io.emit("show message",msg);
        });
    });
    http.listen(6066,function(){
        console.log("listen on :6066");
    });
