const http = require('http');

const server = http.createServer((req,res)=>{
    console.log('server running......');
    res.end("this is response");
});

server.listen(3000);