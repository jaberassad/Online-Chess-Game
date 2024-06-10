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

export default Piece;