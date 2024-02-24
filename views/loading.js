
// const socket = io()

// let btn = document.getElementById("submit");
// let text = document.getElementById("username");
// let data;

// btn.addEventListener("click", ()=>{
//     let name= text.value;
//     socket.emit("name", name);
// })

// socket.on("find", (playingArray1)=>{

//     let name = text.value;
//     let playingArray= playingArray1[playingArray1.length -1];
//     let value;
//     let oppname;
//     let playercolor;
//     let player;

//     if(name==playingArray.p1.pname){
//         player = "player1";
//         value = playingArray.p1.pname;
//         oppname = playingArray.p2.pname;
//         playercolor = playingArray.p1.pvalue;
//     }
//     else{
//         player="player2";
//         value = playingArray.p2.pname;
//         oppname = playingArray.p1.pname;
//         playercolor = playingArray.p1.pvalue;   
//     }
//     console.log(player)
//     data = { value, oppname, player };
//     console.log(data)

//     socket.emit("getpage")

// }) 



// // socket.on("navigate", function data(url){
// //     window.location.href = url;
// // })