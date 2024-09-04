import Queen from "../classes/queen.js"
import Bishop from "../classes/bishop.js"
import Knight from "../classes/knight.js"
import Rook from "../classes/rook.js"
import chess_map from "./classes/chess_board.js"



const socket = io();
let chessMap = new chess_map()
let pieceMap = chessMap.chess_box

let chess_box = document.getElementById("chess_box");
chess_box.style.display="none";

let num_piece = "1";
let changing=false;

socket.on("still_changing", ()=>{
    changing=true
})

socket.on("option_picking_over", ()=>{
    console.log("over")
    changing=false
})

// controls the movement inside the chess box and places piece if move is valid
chess_box.addEventListener("click", function firstclick(event){
    console.log(changing)
    if(changing){return}
    let clicked_element = event.target;
    if (clicked_element.tagName!="IMG"){return}
    let your_turn= document.getElementById("turn").innerHTML.toLowerCase().includes(pieceMap.get(clicked_element.id).color)
    if(!your_turn){return}
    if(document.getElementById("urname").innerHTML.includes("White") && document.getElementById("turn").innerHTML.toLowerCase().includes("black")){
        console.log(document.getElementById("urname").innerHTML.includes("White"))
        console.log(document.getElementById("turn").innerHTML.toLowerCase().includes("white"))
        return}
    if(document.getElementById("urname").innerHTML.includes("Black") && document.getElementById("turn").innerHTML.toLowerCase().includes("white")){return}
    if(!king_is_alive()){return}
    let current_position= clicked_element.id;

    let div1 = clicked_element.parentNode;
    let piece;

    if(clicked_element.tagName === "IMG" && your_turn){
        clicked_element.style.backgroundColor = "rgb(165, 198, 250)";
        piece= pieceMap.get(clicked_element.id);
        current_position = piece.current_position;

        let squaresw =chess_box.querySelectorAll(".white");
        let squaresb =chess_box.querySelectorAll(".black");
    
        squaresw.forEach(square => {
            if(piece.legitmove(current_position, square.id)){
                    square.style.backgroundColor = "rgb(165, 198, 250)";
            }
        });
        squaresb.forEach(square => {
            if(piece.legitmove(current_position, square.id)){
                    square.style.backgroundColor = "rgb(165, 198, 250)";
            }
        });
    }
    else{
        return}

    chess_box.removeEventListener("click", firstclick)

    if(king_is_alive())
    {    chess_box.addEventListener("click", function secondclick(event){

            let squaresw =chess_box.querySelectorAll(".white");
            let squaresb =chess_box.querySelectorAll(".black");

            squaresw.forEach(square => {
                if(piece.legitmove(current_position, square.id)){
                        square.style.backgroundColor = "rgb(242, 240, 240)";
                }
            });
            squaresb.forEach(square => {
                if(piece.legitmove(current_position, square.id)){
                        square.style.backgroundColor = "rgb(18, 111, 1)";
                }
            });            
            
            clicked_element.style.backgroundColor = "";
            let clicked_element2 = event.target;
            let coords;

            if(clicked_element2.tagName==="IMG"){
                coords= clicked_element2.parentNode.id;
                current_position=piece.current_position;
            }
            else{
                coords = clicked_element2.id;
            }

            if(piece.legitmove(current_position, coords)){
                let turn25 = document.getElementById("turn");

                if(turn25.innerHTML=="white player's turn" && piece.get_color()!="white"){
                    chess_box.removeEventListener("click", secondclick);
                    chess_box.addEventListener("click", firstclick);
                    return;
                }
                else if(turn25.innerHTML=="black player's turn" && piece.get_color()!="black"){
                    chess_box.removeEventListener("click", secondclick);
                    chess_box.addEventListener("click", firstclick);
                    return;
                }else if ((document.getElementById("urname").innerHTML.includes("White") && piece.color=="black") || (document.getElementById("urname").innerHTML.includes("Black") && piece.color=="white")){
                    chess_box.removeEventListener("click", secondclick);
                    chess_box.addEventListener("click", firstclick);
                    return;
                }else{
                    socket.emit("move", {current_position, coords, piece});
                }    
            }


            if(clicked_element2.id[0] == clicked_element.id[0]){
                current_position==coords;
                chess_box.removeEventListener("click", secondclick);
                chess_box.addEventListener("click", firstclick);
            }

            function num_sim_pieces(type, color){
                let num=0
                for(let [key,value] of pieceMap.entries()){
                    if(value.color==color && value.type==type) {
                        num++}; 
                }
                return num+1
            }

            if(piece.legitmove(current_position, coords) && piece.get_color()=="white" && coords[1]=="0" && piece.get_type()=="Pawn"){
                socket.emit("changing")
                let pickdiv = document.getElementById("white_pick");
                pickdiv.innerHTML='<p id="pls_pick"> Please pick a piece</p><ul><li><img id="wbishop1" src="statics/whitebishop.png"></li><li><img id="wqueen" src="statics/whitequeen.png"></li><li><img id="wrook1" src="statics/whiterook.png"></li><li><img id="wknight1" src="statics/whiteknight.png"></li></ul>'

                pickdiv.addEventListener("click", (event)=>{
                    socket.emit("done_changing")
                    let clicked_img = event.target;
                    let piece2;
                    let nums;
                    
                    if(clicked_img.id.substring(0,7)=="wbishop"){
                        nums = num_sim_pieces("Bishop", "white")
                        piece2 = new Bishop("Bishop", "white", `wbishop${nums}`);
                        pieceMap.set(`wbishop${nums}`, piece2)
                    }
                    else if(clicked_img.id.substring(0,6)=="wqueen"){
                        nums = num_sim_pieces("Queen", "white")
                        piece2 = new Queen("Queen", "white", `wqueen${nums}`);
                        pieceMap.set(`wqueen${nums}`, piece2)
                    }
                    else if(clicked_img.id.substring(0,5)=="wrook"){
                        nums = num_sim_pieces("Rook", "white")
                        piece2 = new Rook("Rook", "white", `wrook${nums}`);
                        pieceMap.set(`wrook${nums}`, piece2)
                    }
                    else if(clicked_img.id.substring(0,7)=="wknight"){
                        nums = num_sim_pieces("Knight", "white")
                        piece2 = new Knight("Knight", "white", `wknight${nums}`);
                        pieceMap.set(`wknight${nums}`, piece2)
                    }
                    pickdiv.innerHTML="";
                    piece2.current_position = coords
                    piece = piece2
                    socket.emit("option_change", {piece});
                })
            }
            else if(piece.get_color()=="black" && coords[1]=="7" && piece.get_type()=="Pawn" && piece.legitmove(current_position, coords)){
                socket.emit("changing")
                let pickdiv = document.getElementById("black_pick");
                pickdiv.innerHTML=`<p id="pls_pick"> Please pick a piece</p><ul><li><img id="bbishop1${num_piece}" src="statics/blackbishop.png"></li><li><img id="bqueen" src="statics/blackqueen.png"></li><li><img id="brook1" src="statics/blackrook.png"></li><li><img id="bknight1" src="statics/blackknight.png"></li></ul>`
                pickdiv.addEventListener("click", (event)=>{
                    socket.emit("done_changing")
                    let clicked_img = event.target;
                    let nums;
                    let piece2;
                    
                    if(clicked_img.id.substring(0,7)=="bbishop"){
                        nums = num_sim_pieces("Bishop", "black")
                        piece2 = new Bishop("Bishop", "black", `bbishop${nums}`);
                        pieceMap.set(`bbishop${nums}`, piece2)
                    }
                    else if(clicked_img.id.substring(0,6)=="bqueen"){
                        nums = num_sim_pieces("Queen", "black")
                        piece2 = new Queen("Queen", "black", `bqueen${nums}`);
                        pieceMap.set(`bqueen${nums}`, piece2)
                    }
                    else if(clicked_img.id.substring(0,5)=="brook"){
                        nums = num_sim_pieces("Rook", "black")
                        piece2 = new Rook("Rook", "black", `brook${nums}`);
                        pieceMap.set(`brook${nums}`, piece2)
                    }
                    else if(clicked_img.id.substring(0,7)=="bknight"){
                        nums = num_sim_pieces("Knight", "black")
                        piece2 = new Knight("Knight", "black", `bknight${nums}`);
                        pieceMap.set(`bknight${nums}`, piece2)
                    }
                    
                    pickdiv.innerHTML="";
                    piece2.current_position = coords
                    piece = piece2
                    socket.emit("option_change", {piece});
                    
                })
            }

            if(piece.legitmove(current_position, coords)){
                console.log("legit");
            }
            else if(current_position==coords || piece.legitmove(current_position, coords)){
                displayMessage('Illegal Move', 3000);
                chess_box.removeEventListener("click", secondclick);
                chess_box.addEventListener("click", firstclick);
                return;
            }
            else{
                displayMessage('Illegal Move', 3000);
                chess_box.removeEventListener("click", secondclick);
                chess_box.addEventListener("click", firstclick);
                return;
            }


            if(div1){
                div1.innerHTML="";}
        
                if(clicked_element2.tagName==="IMG"){
                    clicked_element2.parentNode.innerHTML="";
                }
            
            
            piece.placing(coords);

            chess_box.removeEventListener("click", secondclick);
            chess_box.addEventListener("click", firstclick);
        })}
})


function king_is_alive(){
    let white_alive= false;
    let black_alive= false;
    let id;
    let num;
    for(let i=0; i<=7; i++){
        for(let j=0; j<=7; j++){
            num=String(i)+String(j);
            let div=document.getElementById(num);

            if(div.innerHTML==""){
                continue;
            }
            else if(div.firstChild.id=="wking"){
                white_alive=true;
            }
            else if(div.firstChild.id=="bking"){
                black_alive=true;
            }
            
        }
    }

    return white_alive && black_alive;
}

function showKingDead() {
    let newDiv = document.getElementById("king_dead");
    newDiv.innerHTML = "<p> Game Ended </p>";
}

let intervalId = setInterval(function() {
    if (!king_is_alive()) {
        clearInterval(intervalId);
        showKingDead();
    }
}, 500);

function displayMessage(message, duration) {

    const messageDiv = document.getElementById('wrong_move');
    messageDiv.innerHTML+="<p> Illegal Move </p>";

    setTimeout(function() {
        messageDiv.innerHTML="";
    }, duration);
}

socket.on("place",(data)=>{
    const {current_position, coords, piece} = data;
    let piece2 = pieceMap.get(piece.id);
    let div = document.getElementById(piece2.current_position);
    div.innerHTML="";
    piece2.placing(coords)
    let turn = document.getElementById("turn");

    if(piece.color=="black"){
        turn.innerHTML="white player's turn"
    }else if(piece.color=="white"){
        turn.innerHTML="black player's turn"
    }

})


let div10 = document.getElementById("loading");


let btn = document.getElementById("submit");
let text = document.getElementById("username");
let data;

btn.addEventListener("click", () => {
    let name = text.value;
    console.log(name)
    if(name){
        socket.emit("name", name);
        socket.emit("submit");
        document.getElementById("input").innerHTML += '<p> searching for players </p>';
        document.getElementById("input").innerHTML += '<img src="statics/ZKZg.gif">';}
});


socket.on("find", (playingArray1)=>{

    let name = text.value;
    let playingArray= playingArray1[playingArray1.length -1];
    let value;
    let oppname;
    let playercolor;
    let player;
    let color, oppcolor;

    if(name==playingArray.p1.pname){
        player = "player1";
        value = playingArray.p1.pname;
        oppname = playingArray.p2.pname;
        playercolor = playingArray.p1.pvalue;
    }
    else{
        player="player2";
        value = playingArray.p2.pname;
        oppname = playingArray.p1.pname;
        playercolor = playingArray.p1.pvalue;   
    }
    data = { value, oppname, player };

    if(data.player == "player1"){
        color = "White";
        oppcolor= "Black"
    }
    else{
        color= "Black";
        oppcolor = "White"
    }

    div10.style.display="none";
    chess_box.style.display="block";
    let div11= document.getElementById("urname");
    div11.innerHTML=`${color} player (You): ${data.value}`;

    let div12= document.getElementById("oppname");
    div12.innerHTML=`${oppcolor} player : ${data.oppname}`;

    let div13= document.getElementById("turn");
    div13.innerHTML="white player's turn";
}) 


socket.on("changed", (data)=>{
    let piece_info = data.piece
    let curr = piece_info.current_position
    let id = piece_info.id
    let type = piece_info.type
    let color = piece_info.color
    let piece;

    switch(type){
        case "Queen":
            piece = new Queen("Queen", color, id, curr)
            break
        case "Bishop":
            piece = new Bishop("Bishop", color, id, curr)
            break
        case "Bishop":
            piece = new Knight("Knight", color, id, curr)
            break
        case "Rook":
            piece = new Rook("Rook", color, id, curr)
            break
    }
    pieceMap.set(id, piece)
    piece.placing(curr)
})


socket.on("playerLeft", ()=>{
    socket.disconnect();
    window.location.href = "/"; 
})