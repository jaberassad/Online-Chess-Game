

const socket = io();



class Piece{
    constructor(type, color, id){
        this.type = type;
        this.color = color;
        this.id= id;
        this.current_position= null;
    }

    get_type(){
        return this.type;
    }

    get_color(){
        return this.color;
    }

    get_id(){
        return this.id
    }

    set_current_position(a){
        this.current_position = a;
    }

    get_current_position(){
        return this.current_position;
    }

    empty_square(a){
        let div = document.getElementById(a);
        if(div.innerHTML==""){
            return true;
        }

        return false;
    }
}

class Pawn extends Piece{
    constructor(type, color, id){
        super(type, color, id);
    }

    placing(i0){
        let box= document.getElementById(i0);
        if(this.color=="white"){
            this.set_current_position(i0);
            box.innerHTML = `<img class="img" id="${this.id}" src="./statics/whitepawn.png">`; 
        }
        else{
            this.set_current_position(i0);
            box.innerHTML = `<img class="img" id="${this.id}" src="./statics/blackpawn.png">`;
        }
        
    }

    legitmove(i0, i1){

        let x1 = parseInt(i0[0]);
        let y1 = parseInt(i0[1]);
        let x2 = parseInt(i1[0]);
        let y2 = parseInt(i1[1]);

        if(y2==y1+1 && x2==x1 && document.getElementById(i1).innerHTML!="" && this.color=="black"){
            return false;
        }
        else if(y2==y1-1 && x2==x1 && document.getElementById(i1).innerHTML!="" && this.color=="white"){
            return false;
        }

        if(document.getElementById(i1).innerHTML!=""){
            let div1 = document.getElementById(i0);
            let img1 = div1.firstChild;
            let color1 = img1.id[0];

            let div2 = document.getElementById(i1);
            let img2 = div2.firstChild;
            let color2 = img2.id[0];

            if(color1=="b" && color2=="w" && x2==x1+1 && y2==y1+1){
                return true;
            }
            else if(color1=="b" && color2=="w" && x2==x1-1 && y2==y1+1){
                return true;
            }
            else if(color1=="w" && color2=="b" && x2==x1+1 && y2==y1-1){
                return true;
            }
            else if(color1=="w" && color2=="b" && x2==x1-1 && y2==y1-1){
                return true;
            }
        }
    

        if(y2==y1+1 && x2==x1 && this.color=="black"){
            return true;
        }
        else if(y2==y1-1 && x2==x1 && this.color=="white"){
            return true;
        }
        else if(y1==1 && y2==y1+2 && this.color=="black" && x1==x2){
            return true;
        }
        else if(y1==6 && y2==y1-2 && this.color=="white" && x1==x2){
            return true;
        }
        return false;
    }

}

class Rook extends Piece{
    constructor(type, color, id){
        super(type, color, id);
    }
    
    placing(i0){
        let box= document.getElementById(i0);
        if(this.color=="white"){
            this.set_current_position(i0);
            box.innerHTML = `<img class="img" id="${this.id}" src="./statics/whiterook.png">`; 
        }
        else{
            this.set_current_position(i0);
            box.innerHTML = `<img class="img" id="${this.id}" src="./statics/blackrook.png">`;
        }
        
    }

    legitmove(i0,i1){

        if(document.getElementById(i1).innerHTML!=""){
            let div1 = document.getElementById(i0);
            let img1 = div1.firstChild;
            let color1 = img1.id[0];

            let div2 = document.getElementById(i1);
            let img2 = div2.firstChild;
            let color2 = img2.id[0];

            if(color1==color2){
                return false;
            }
        }

        let x1 = parseInt(i0[0]);
        let y1 = parseInt(i0[1]);
        let x2 = parseInt(i1[0]);
        let y2 = parseInt(i1[1]);

        let deltaX = (x2>x1) ? 1:-1;
        let deltaY = (y2>y1) ? 1:-1;

        let i=y1+deltaY;
        let j=x1+deltaX;

        if(y1!=y2){
            while(i!=y2){
                if(!this.empty_square(String(x1)+String(i))){
                    return false;
                }
                i+=deltaY;
            }
        }

        if(x1!=x2){
            while(j!=x2){
                if(!this.empty_square(String(j)+String(y1))){
                    return false;
                }
                j+=deltaX;
            }
        }

        if(y1==y2 && x1==x2){
            return false;
        }
        else if(y1==y2 || x1==x2){
            return true;
        }

        return false;
    }

}

class King extends Piece{
    constructor(type, color, id){
        super(type, color, id);
        this.current_position= null;
    }

    placing(i0, j0){
        let box= document.getElementById(i0,j0);
        if(this.color=="white"){
            this.set_current_position(i0);
            box.innerHTML = `<img class="img" id="${this.id}" src="./statics/whiteking.png">`;
        }
        else{
            this.set_current_position(i0);
            box.innerHTML = `<img class="img" id="${this.id}" src="./statics/blackking.png">`;
        }
        
    }

    legitmove(i0, i1){
        let x1 = parseInt(i0[0]);
        let y1 = parseInt(i0[1]);
        let x2 = parseInt(i1[0]);
        let y2 = parseInt(i1[1]);


        if(document.getElementById(i1).innerHTML!=""){
            let div1 = document.getElementById(i0);
            let img1 = div1.firstChild;
            let color1 = img1.id[0];

            let div2 = document.getElementById(i1);
            let img2 = div2.firstChild;
            let color2 = img2.id[0];

            if(color1==color2){
                return false;
            }
        }

        if(x2==x1+1 && y1==y2){
            return true;
        }
        else if(x2==x1+1 && y2==y1+1){
            return true;
        }
        else if(x2==x1+1 && y2==y1-1){
            return true;
        }
        else if(x2==x1+1 && y1==y2){
            return true;
        }
        else if(x2==x1 && y2==y1+1){
            return true;
        }
        else if(x2==x1 && y2==y1-1){
            return true;
        }
        else if(x2==x1-1 && y2==y1+1){
            return true;
        }
        else if(x2==x1-1 && y2==y1-1){
            return true;
        }
        else if(x2==x1-1 && y1==y2){
            return true;
        }

        return false;
    }
}

class Bishop extends Piece{
    constructor(type, color, id){
        super(type, color, id);
        this.current_position= null;
    }

    placing(i0, j0){
        let box= document.getElementById(i0,j0);
        if(this.color=="white"){
            this.set_current_position(i0);
            box.innerHTML = `<img class="img" id="${this.id}" src="./statics/whitebishop.png">`;
        }
        else{
            this.set_current_position(i0);
            box.innerHTML = `<img class="img" id="${this.id}" src="./statics/blackbishop.png">`;
        }
        
    }

    legitmove(i0, i1){
        let x1 = parseInt(i0[0]);
        let y1 = parseInt(i0[1]);
        let x2 = parseInt(i1[0]);
        let y2 = parseInt(i1[1]);

        
        if(document.getElementById(i1).innerHTML!=""){
            let div1 = document.getElementById(i0);
            let img1 = div1.firstChild;
            let color1 = img1.id[0];

            let div2 = document.getElementById(i1);
            let img2 = div2.firstChild;
            let color2 = img2.id[0];

            if(color1==color2){
                return false;
            }
        }

        let deltaX = (x2>x1) ? 1:-1;
        let deltaY = (y2>y1) ? 1:-1;

        let i=y1+deltaY;
        let j=x1+deltaX;

        if(Math.abs(x1-x2)==Math.abs(y1-y2))

        while(j!=x2){
            while(i!=y2){
                if(!this.empty_square(String(j)+String(i))){
                    return false;
                }
                else{
                    i+=deltaY;
                    j+=deltaX;
                }
            }
        }

        if (Math.abs(y2-y1)==Math.abs(x2-x1)){
            return true;
        }
        return false;
    }
}

class Knight extends Piece{
    constructor(type, color, id){
        super(type, color, id);
        this.current_position= null;
    }

    placing(i0, j0){
        let box= document.getElementById(i0,j0);
        if(this.color=="white"){
            this.set_current_position(i0);
            box.innerHTML = `<img class="img" id="${this.id}" src="./statics/whiteknight.png">`;
        }
        else{
            this.set_current_position(i0);
            box.innerHTML = `<img class="img" id="${this.id}" src="./statics/blackknight.png">`;
        }
        
    }

    legitmove(i0, i1){
        let x1 = parseInt(i0[0]);
        let y1 = parseInt(i0[1]);
        let x2 = parseInt(i1[0]);
        let y2 = parseInt(i1[1]);


        if(document.getElementById(i1).innerHTML!=""){
            let div1 = document.getElementById(i0);
            let img1 = div1.firstChild;
            let color1 = img1.id[0];

            let div2 = document.getElementById(i1);
            let img2 = div2.firstChild;
            let color2 = img2.id[0];

            if(color1==color2){
                return false;
            }
        }

        if(x2==x1+2 && y2==y1+1){
            return true;
        }
        else if(x2==x1-2 && y2==y1+1){
            return true;
        }
        else if(x2==x1+2 && y2==y1-1){
            return true;
        }
        else if(x2==x1-2 && y2==y1-1){
            return true;
        }
        else if(x2==x1+1 && y2==y1+2){
            return true;
        }
        else if(x2==x1-1 && y2==y1+2){
            return true;
        }
        else if(x2==x1+1 && y2==y1-2){
            return true;
        }
        else if(x2==x1-1 && y2==y1-2){
            return true;
        }
    }
}

class Queen extends Piece {
    constructor(type, color, id) {
        super(type, color, id);
    }


    placing(i0, j0) {
        let box = document.getElementById(i0, j0);
        if (this.color == "white") {
            this.set_current_position(i0);
            box.innerHTML = `<img class="img" id="${this.id}" src="./statics/whitequeen.png">`;
        } else {
            this.set_current_position(i0);
            box.innerHTML = `<img class="img" id="${this.id}" src="./statics/blackqueen.png">`;
        }
    }

    legitmove(i0, i1){
        let x1 = parseInt(i0[0]);
        let y1 = parseInt(i0[1]);
        let x2 = parseInt(i1[0]);
        let y2 = parseInt(i1[1]);

        if(x1!=x2 && y1!=y2 && Math.abs(x1-x2)!=Math.abs(y1-y2)){
            return false;
        }


        if(document.getElementById(i1).innerHTML!=""){
            let div1 = document.getElementById(i0);
            let img1 = div1.firstChild;
            let color1 = img1.id[0];

            let div2 = document.getElementById(i1);
            let img2 = div2.firstChild;
            let color2 = img2.id[0];

            if(color1==color2){
                return false;
            }
        }

        let deltaX = (x2>x1) ? 1:-1;
        let deltaY = (y2>y1) ? 1:-1;
        let i=y1+deltaY;
        let j=x1+deltaX;

        if(Math.abs(x1-x2)==Math.abs(y1-y2))
            while(j!=x2){
                while(i!=y2){
                    if(!this.empty_square(String(j)+String(i))){
                        return false;
                    }
                    else{
                        i+=deltaY;
                        j+=deltaX;
                    }
                }
            }

        let x=y1+deltaY;
        let y=x1+deltaX;

        if(y1!=y2 && x1==x2){
            while(x!=y2){
                if(!this.empty_square(String(x1)+String(x))){
                    return false;
                }
                x+=deltaY;
            }
        }

        if(x1!=x2 && y1==y2){
            while(y!=x2){
                if(!this.empty_square(String(y)+String(y1))){
                    return false;
                }
                y+=deltaX;
            }
        }

        if(y1==y2){
            return true;
        }

        


        return true;
    }
}

const pieceMap = new Map();

let wpawn1 = new Pawn("Pawn", "white", "wpawn1", null)
pieceMap.set("wpawn1", wpawn1);
wpawn1.placing("06");

let wpawn2 = new Pawn("Pawn", "white", "wpawn2");
pieceMap.set("wpawn2", wpawn2);
wpawn2.placing("16");

let wpawn3 = new Pawn("Pawn", "white", "wpawn3")
pieceMap.set("wpawn3", wpawn3);
wpawn3.placing("26");

let wpawn4 = new Pawn("Pawn", "white", "wpawn4")
pieceMap.set("wpawn4", wpawn4);
wpawn4.placing("36");

let wpawn5 = new Pawn("Pawn", "white", "wpawn5")
pieceMap.set("wpawn5", wpawn5);
wpawn5.placing("46");

let wpawn6 = new Pawn("Pawn", "white", "wpawn6")
pieceMap.set("wpawn6", wpawn6);
wpawn6.placing("56");

let wpawn7 = new Pawn("Pawn", "white", "wpawn7")
pieceMap.set("wpawn7", wpawn7);
wpawn7.placing("66");

let wpawn8 = new Pawn("Pawn", "white", "wpawn8")
pieceMap.set("wpawn8", wpawn8);
wpawn8.placing("76");

let wrook1 = new Rook("Rook", "white", "wrook1");
pieceMap.set("wrook1", wrook1);
wrook1.placing("07");

let wrook2 = new Rook("Rook", "white", "wrook2");
pieceMap.set("wrook2", wrook2);
wrook2.placing("77");

let wking = new King("King", "white", "wking");
pieceMap.set("wking" , wking);
wking.placing("47");

let wqueen = new Queen("Queen", "white", "wqueen");
pieceMap.set("wqueen", wqueen);
wqueen.placing("37");

let wbishop1 = new Bishop("Bishop", "white", "wbishop1");
pieceMap.set("wbishop1", wbishop1);
wbishop1.placing("27");

let wbishop2 = new Bishop("Bishop", "white", "wbishop2");
pieceMap.set("wbishop2", wbishop2);
wbishop2.placing("57");

let wknight1 = new Knight("Knight", "white", "wknight1");
pieceMap.set("wknight1", wknight1);
wknight1.placing("67");

let wknight2 = new Knight("Knight", "white", "wknight2");
pieceMap.set("wknight2", wknight2);
wknight2.placing("17");

let bpawn1 = new Pawn("Pawn", "black", "bpawn1")
pieceMap.set("bpawn1", bpawn1);
bpawn1.placing("01");

let bpawn2 = new Pawn("Pawn", "black", "bpawn2")
pieceMap.set("bpawn2", bpawn2);
bpawn2.placing("11");

let bpawn3 = new Pawn("Pawn", "black", "bpawn3")
pieceMap.set("bpawn3", bpawn3);
bpawn3.placing("21");

let bpawn4 = new Pawn("Pawn", "black", "bpawn4")
pieceMap.set("bpawn4", bpawn4);
bpawn4.placing("31");

let bpawn5 = new Pawn("Pawn", "black", "bpawn5")
pieceMap.set("bpawn5", bpawn5);
bpawn5.placing("41");

let bpawn6 = new Pawn("Pawn", "black", "bpawn6")
pieceMap.set("bpawn6", bpawn6);
bpawn6.placing("51");

let bpawn7 = new Pawn("Pawn", "black", "bpawn7")
pieceMap.set("bpawn7", bpawn7);
bpawn7.placing("61");

let bpawn8 = new Pawn("Pawn", "black", "bpawn8")
pieceMap.set("bpawn8", bpawn8);
bpawn8.placing("71");


let brook1 = new Rook("Rook", "black", "brook1");
pieceMap.set("brook1", brook1);
brook1.placing("00");

let brook2 = new Rook("Rook", "black", "brook2");
pieceMap.set("brook2", brook2);
brook2.placing("70");

let bking = new King("King", "black", "bking");
pieceMap.set("bking", bking);
bking.placing("40")

let bqueen = new Queen("Queen", "black", "bqueen")
pieceMap.set("bqueen", bqueen);
bqueen.placing("30");

let bbishop1 = new Bishop("Bishop", "black", "bbishop1");
pieceMap.set("bbishop1", bbishop1);
bbishop1.placing("20");

let bbishop2 = new Bishop("Bishop", "black", "bbishop2");
pieceMap.set("bbishop2", bbishop2)
bbishop2.placing("50");

let bknight1 = new Knight("Knight", "black", "bknight1");
pieceMap.set("bknight1", bknight1);
bknight1.placing("10");

let bknight2 = new Knight("Knight", "black", "bknight2");
pieceMap.set("bknight2", bknight2);
bknight2.placing("60");



let chess_box = document.getElementById("chess_box");
chess_box.style.display="none";

let num_piece = "1";


chess_box.addEventListener("click", function firstclick(event){
    let clicked_element = event.target;
    let current_position= clicked_element.id;

    let div1 = clicked_element.parentNode;
    let piece;

    if(clicked_element.tagName === "IMG"){
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
    else{return}

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
                }
                else{
                    socket.emit("move", {current_position, coords, piece}); 
                }    
            }


            if(clicked_element2.id[0] == clicked_element.id[0]){
                current_position==coords;
                chess_box.removeEventListener("click", secondclick);
                chess_box.addEventListener("click", firstclick);
            }

            if(piece.legitmove(current_position, coords) && piece.get_color()=="white" && coords[1]=="0" && piece.get_type()=="Pawn"){
                let pickdiv = document.getElementById("white_pick");
                pickdiv.innerHTML='<p id="pls_pick"> Please pick a piece</p><ul><li><img id="wbishop1" src="statics/whitebishop.png"></li><li><img id="wqueen" src="statics/whitequeen.png"></li><li><img id="wrook1" src="statics/whiterook.png"></li><li><img id="wknight1" src="statics/whiteknight.png"></li></ul>'

                pickdiv.addEventListener("click", (event)=>{
                    let clicked_img = event.target;
                    
                    let piece2;
                    
                    if(clicked_img.id.substring(0,7)=="wbishop"){
                        piece2 = new Bishop("Bishop", "white", `wbishop1${num_piece}`);
                        pieceMap.set(`wbishop1${num_piece}`, piece2);
                    }
                    else if(clicked_img.id.substring(0,6)=="wqueen"){
                        piece2 = new Queen("Queen", "white", `wqueen${num_piece}`);
                        pieceMap.set(`wqueen${num_piece}`, piece2);
                    }
                    else if(clicked_img.id.substring(0,5)=="wrook"){
                        piece2 = new Rook("Rook", "white", `wrook${num_piece}`);
                        pieceMap.set(`wrook${num_piece}`, piece2);
                    }
                    else if(clicked_img.id.substring(0,7)=="wknight"){
                        piece2 = new Knight("Knight", "white", `wknight${num_piece}`);
                        pieceMap.set(`wknight${num_piece}`, piece2);
                    }
                    pickdiv.innerHTML="";
                    piece2.placing(coords);
                })


            }
            else if(piece.get_color()=="black" && coords[1]=="7" && piece.get_type()=="Pawn" && piece.legitmove(current_position, coords)){
                let pickdiv = document.getElementById("black_pick");
                num_piece+="1"
                pickdiv.innerHTML=`<p id="pls_pick"> Please pick a piece</p><ul><li><img id="bbishop1${num_piece}" src="statics/blackbishop.png"></li><li><img id="bqueen" src="statics/blackqueen.png"></li><li><img id="brook1" src="statics/blackrook.png"></li><li><img id="bknight1" src="statics/blackknight.png"></li></ul>`
                pickdiv.addEventListener("click", (event)=>{
                    let clicked_img = event.target;
                    let piece2;
                    
                    if(clicked_img.id.substring(0,7)=="bbishop"){
                        console.log(true);
                        piece2 = new Bishop("Bishop", "black", `bbishop1${num_piece}`);
                        pieceMap.set(`bbishop1${num_piece}`, piece2);
                    }
                    else if(clicked_img.id.substring(0,6)=="bqueen"){
                        console.log(true);
                        piece2 = new Queen("Queen", "black", `bqueen${num_piece}`);
                        pieceMap.set(`bqueen${num_piece}`, piece2);
                    }
                    else if(clicked_img.id.substring(0,5)=="brook"){
                        console.log(true);
                        piece2 = new Rook("Rook", "black", `brook${num_piece}`);
                        pieceMap.set(`brook${num_piece}`, piece2);
                    }
                    else if(clicked_img.id.substring(0,7)=="bknight"){
                        console.log(true);
                        piece2 = new Knight("Knight", "black", `bknight${num_piece}`);
                        pieceMap.set(`bknight${num_piece}`, piece2);
                    }
                    
                    pickdiv.innerHTML="";
                    piece2.placing(coords);
                    console.log(piece2);
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
    let div = document.getElementById(piece.current_position);
    div.innerHTML="";
    piece2.placing(coords)
    let turn = document.getElementById("turn");

    if(piece.color=="black"){
        turn.innerHTML="white player's turn"
    }
    else if(piece.color=="white"){
        turn.innerHTML="black player's turn"
    }

})


let div10 = document.getElementById("loading");


let btn = document.getElementById("submit");
let text = document.getElementById("username");
let data;

btn.addEventListener("click", ()=>{
    let name= text.value;
    socket.emit("name", name);
}, {once:true})

socket.on("find", (playingArray1)=>{

    let name = text.value;
    let playingArray= playingArray1[playingArray1.length -1];
    let value;
    let oppname;
    let playercolor;
    let player;

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
