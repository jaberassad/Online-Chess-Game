import Piece from "./piece.js"

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

export default Pawn;