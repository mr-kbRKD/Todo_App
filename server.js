const express = require('express');

// initialization
const app = express();
// app will use json data format for data transmission(can manipulate if wants it is by default for all)
app.use(express.json());

const port = 3000;


const toDoList = ["Complete This Project", "Complete Meditation"];

app.get('/todos', (req,res)=>{
    // callback
    res.status(200).send(toDoList);

});

app.post('/todos', (req, res)=>{
    let newToDo = req.body.item;
    toDoList.push(newToDo);
    res.status(201).send({
        // now as we have to send data(msg) in json its not required to strictly "" key it can do automatically
        message : "Task added Successfuly"
    });
})

app.delete('/todos', (req,res)=>{
    let deleteThis = req.body.item;
    toDoList.find((element, index)=>{
        if(element === deleteThis){
            toDoList.splice(index, 1);
        }
    });
    // problem with status code 204 not with msg both working fine
    res.status(202).send({
        // msg : "Task deleted successfully bro!"
        message : `Deleted item is - ${req.body.item}`
    });
});

// for all other methods of particular route
app.all('/todos', (req,res)=>{
    res.status(501).send();
});
// for all other routes
app.all("*", (req,res)=>{
    res.status(404).send();
});

app.listen(port, () =>{
    console.log(`NodeJS server started running at ${port}`);
});