document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('.cell');
    const message = document.getElementById('message');
    const restartButton = document.getElementById('restart');
    let currentPlayer = 'X';
    let board = Array(9).fill(null);
    let gameOver = false;

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

    function checkWin() {
        for (const combination of winningCombinations) {
            const [a, b, c] = combination;
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                return board[a];
            }
        }
        return null;
    }

    function handleClick(e) {
        const index = e.target.dataset.index;
        if (!board[index] && !gameOver) {
            board[index] = currentPlayer;
            e.target.textContent = currentPlayer;
            const winner = checkWin();
            if (winner) {
                message.textContent = `${winner} wins!`;
                gameOver = true;
            } else if (board.every(cell => cell)) {
                message.textContent = 'It\'s a tie!';
                gameOver = true;
            } else {
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
                message.textContent = `${currentPlayer}'s turn`;
            }
        }
    }

    function restartGame() {
        board = Array(9).fill(null);
        cells.forEach(cell => cell.textContent = '');
        currentPlayer = 'X';
        gameOver = false;
        message.textContent = `${currentPlayer}'s turn`;
    }

    cells.forEach(cell => cell.addEventListener('click', handleClick));
    restartButton.addEventListener('click', restartGame);

    message.textContent = `${currentPlayer}'s turn`;
});
