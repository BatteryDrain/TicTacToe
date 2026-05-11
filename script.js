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
            fig.addEventListener("click", async() => {
                const cell = document.getElementById("DOM" + i);
                if((cell.classList.contains("green") || (TURNNUM == 0)) && fig.textContent == ""){
                    fig.textContent = TURN;
                    DISPLAY[i][j] = TURN;
                    for(let i=0; i<9; i++){
                        await win(DISPLAY, i, false);
                    }
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

async function win(Barray, i, isBigBoard = false) {
    let cell = "";
    if (isBigBoard == false) {
        cell = document.getElementById("DOM" + i);
    }

    
    let horazontal, vertical, diagonalL, diagonalR;

    if (isBigBoard) {
        // Logic for 1D array (DONE)
        horazontal = Barray[0] + Barray[1] + Barray[2] + "n" + Barray[3] + Barray[4] + Barray[5] + "n" + Barray[6] + Barray[7] + Barray[8];
        vertical = Barray[0] + Barray[3] + Barray[6] + "n" + Barray[1] + Barray[4] + Barray[7] + "n" + Barray[2] + Barray[5] + Barray[8];
        diagonalL = Barray[0] + Barray[4] + Barray[8];
        diagonalR = Barray[2] + Barray[4] + Barray[6];
    } else {
        // Logic for 2D array (DISPLAY[i])
        horazontal = Barray[i][0] + Barray[i][1] + Barray[i][2] + "n" + Barray[i][3] + Barray[i][4] + Barray[i][5] + "n" + Barray[i][6] + Barray[i][7] + Barray[i][8];
        vertical = Barray[i][0] + Barray[i][3] + Barray[i][6] + "n" + Barray[i][1] + Barray[i][4] + Barray[i][7] + "n" + Barray[i][2] + Barray[i][5] + Barray[i][8];
        diagonalL = Barray[i][0] + Barray[i][4] + Barray[i][8];
        diagonalR = Barray[i][2] + Barray[i][4] + Barray[i][6];
    }

    const CHECK = ["XXX", "OOO"];
    for (let check = 0; check < 2; check++) {
        const combo = CHECK[check];
        if (horazontal.includes(combo) || vertical.includes(combo) || diagonalL === combo || diagonalR === combo) {
            if (isBigBoard) {
                alert(combo[0] + " WINS!");
                return; 
            } else if (DONE[i] == 0) {
                await fade(cell, 0);
                cell.style.backgroundColor = "";
                DONE[i] = combo[0];
                cell.textContent = combo[0];
                cell.style.padding = "3vw 6vw";
                
                await win(DONE, 0, true);
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
