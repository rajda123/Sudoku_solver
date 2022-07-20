var arr = [[], [], [], [], [], [], [], [], []]

for (var i = 0; i < 9; i++) {
	for (var j = 0; j < 9; j++) {
		arr[i][j] = document.getElementById(i * 9 + j);

	}
}


var board = [[], [], [], [], [], [], [], [], []]

function FillBoard(board) {
	for (var i = 0; i < 9; i++) {
		for (var j = 0; j < 9; j++) {
			if (board[i][j] != 0) {
				arr[i][j].innerText = board[i][j]
			}

			else
				arr[i][j].innerText = ''
		}
	}
}

let GetPuzzle = document.getElementById('GetPuzzle')
let SolvePuzzle = document.getElementById('SolvePuzzle')

GetPuzzle.onclick = function () {
	var xhrRequest = new XMLHttpRequest()
	xhrRequest.onload = function () {
		var response = JSON.parse(xhrRequest.response)
		console.log(response)
		board = response.board
		FillBoard(board)
	}
	xhrRequest.open('get', 'https://sugoku.herokuapp.com/board?difficulty=easy')
	//we can change the difficulty of the puzzle the allowed values of difficulty are easy, medium, hard and random
	xhrRequest.send()
}

SolvePuzzle.onclick = () => {
	SudokuSolver(board, 0, 0, 9);
};

function isvalidGrid(board,row,col,num){
    let Rowfactor=row-(row%3);
    let Colfactor=col-(col%3);

    for(let i=0;i<3;i++){
        for(let j=0;j<3;j++){
            if(board[i+Rowfactor][j+Colfactor]==num){
                return false;
            }
        }
    }
    return true;
}
function isvalidCol(board,col,num,n){
    for(let row=0;row<n;row++){
        if(board[row][col]==num){
            return false;
        }
    }
    return true;
}
function isvalidRow(board,row,num,n){
    for(let col=0;col< n;col++){
        if(board[row][col]==num){
            return false;
        }
    }
    return true;
}

//this functon will tell whether it is valid to fill 
function isvalid(board,row,col,num,n){
    if(isvalidRow(board,row,num,n)&& isvalidCol(board,col,num,n) && isvalidGrid(board,row,col,num)){
        return true;
    }
    return false;
}

 function SudokuSolver(board,i,j, n){
    //Base case
    if(i==n){
       // print(board,n);
	   FillBoard(board)
        return true;
    }
    // to be inside the board

    if(j==n){
      return SudokuSolver(board,i+1,0,n);
    }

    //if cell is already filled
    if(board[i][j]!=0){
       return SudokuSolver(board,i,j+1,n);
    }
    //we try to fill the cell with an appropriste no.
    for(let num=1;num<=9;num++){
        //check no. can be filled
        if(isvalid(board,i,j,num,n)){
            board[i][j]=num;
            let subans=SudokuSolver(board,i,j+1,n);
            if(subans){
                return true;
            }
            //backtracking(undo the changes)
            board[i][j]=0;

        }
    }
    return false;
}
