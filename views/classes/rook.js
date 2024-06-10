import Piece from "./piece.js"

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

export default Rook;