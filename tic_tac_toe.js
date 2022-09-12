/*
This function should return an array of all
possible winning combinaisons for a tic tac toe game
*/
function winningCombinations(gridSize) {
    let combinaisons = [];
    const max = gridSize*gridSize;
    //first winning combination: row with same symbol
    for(let i=0; i<max; i=i+gridSize) {
        let option = [];
        for(let j=i; j<i+gridSize;j++) {
            option.push(j);
        }
        if(option.length === gridSize) {
            combinaisons.push(option);
        }
    }
    //second winning combination: column with same symbol
    for(let i=0; i<max; i=i+1) {
        let option = [];
        for(let j=i; j<max;j=j+gridSize) {
            option.push(j);
        }
        if(option.length === gridSize) {
            combinaisons.push(option);
        }
    }
    //third winning combination: \ this way
    for(let i=0; i<max; i=i+1) {
        let option = [];
        for(let j=i; j<max; j=j+gridSize+1) {
            option.push(j);
        }
        if(option.length === gridSize) {
            combinaisons.push(option);
        }
    }
    //fourth winning combination: / this way
    let option = [];
    for(let i=gridSize-1; i<max-1; i=i+gridSize-1) {
        option.push(i);
    }
    if(option.length === gridSize) {
        combinaisons.push(option);
    }
    return combinaisons;
}

/*
This function check if symbol x or o wins
the tic tac toe game
*/
function checkIfSymbolWins(grid, gridSize, symbol = 'x') {
    const round = grid.join('');
    const combinations = winningCombinations(gridSize);
    for(let i = 0; i < combinations.length; i++) {
        combination = combinations[i];
        let matches = 0;
        for(let j = 0; j < combination.length; j++) {
            position = combination[j];
           if(round[position] === symbol) {
               matches++;
           }
           if(matches === gridSize) {
               return true;
           }
        };
    };
    return false; 
}

/*
This function will check if the tic tac toe
game is invalid, otherwise it should check which
symbol won the game
*/
function checkGame(input) {
    let xWon = oWon = invalid = 0;
    input.forEach(element => {
        const round = element.split(' ');
        const gridSize = parseInt(round[0]);
        const [, ...onlyRounds] = round;
        let countX, countO;
        const onlyRound = onlyRounds.join('');
        countX = onlyRound.match(/x/g) ? onlyRound.match(/x/g).length : 0;
        countO = onlyRound.match(/o/g) ? onlyRound.match(/o/g).length : 0;
        //respect turns alternatively
        if(Math.abs(countX - countO) >= 2) {
            invalid++;
        } else {
            //no one played the necessary times to win
            if(countX < gridSize && countO < gridSize) {
                invalid++;
            } else {
                const didXWon = checkIfSymbolWins(onlyRounds, gridSize, 'x');
                const didOWon = checkIfSymbolWins(onlyRounds, gridSize, 'o');
                if(didXWon && !didOWon) {
                    xWon++;
                } else if(!didXWon && didOWon) {
                    oWon++;
                } else if(didXWon && didOWon) {
                    invalid++;
                }
            }
        }
    });
    return { x: (xWon || 0), o: (oWon || 0), invalid };
}

//Test the solution
let grids = [];
grids.push("3x3 xxo oo- oxx");
const result = checkGame(grids);
console.info(`Number of X winning: ${result.x}, Number of O winning: ${result.o}, Invalid games: ${result.invalid}`);