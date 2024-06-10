import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
app.set("view engine", "ejs");
app.use(express.static("./views"))

app.get("/", (req, res)=>{
    res.render("index", {title: "Game"});
})

// Create a server instance using the express app
const server = createServer(app);

// Pass the server instance to the socket.io Server constructor
const io = new Server(server);

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
                pvalue: "white",
            }

            let pobject2 ={
                pname : players[1],
                pvalue: "black",
            }

            let obj = {
                p1: pobject1,
                p2: pobject2
            }

            playingArray.push(obj);
            players.splice(0,2);

            io.emit("find", playingArray);
        }
    })
})

// Start the server listening on port 3000
server.listen(3000, () => {
    console.log("Server is running on port 3000");
});