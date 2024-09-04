import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { v4 as uuidv4 } from 'uuid';

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
let playingArray = [];

let sessions = new Map();
let playerStatus = new Map(); // Map to track player submission status

io.on("connection", (socket) => {
    let session;

    // Find existing session with only one player
    for (let [sessionId, players] of sessions.entries()) {
        if (players.length === 1) {
            session = sessionId;
            players.push(socket.id);
        }
    }

    if (!session) {
        // Create a new session if no existing one is found
        session = uuidv4();
        sessions.set(session, [socket.id]);
    }

    socket.join(session);

    socket.on("move", (data) => {
        io.to(session).emit("place", data);
    });

    socket.on("done_changing", () => {
        io.to(session).emit("option_picking_over");
    });

    socket.on("option_change", (piece) => {
        io.to(session).emit("changed", piece);
    });

    socket.on("changing", () => {
        io.to(session).emit("still_changing");
    });

    socket.on("disconnect", () => {
        sessions.delete(session);
        console.log(sessions);
        socket.to(session).emit("playerLeft");
        socket.disconnect();
    });

    socket.on("name", (name) => {
        // Store the player's name and submission status
        playerStatus.set(socket.id, { name, submitted: false });
    });

    socket.on("submit", () => {
        // Update submission status when the player submits
        if (playerStatus.has(socket.id)) {
            const player = playerStatus.get(socket.id);
            player.submitted = true;
            playerStatus.set(socket.id, player);

            // Add player to the session if two players have submitted
            const submittedPlayers = Array.from(playerStatus.values()).filter(p => p.submitted);

            if (submittedPlayers.length === 2) {
                const [player1, player2] = submittedPlayers;
                const pobject1 = {
                    pname: player1.name,
                    pvalue: "white",
                };

                const pobject2 = {
                    pname: player2.name,
                    pvalue: "black",
                };

                const obj = {
                    p1: pobject1,
                    p2: pobject2
                };

                playingArray.push(obj);
                playerStatus.clear(); // Clear player status for next game
                io.to(session).emit("find", playingArray);
                players.splice(0, 2); // Clear players array for new session
            }
        }
    });
});

server.listen(3000, () => {
    console.log("Server is running on port 3000");
});
