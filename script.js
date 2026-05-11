const pieceSPC = document.getElementById("piece");
const bordSPC = document.getElementById("game");

let TURN = "X";
let DISPLAY = [];
let TURNNUM = 0;
let DONE = [0,0,0,0,0,0,0,0,0];

populate();


function populate() {
    for(let i=0; i<9; i++){
        const bfig = document.createElement('figure');
        bfig.classList.add("dom");
        bfig.id = "DOM" + i;
        bordSPC.appendChild(bfig);
        let temp = [];
        for(let j=0; j<9; j++){
            const fig = document.createElement('figure');
            fig.classList.add("sub");
            fig.addEventListener("click", () => {
                const cell = document.getElementById("DOM" + i);
                if((cell.classList.contains("green") || (TURNNUM == 0)) && fig.textContent == ""){
                    fig.textContent = TURN;
                    DISPLAY[i][j] = TURN;
                    win();
                    flip();
                    green(i,j);
                    TURNNUM++;
                }
            });
            if(fig.textContent != ""){
                temp.push(fig.textContent);
            } else {
                temp.push("-");
            }
            bfig.appendChild(fig);
        }
        DISPLAY.push(temp);
    }
    console.log(DISPLAY);
}

function flip(){
    if(TURN == "X"){
        TURN = "O";
    } else if(TURN == "O"){
        TURN = "X";
    }
    pieceSPC.textContent = "click to place " + TURN;
}

async function win(){
    for(let i=0; i<9; i++){
        const cell = document.getElementById("DOM" + i);
        let temp = "";
        temp = DISPLAY[i][0] + DISPLAY[i][1] + DISPLAY[i][2] + "n" + DISPLAY[i][3] + DISPLAY[i][4] + DISPLAY[i][5] + "n" + DISPLAY[i][6] + DISPLAY[i][7] + DISPLAY[i][8];
        const horazontal = temp;
        temp = "";
        temp = DISPLAY[i][0] + DISPLAY[i][3] + DISPLAY[i][6] + "n" + DISPLAY[i][1] + DISPLAY[i][4] + DISPLAY[i][7] + "n" + DISPLAY[i][2] + DISPLAY[i][5] + DISPLAY[i][8];
        const vertical = temp;
        temp = "";
        for(let j=0; j<9; j++){
            const list = [0,4,8];
            if(list.includes(j)){
                temp = temp + DISPLAY[i][j];
            }
        }
        const diagonalL = temp;
        temp = "";
        for(let j=0; j<9; j++){
            const list = [2,4,6];
            if(list.includes(j)){
                temp = temp + DISPLAY[i][j];
            }
        }
        const diagonalR = temp;
        const CHECK = ["XXX","OOO"];
        for( let check=0; check<2; check++){
            if(horazontal.includes(CHECK[check])){
                if(DONE[i] == 0){
                    await fade(cell, 0);
                    cell.style.backgroundColor = "";
                    DONE[i] = 1;
                }
                cell.textContent = CHECK[check][0];
                cell.style.padding = "3vw 6vw";
                console.log("winH " + horazontal);
            }else if(vertical.includes(CHECK[check])){
                if(DONE[i] == 0){
                    await fade(cell, 0);
                    cell.style.backgroundColor = "";
                    DONE[i] = 1;
                }
                cell.textContent = CHECK[check][0];
                cell.style.padding = "3vw 6vw";
                console.log("winV " + vertical);
            }else if(diagonalL == CHECK[check]){
                if(DONE[i] == 0){
                    await fade(cell, 0);
                    cell.style.backgroundColor = "";
                    DONE[i] = 1;
                }
                cell.textContent = CHECK[check][0];
                cell.style.padding = "3vw 6vw";
                console.log("winDL " + diagonalL);
            }else if(diagonalR == CHECK[check]){
                if(DONE[i] == 0){
                    await fade(cell, 0);
                    cell.style.backgroundColor = "";
                    DONE[i] = 1;
                }
                cell.textContent = CHECK[check][0];
                cell.style.padding = "3vw 6vw";
                console.log("winDR " + diagonalR);
            } else if(!DISPLAY[i].includes("-")){
            cell.innerHTML = "";
            }
        }
    }
}

function green(big,small){
    for(let i=0; i<9; i++){
        const cell = document.getElementById("DOM" + i);
        cell.classList.remove("green");
    }
    const cellToGreen = document.getElementById("DOM" + small);
    const text = cellToGreen.innerHTML
    console.log(text);
    if(text[0] == "<"){
        cellToGreen.classList.add("green");
    } else {
        for(let i=0; i<9; i++){
            const cell = document.getElementById("DOM" + i);
            const text = cell.innerHTML
            if(text[0] == "<"){
                cell.classList.add("green");
            }
        }
    }
}

function fade(cell, transparent) {
    return new Promise((resolve) => {
        cell.style.backgroundColor = "rgba(255, 0, 0, " + transparent + ")";
        
        if (transparent >= 1) {
            resolve();
        } else {
            setTimeout(() => {
                fade(cell, transparent + 0.1).then(resolve);
            }, 150);
        }
    });
}
