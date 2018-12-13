console.log("script run")

var board = [];
var rows = 5
var columns = 5
var numberOfMines = 5
var numberOfCats = 5
var empty = 0
var mine = 5
var score = 0
var scoreDisplay = document.getElementById("score");
var minesDisplay = document.getElementById("mines");
var gameState = 1
var endGame = false
var t
var timerOn = false

<<<<<<< HEAD
scoreDisplay.innerHTML= "Don't trigger the cat..."

replay.innerHTML = '<a href="easy.html">'+'<img src = "Images/replay.png"/>'+'</a>';
minesDisplay.innerHTML = "Hidden Cats: " + numberOfCats;
=======
scoreDisplay.innerHTML= "Don't trigger the cats..."

replay.innerHTML = '<a href="easy.html">'+'<img src = "Images/replay.png"/>'+'</a>';
minesDisplay.innerHTML = "Cats hidden: " + numberOfCats;
>>>>>>> master

var counter = -1;//set this to what ever you want the start # to be
    //call the function once
function countUP () {
    counter++;//increment the counter by 1
    t = setTimeout ( "countUP()", 1000 );//runs itsself after 1000 miliseconds
    timerOn = true
    display.textContent = counter
}

//initiate map coordinates in 2d array
for (var i = 0; i < rows; i++) {
    board.push([empty])
    for (var j = 0; j < columns; j++) {
    board[i][j] = empty;
    }
}

document.addEventListener("contextmenu", function(e){
      e.preventDefault();
    }, false);

//0 = clear
//1 = mine
//create and set random mines
for (var i = 0; i < numberOfMines; i++){
    var randomRow = getRandom(0, rows - 1)
    var randomColumn = getRandom(0, columns - 1)

    //check if position is already mine - reset loop -1
    if (board[randomRow][randomColumn] == mine) {
        i -= 1
    }else {
        // place a mine
        board[randomRow][randomColumn] = mine;

        // change the cell to the right to +1 if cell is not mine

        // also for left

        // also for up
    }
}

function getRandom(min, max){
return Math.floor((Math.random() * max) + min);
}

var table = document.getElementById("minesweeper")
console.log(table)

for (var i = 0; i < rows; i++){
    var tableRow = document.createElement("tr")
    tableRow.id = "tr-"+i
    for(var j = 0; j < columns; j++){
        var tableColumn = document.createElement("td")
        tableColumn.id = "td-"+j

        var button = document.createElement("button")
        button.id = "button-"+i+"-"+j
        button.class
        //debug print board values
        // button.innerHTML = board[i][j]
        button.addEventListener("mousedown", onCellClick)

        tableColumn.appendChild(button)

        tableRow.appendChild(tableColumn)
    }
    table.appendChild(tableRow)
}


function onCellClick(event){

    var click = event.which
    var button = event.srcElement
    var tableColumn = button.parentNode
    var tableRow = tableColumn.parentNode

    var row = Number(tableRow.id.substring(3))
    var column = Number(tableColumn.id.substring(3))

    console.log(row, column)

    document.getElementById("button-"+row+"-"+column).style.backgroundColor = "#77dd77";

    document.getElementById("button-"+row+"-"+column).style.borderColor = "green";

        //set flag
        if (click == 3){
            new Audio('Audio/bell.mp3').play()
            button.innerHTML = '<img src="Images/fishbone.png" />';

            if (board[row][column]==mine){
                numberOfCats = numberOfCats - 1;
                minesDisplay.innerHTML = "Hidden Cats: " + numberOfCats;
            }

            if (numberOfCats == 0 && endGame == false){
            scoreDisplay.innerHTML = "You took: " + counter + " seconds";
            clearTimeout(t)
            timerOn = false
            }

        } else if (click == 1) {
        //check for mine
        if (board[row][column] == mine){
        new Audio('Audio/meow.mp3').play()
        button.innerHTML = '<img src="Images/cat.png" />';
        numberOfCats = numberOfCats - 1;
        minesDisplay.innerHTML = "Hidden Cats: " + numberOfCats;
        endGame = true;
        resultsPrompt();
        } else {

        new Audio('Audio/button.mp3').play()
        checkSurroundings(row, column)


        // if(adjacentBombs == 0){
        //     button.innerHTML = adjacentBombs;
        // }else{
            //     button.innerHTML = adjacentBombs;
            // }
    }}
}

function checkSurroundings(row, column){
    new Audio('Audio/button.mp3').play()
    if (document.getElementById("button-"+row+"-"+column).innerHTML != ""){

        return
    }

    console.log("check surroundings on", row, column)
    var adjacentBombs = 0

    var directions = [[-1,-1], [-1,0], [-1, 1], [0,-1],[0,1],[1,-1], [1,0], [1,1]]

    for(var i = 0; i < 8; i++){
        var newRow = row + directions[i][0]
        var newColumn = column + directions[i][1]

        if(newRow >= 0 && newRow < rows && newColumn >= 0 && newColumn < columns){
            if (board[newRow][newColumn] == mine){
                adjacentBombs += 1
                document.getElementById("button-"+row+"-"+column).style.backgroundColor = "#77dd77";

                document.getElementById("button-"+row+"-"+column).style.borderColor = "green";
            }
        }
    }


    if (adjacentBombs == 0) {
        document.getElementById("button-"+row+"-"+column).innerHTML = "."
        for(var i = 0; i < 8; i++){
            var newRow = row + directions[i][0]
            var newColumn = column + directions[i][1]

            if(newRow >= 0 && newRow < rows && newColumn >= 0 && newColumn < columns){
                checkSurroundings(newRow, newColumn)
                document.getElementById("button-"+row+"-"+column).style.backgroundColor = "#77dd77";

                document.getElementById("button-"+row+"-"+column).style.borderColor = "green";
            }
        }
    }else {
        document.getElementById("button-"+row+"-"+column).innerHTML = adjacentBombs
    }
}


function resultsPrompt(){
    scoreDisplay.innerHTML = "You lost!" ;
    replay.innerHTML = '<a href="easy.html">'+'<img src = "Images/replay.png"/>'+'</a>' ;
    clearTimeout(t)
    timerOn = false

}

window.onload = function () {
        display = document.getElementById('timer');
        countUP ();
};

if (numberOfCats == 0){
    scoreDisplay.innerHTML = "You took: " + counter + "seconds";
}
