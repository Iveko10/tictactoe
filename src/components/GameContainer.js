import React, { Component } from 'react'
import '../table.css';

const PlayerX = {
    value: "X",
}

const PlayerO = {
    value: "O",
}

//const playerStrategy = {
//    1: "horizontal",
//    2: "vertical",
//    3: "diagonal",
//    4: "random"
//}

const playerStrategy = {
    1: "vertical",
    2: "vertical",
    3: "vertical",
    4: "vertical"
}

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

let board = Array.from(Array(9).keys());
const cells = document.getElementsByClassName('cell');


export class GameContainer extends Component {
    constructor(props){
        super(props)

        this.state = {
            squares: Array(9).fill(null),
            playerMove: 0,              // 0 - X's turn, 1 - O's turn
            tmp_move : Array(9).fill(null),
            //board : board
        }

        let matchResult = "";
        
    }

    componentDidMount(){
        console.log( this.props.round + " mounted")
        this.matchResult = "";
    }

    componentDidUpdate(){
        //console.log(this.props.round + " round");
        board = Array.from(Array(9).keys());
        
        //this.runGame()

    }

    getPlayer(){
        const player = this.state.playerMove;
        this.setState({ playerMove: (player+1) % 2 });
        return player;
    }

    checkAvailability(myArray, index){
        if (myArray[index] === null){
            return true;
        }
        return false;
    }

    updateBoard(playerValue){
        //console.log(cells)
        for (let i = 0; i < cells.length; i++) {
            cells[i].innerHTML = board[i];
        }

        let plays = board.reduce((a, e, i) => {
            return (e === playerValue) ? a.concat(i) : a;
          }, []);
          let gameWon = false;
          for (let [index, win] of winningCombinations.entries()) {
            if (win.every(elem => plays.indexOf(elem) > -1)) { 
              gameWon = { 
                index: index,
                playerValue: playerValue
              };
              break;
            }
          }
          return gameWon;
    }


    runGame(){
        let index = 0;
        let tmp_arr = Array.from(Array(9).keys());
        let didWin = false;
        while(tmp_arr.length > 0){
            let position = tmp_arr[Math.floor(Math.random() * tmp_arr.length)];     //rand index/position
            //console.log(position);
            const value = index % 2 === 0 ? "X" : "O";
            board[position] = value;

            //checkIfWon
            didWin = this.updateBoard(value)
            if(didWin){
                console.log("Player " + value + " won");
                this.matchResult = "Player " + value + " won";
                break;
            } 

            index += 1;
            let id = tmp_arr.indexOf(position);
            tmp_arr.splice(id, 1);
        }
        if(!didWin){
            console.log("DRAW");
            this.matchResult = "GAME ENDS WITH A DRAW";
        }
        console.log("board is: " + board);
       
    }

    render() {
        console.log(this.props.round + " round");
        this.runGame();

        return (
            <div>
               <h2>Tic Tac Toe</h2>
               <div className="container" style={styles.container}>
                   <p>Round: {this.props.round}</p>
                    <table>
                        <tr className="row" id="0">
                            <td className="cell" id="0"></td>
                            <td className="cell" id="1"></td>
                            <td className="cell" id="2"></td>
                        </tr>
                        <tr className="row" id="1">
                            <td className="cell" id="3"></td>
                            <td className="cell" id="4"></td>
                            <td className="cell" id="5"></td>
                        </tr>
                        <tr className="row" id="2">
                            <td className="cell" id="6"></td>
                            <td className="cell" id="7"></td>
                            <td className="cell" id="8"></td>
                        </tr>    
                    </table> 
                    <p> Strategy used: {playerStrategy[this.props.playerStrategy]}</p> 
                    <p>move: {this.state.tmp_move}</p>
                    <h2>{this.matchResult}</h2> 
                    
                </div> 
            </div>
        )
    }
}


const styles = {
    container: {
        minHeight: 600 + "px",
        width: 100+"%",
    },
    
}

export default GameContainer
