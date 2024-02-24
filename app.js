const express = require("express");
const socket = require("socket.io")

const app = express();
app.set("view engine", "ejs");
app.use(express.static("./views"))

app.get("/", (req, res)=>{
    res.render("index", {title: "Game"});
})

// app.get("/", (req, res)=>{
//     res.render("main", {title: "Home"});
// })


const server = app.listen(3000);
const io = socket(server);

let players = [];
let playingArray =[];

io.on("connection", (socket)=>{
    console.log("connection successful", socket.id);

    socket.on("move",(data)=>{

        io.emit("place", data);
    })
    
    socket.on("name", (name)=>{
        players.push(name);
        console.log(name)

        if(players.length == 2){   
                
                
            let pobject1 ={
                pname : players[0],
                pvalue: "white",}

            let pobject2 ={
                pname : players[1],
                pvalue: "black",}

            let obj = {
                p1: pobject1,
                p2: pobject2}

            playingArray.push(obj);

            players.splice(0,2);


            io.emit("find", playingArray);

        }

    })


    // socket.on("getpage", (data)=>{
    //     io.emit("navigate", "/play", data);
    // })
    
})