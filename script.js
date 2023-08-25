const cells = document.querySelectorAll('.cell');
let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];

const status = document.getElementById('status');
const resetButton = document.getElementById('reset-button');

cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});

function handleCellClick(e) {
    const cell = e.target;
    const cellIndex = parseInt(cell.id.split('-')[1]);

    if (gameBoard[cellIndex] === '' && !checkWin() && !checkTie()) {
        cell.textContent = currentPlayer;
        gameBoard[cellIndex] = currentPlayer;
        cell.style.backgroundColor = currentPlayer === 'X' ? '#ffc107' : '#4caf50';
        if (checkWin()) {
            announceWinner(currentPlayer);
        } else if (checkTie()) {
            announceTie();
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            updateStatus();
        }
    }
}

function checkWin() {
    const winCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    for (const combination of winCombinations) {
        const [a, b, c] = combination;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            return true;
        }
    }

    return false;
}

function checkTie() {
    return gameBoard.every(cell => cell !== '');
}

function announceWinner(player) {
    setTimeout(() => {
        alert(`Player ${player} wins!`);
        resetGame();
    }, 10);
}

function announceWinner(player) {
    setTimeout(() => {
        status.textContent = `Player ${player} wins!`;
        resetButton.style.display = 'block';
    }, 10);
}

function announceTie() {
    setTimeout(() => {
        status.textContent = "It's a tie!";
        resetButton.style.display = 'block';
    }, 10);
}

function updateStatus() {
    status.textContent = `Player ${currentPlayer}'s Turn`;
}

function resetGame() {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    cells.forEach(cell => {
        cell.textContent = '';
        cell.style.backgroundColor = '#fff';
    });
    status.textContent = `Player ${currentPlayer}'s Turn`;
    resetButton.style.display = 'none';
}

updateStatus();

resetButton.addEventListener('click', resetGame);

