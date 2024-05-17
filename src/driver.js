import Ship from './ship';
import Player from './player';

export default function game() {
  const player1 = Player('Player 1');
  const player2 = Player('Computer', 'computer');
  player1.gameboard.placeShip(Ship(5), [1, 2]);
  player1.gameboard.placeShip(Ship(3), [3, 1], 'vertical');
  player1.gameboard.placeShip(Ship(4), [6, 6], 'vertical');
  player1.gameboard.receiveAttack([0, 0]);
  player1.gameboard.receiveAttack([1, 2]);
  player1.gameboard.receiveAttack([3, 1]);
  player1.gameboard.receiveAttack([4, 1]);
  player1.gameboard.receiveAttack([5, 1]);

  player2.gameboard.placeShip(Ship(5), [1, 2]);
  player2.gameboard.placeShip(Ship(3), [3, 1], 'vertical');
  player2.gameboard.placeShip(Ship(4), [6, 6], 'vertical');

  let currentPlayer = player1;

  const gameContainer = document.querySelector('.game-container');
  const p1Container = gameContainer.querySelector('.player-1');
  const p2Container = gameContainer.querySelector('.player-2');

  function render() {
    p1Container.textContent = '';
    p2Container.textContent = '';
    player1.render(p1Container);
    player2.render(p2Container);
  }

  function playRound(targetRow, targetCol) {
    const targetBoard =
      currentPlayer === player1 ? player2.gameboard : player1.gameboard;

    if (!targetBoard.isHitBefore([targetRow, targetCol])) {
      targetBoard.receiveAttack([targetRow, targetCol]);
      render();
      // eslint-disable-next-line no-use-before-define
      switchPlayer();
    }
  }

  function boardEventListener(event) {
    if (!event.target.dataset.row || !event.target.dataset.col) {
      return;
    }

    const targetRow = +event.target.dataset.row;
    const targetCol = +event.target.dataset.col;

    playRound(targetRow, targetCol);
  }

  function getTargetBoardElement() {
    return (
      currentPlayer === player1
        ? document.querySelector('.player-2')
        : document.querySelector('.player-1')
    ).querySelector('.gameboard');
  }

  function deactivateBoard() {
    const targetBoard = getTargetBoardElement();
    targetBoard.removeEventListener('click', boardEventListener);
  }

  function activateBoard() {
    const targetBoard = getTargetBoardElement();
    targetBoard.classList.add('active');
    targetBoard.addEventListener('click', boardEventListener);
  }

  function switchPlayer() {
    deactivateBoard();
    currentPlayer = currentPlayer === player1 ? player2 : player1;

    while (currentPlayer.type === 'computer') {
      const targetRow = Math.floor(Math.random() * 10);
      const targetCol = Math.floor(Math.random() * 10);

      playRound(targetRow, targetCol);
    }

    activateBoard();
  }

  render();
  activateBoard();
}
