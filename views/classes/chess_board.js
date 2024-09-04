import King from "./king.js"
import Queen from "./queen.js"
import Bishop from "./bishop.js"
import Knight from "./knight.js"
import Rook from "./rook.js"
import Pawn from "./pawn.js"

class chess_map{
    constructor(){
        this.chess_box= new Map()
        let wpawn1 = new Pawn("Pawn", "white", "wpawn1")
        this.chess_box.set("wpawn1", wpawn1);
        wpawn1.placing("06");

        let wpawn2 = new Pawn("Pawn", "white", "wpawn2");
        this.chess_box.set("wpawn2", wpawn2);
        wpawn2.placing("16");

        let wpawn3 = new Pawn("Pawn", "white", "wpawn3")
        this.chess_box.set("wpawn3", wpawn3);
        wpawn3.placing("26");

        let wpawn4 = new Pawn("Pawn", "white", "wpawn4")
        this.chess_box.set("wpawn4", wpawn4);
        wpawn4.placing("36");

        let wpawn5 = new Pawn("Pawn", "white", "wpawn5")
        this.chess_box.set("wpawn5", wpawn5);
        wpawn5.placing("46");

        let wpawn6 = new Pawn("Pawn", "white", "wpawn6")
        this.chess_box.set("wpawn6", wpawn6);
        wpawn6.placing("56");

        let wpawn7 = new Pawn("Pawn", "white", "wpawn7")
        this.chess_box.set("wpawn7", wpawn7);
        wpawn7.placing("66");

        let wpawn8 = new Pawn("Pawn", "white", "wpawn8")
        this.chess_box.set("wpawn8", wpawn8);
        wpawn8.placing("76");

        let wrook1 = new Rook("Rook", "white", "wrook1");
        this.chess_box.set("wrook1", wrook1);
        wrook1.placing("07");

        let wrook2 = new Rook("Rook", "white", "wrook2");
        this.chess_box.set("wrook2", wrook2);
        wrook2.placing("77");

        let wking = new King("King", "white", "wking");
        this.chess_box.set("wking" , wking);
        wking.placing("47");

        let wqueen = new Queen("Queen", "white", "wqueen");
        this.chess_box.set("wqueen", wqueen);
        wqueen.placing("37");

        let wbishop1 = new Bishop("Bishop", "white", "wbishop1");
        this.chess_box.set("wbishop1", wbishop1);
        wbishop1.placing("27");

        let wbishop2 = new Bishop("Bishop", "white", "wbishop2");
        this.chess_box.set("wbishop2", wbishop2);
        wbishop2.placing("57");

        let wknight1 = new Knight("Knight", "white", "wknight1");
        this.chess_box.set("wknight1", wknight1);
        wknight1.placing("67");

        let wknight2 = new Knight("Knight", "white", "wknight2");
        this.chess_box.set("wknight2", wknight2);
        wknight2.placing("17");

        let bpawn1 = new Pawn("Pawn", "black", "bpawn1")
        this.chess_box.set("bpawn1", bpawn1);
        bpawn1.placing("01");

        let bpawn2 = new Pawn("Pawn", "black", "bpawn2")
        this.chess_box.set("bpawn2", bpawn2);
        bpawn2.placing("11");

        let bpawn3 = new Pawn("Pawn", "black", "bpawn3")
        this.chess_box.set("bpawn3", bpawn3);
        bpawn3.placing("21");

        let bpawn4 = new Pawn("Pawn", "black", "bpawn4")
        this.chess_box.set("bpawn4", bpawn4);
        bpawn4.placing("31");

        let bpawn5 = new Pawn("Pawn", "black", "bpawn5")
        this.chess_box.set("bpawn5", bpawn5);
        bpawn5.placing("41");

        let bpawn6 = new Pawn("Pawn", "black", "bpawn6")
        this.chess_box.set("bpawn6", bpawn6);
        bpawn6.placing("51");

        let bpawn7 = new Pawn("Pawn", "black", "bpawn7")
        this.chess_box.set("bpawn7", bpawn7);
        bpawn7.placing("61");

        let bpawn8 = new Pawn("Pawn", "black", "bpawn8")
        this.chess_box.set("bpawn8", bpawn8);
        bpawn8.placing("71");


        let brook1 = new Rook("Rook", "black", "brook1");
        this.chess_box.set("brook1", brook1);
        brook1.placing("00");

        let brook2 = new Rook("Rook", "black", "brook2");
        this.chess_box.set("brook2", brook2);
        brook2.placing("70");

        let bking = new King("King", "black", "bking");
        this.chess_box.set("bking", bking);
        bking.placing("40")

        let bqueen = new Queen("Queen", "black", "bqueen")
        this.chess_box.set("bqueen", bqueen);
        bqueen.placing("30");

        let bbishop1 = new Bishop("Bishop", "black", "bbishop1");
        this.chess_box.set("bbishop1", bbishop1);
        bbishop1.placing("20");

        let bbishop2 = new Bishop("Bishop", "black", "bbishop2");
        this.chess_box.set("bbishop2", bbishop2)
        bbishop2.placing("50");

        let bknight1 = new Knight("Knight", "black", "bknight1");
        this.chess_box.set("bknight1", bknight1);
        bknight1.placing("10");

        let bknight2 = new Knight("Knight", "black", "bknight2");
        this.chess_box.set("bknight2", bknight2);
        bknight2.placing("60");
    }

    addBackgroundColor(id){
        let chess_box_container = document.getElementById("chess_box")
        let clicked_element = document.getElementById(id)
        let current_position = clicked_element.parentNode.id
        let piece= this.chess_box.get(id);

        if(clicked_element.tagName=="IMG" && document.getElementById("urname").innerHTML.toLowerCase().includes(piece.color)){
            clicked_element.style.backgroundColor = "rgb(165, 198, 250)";
    
            let squaresw =chess_box_container.querySelectorAll(".white");
            let squaresb =chess_box_container.querySelectorAll(".black");
        
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
        }else{return}
    }

    removeBackgroundColor(id){
        let chess_box_container = document.getElementById("chess_box")
        let clicked_element = document.getElementById(id)
        let current_position = clicked_element.parentNode.id
        let piece= this.chess_box.get(id);
        
        let squaresw =chess_box_container.querySelectorAll(".white");
        let squaresb =chess_box_container.querySelectorAll(".black");

        if (clicked_element in squaresw){
            clicked_element.style.backgroundColor = "rgb(18, 111, 1)";
        }else{
            clicked_element.style.backgroundColor = "rgb(242, 240, 240)";
        }
        
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
    }

    king_is_alive(){
        let white_alive= false;
        let black_alive= false;
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
}

export default chess_map;