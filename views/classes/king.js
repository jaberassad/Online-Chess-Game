import Piece from "./piece.js"

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

export default King;