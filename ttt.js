var board;
var playerX ='X';
var playerO = 'O'
var currPlayer = playerX;
var gameOver = false;
// starts game onload
window.onload = function (){
    setGame();
}
// Sets up the board
function setGame(){
    board = [
        [' ', ' ', ' '],
        [' ', ' ', ' '],
        [' ', ' ', ' ']
    ]
    // Adds a div as well as classes for the lines
    for(let r = 0; r < 3; r++){
        for(let c = 0; c < 3; c++){
            let tile = document.createElement('div');
            tile.id = r.toString() + '-' + c.toString();
            tile.classList.add('tile');
            // tells which rows and columns to put the line classes
            if (r == 0 || r == 1){
                tile.classList.add('horizontal-line')
            }
            if (c == 0 || c == 1){
                tile.classList.add('vertical-line')
        }
        // Adds even listener and appends board on the click
        tile.addEventListener('click', setTile);
        document.getElementById('board').append(tile);
    }
}}
function setTile(){
    if(gameOver){
        return;
    }
    // splits into subarrays
    let coords = this.id.split('-');
    let r = parseInt(coords[0]);
    let c = parseInt(coords[1]);
    if (board [r][c] != ' '){
        return;
    }
    // Alternates players
    board [r][c] = currPlayer;
    this.innerText = currPlayer;
    if(currPlayer == playerX){
        currPlayer = playerO;
    } else {
        currPlayer = playerX
    }
    checkWinner();
}
// Tells which tiles to check to find winner
function checkWinner(){
    for(let r = 0; r < 3; r++){
        if(board[r][0] == board[r][1] && board[r][1] == board[r][2] && board[r][0] != ' '){
            for(let i = 0; i < 3; i++){
                let tile = document.getElementById(r.toString() + '-' + i.toString());
                tile.classList.add('winner');            
            }
            gameOver=true;
            return;
        }
    }
    for(let c = 0; c < 3; c++){
        if(board[0][c] == board[1][c] && board[1][c] == board[2][c] && board[0][c] != ' '){
            for(let i = 0; i < 3; i++){
                let tile = document.getElementById(i.toString() + '-' + c.toString());
                tile.classList.add('winner');            
            }
            gameOver=true;
            return;
        }
    }
    if(board[0][0] == board[1][1] && board[1][1] == board[2][2] && board[0][0] != ' '){
        for(let i = 0; i < 3; i++){
            let tile = document.getElementById(i.toString() + '-' + i.toString());
            tile.classList.add('winner');            
        }
        gameOver=true;
        return;
    }
    if(board[0][2] == board[1][1] && board[1][1] == board[2][0] && board[0][2] != ' '){
        for(let i = 0; i < 3; i++){
            let tile = document.getElementById('0-2');
            tile.classList.add('winner');   
            tile = document.getElementById('1-1');
            tile.classList.add('winner');   
            tile = document.getElementById('2-0');
            tile.classList.add('winner');        
        }
        gameOver=true;
        return;
    }
}
// adds event listener to the reset button and adds gameReset function
document.getElementById('rest-button').addEventListener('click', gameReset);
// clears the board and then starts the game over
function gameReset() {
    gameOver = false;
    document.getElementById("board").innerHTML = '';
    setGame();

}