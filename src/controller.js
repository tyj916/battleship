import Player from './player';
import Ship from './ship';

export default function gameController(
  playerOneName = 'Player 1',
  playerTwoName = 'Computer',
) {
  const player1 = Player(playerOneName);
  const player2 = Player(playerTwoName, 'computer');

  player1.gameboard.placeShip(Ship(5), [1, 2]);
  player2.gameboard.placeShip(Ship(5), [1, 2]);

  let activePlayer = player1;
  let message = `It's ${activePlayer.name}'s turn.`;
  let isGameover = false;

  // cache DOM
  const gameContainer = document.querySelector('.game-container');
  const messageContainer = gameContainer.querySelector('.game-message');
  const p1Container = gameContainer.querySelector('.player-container.player-1');
  const p2Container = gameContainer.querySelector('.player-container.player-2');

  function getTargetBoardElement() {
    return activePlayer === player1
      ? p2Container.querySelector('.gameboard')
      : p1Container.querySelector('.gameboard');
  }

  // activate opponent's board event listener according to current active player
  function activateBoard() {
    const targetBoardEl = getTargetBoardElement();
    targetBoardEl.classList.add('active', 'hide-ship');
    targetBoardEl.addEventListener('click', (e) => {
      const targetRow = +e.target.dataset.row;
      const targetCol = +e.target.dataset.col;

      // eslint-disable-next-line no-use-before-define
      playRound(targetRow, targetCol);
    });
  }

  function render() {
    messageContainer.textContent = message;
    p1Container.textContent = '';
    p2Container.textContent = '';
    player1.render(p1Container);
    player2.render(p2Container);

    if (!isGameover) {
      activateBoard();
    }
  }

  function switchActivePlayer() {
    activePlayer = activePlayer === player1 ? player2 : player1;
  }

  function getTargetBoard() {
    return activePlayer === player1 ? player2.gameboard : player1.gameboard;
  }

  function computerPlayRound() {
    while (activePlayer.type === 'computer') {
      const targetRow = Math.floor(Math.random() * 10);
      const targetCol = Math.floor(Math.random() * 10);

      // eslint-disable-next-line no-use-before-define
      playRound(targetRow, targetCol);
    }
  }

  function announceWinner() {
    message += ` Last ship has been destroyed! The winner is ${activePlayer.name}!`;
    isGameover = true;
    render();
  }

  function playRound(targetRow, targetCol) {
    const targetBoard = getTargetBoard();

    if (targetBoard.isHitBefore([targetRow, targetCol])) {
      message = `This cell is selected before! Please try again, ${activePlayer.name}.`;
    } else {
      const attackCondition = targetBoard.receiveAttack([targetRow, targetCol]);

      if (attackCondition === 'hit') {
        message = `${activePlayer.name} hit!`;

        if (targetBoard.gameboard[targetRow][targetCol].isSunk()) {
          if (targetBoard.isAllShipsSunk()) {
            announceWinner();
            return;
          }
          message += ` ${activePlayer.name} has destroyed a ship!`;
        }
      } else {
        message = `${activePlayer.name}'s attack missed.`;
      }

      switchActivePlayer();

      message += ` It's ${activePlayer.name}'s turn.`;

      if (activePlayer.type === 'computer') {
        computerPlayRound();
      }
    }

    render();
  }

  render();
}
