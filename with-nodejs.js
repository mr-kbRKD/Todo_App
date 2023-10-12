const http = require('http');
const port = 3000;


const toDoList = ["Complete This Project", "Complete Meditation"];


http.createServer((request, response) =>{
    const {method, url}  = request;
    console.log(method, url);
    if(url === "/todos"){
        if(method === "GET"){
            // writing content-type makes screen difference bro (IMPORTANT laga mujhe)
            response.writeHead(200, {'Content-Type' : 'text/html'});
            response.write(toDoList.toString());
        }
        else if(method === "POST"){
            let body = "";
            request.on("error", (err) =>{
                console.error(err);
            }).on("data", (chunk) =>{
                body += chunk;
                // console.log(chunk);
            }).on("end", ()=>{
                body = JSON.parse(body);
                let newToDoList = toDoList;
                newToDoList.push(body.item);
                console.log("data : ", newToDoList);
                response.writeHead(201);
            })
        }
        else if(method === "DELETE"){
            let body = "";
            request.on("error", (err)=>{
                console.error(err);
            }).on("data", (chunk)=>{
                body += chunk;
            }).on("end", ()=>{
                body = JSON.parse(body);
                let deleteThis = (body.item);
                for(let i = 0;i<toDoList.length;i++){
                    if(toDoList[i] === deleteThis){
                        toDoList.splice(i, 1);
                        break;  
                    }
                }

                // 2nd method to delete
                toDoList.find((element, index) =>{
                    if(element === deleteThis){
                        toDoList.splice(index, 1);
                    }
                });
                response.writeHead(204);
            })

        }
        else{
            response.writeHead(404);
        }
    }
    response.end();
}).listen(port, () =>{
    console.log(`NodeJS server started on port ${port}`);
});


// http://localhost:3000



// when someone access server from browser
// response.writeHead(200, {'Content-Type' : 'text/html'});
// response.write("<h1> Hare Krishna Welcome to new server</h1>");
// response.end();