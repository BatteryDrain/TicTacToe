const bigX = document.getElementById("bigx");
const bigO = document.getElementById("bigo");
const fig1 = document.getElementById("cell1");
const fig2 = document.getElementById("cell2");
const fig3 = document.getElementById("cell3");
const fig4 = document.getElementById("cell4");
const fig5 = document.getElementById("cell5");
const fig6 = document.getElementById("cell6");
const fig7 = document.getElementById("cell7");
const fig8 = document.getElementById("cell8");
const fig9 = document.getElementById("cell9");

const cells = [fig1, fig2, fig3, fig4, fig5, fig6, fig7, fig8, fig9];

// Desktop Drag Support
bigX.addEventListener('dragstart', (e) => {
    e.dataTransfer.setData("text/plain", "X");
});

bigO.addEventListener('dragstart', (e) => {
    e.dataTransfer.setData("text/plain", "O");
});

// Mobile Touch Support
function handleMove(e) {
    e.preventDefault();
    const touch = e.targetTouches[0];
    const target = e.target;

    // 1. Critical: Disable pointer events so we can "see" the cell under the finger
    target.style.pointerEvents = "none"; 
    target.style.position = "absolute";
    target.style.left = (touch.pageX - 25) + 'px'; 
    target.style.top = (touch.pageY - 25) + 'px';
}

function handleEnd(e) {
    const touch = e.changedTouches[0];
    const target = e.target;

    // 2. Find the cell at the drop point
    const elementBelow = document.elementFromPoint(touch.clientX, touch.clientY);
    const cell = elementBelow ? elementBelow.closest('.cell-class') : null;

    if (cell && cells.includes(cell)) {
        // Use ID check like your previous logic
        cell.textContent = target.id === "bigx" ? "X" : "O";
    }

    // 3. Reset the piece styles so it can be dragged again
    target.style.position = "static";
    target.style.pointerEvents = "auto";
}

bigX.addEventListener('touchmove', handleMove);
bigX.addEventListener('touchend', handleEnd);
bigO.addEventListener('touchmove', handleMove);
bigO.addEventListener('touchend', handleEnd);

// Desktop Drop Logic
cells.forEach(cell => {
    cell.addEventListener('dragover', (e) => {
        e.preventDefault(); 
    });

    cell.addEventListener('dragenter', (e) => {
        cell.classList.add('highlight');
    });

    cell.addEventListener('dragleave', () => {
        cell.classList.remove('highlight');
    });

    cell.addEventListener('drop', (e) => {
        cell.classList.remove('highlight');
        const piece = e.dataTransfer.getData("text/plain");
        
        if (piece === "X") {
            cell.textContent = "X";
        } else if (piece === "O") {
            cell.textContent = "O";
        }
    });
});
