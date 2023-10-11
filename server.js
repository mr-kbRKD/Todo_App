const http = require('http');
const port = 3000;
http.createServer((request, response) =>{
    // when someone access serve from browser
    response.writeHead(200, {'Content-Type' : 'text/html'});
    response.write("<h1> Hare Krishna Welcome to new server</h1>");
    response.end();
}).listen(port, () =>{
    console.log(`NodeJS server started on port ${port}`);
});


// http://localhost:3000