import Player from './player';
import Ship from './ship';

function createShips() {
  return [
    {
      class: 'Carrier',
      ship: Ship(5),
    },
    {
      class: 'Battleship',
      ship: Ship(4),
    },
    {
      class: 'Destroyer',
      ship: Ship(3),
    },
    {
      class: 'Submarine',
      ship: Ship(3),
    },
    {
      class: 'Patrol Boat',
      ship: Ship(2),
    },
  ];
}

function getRandomCoordinate() {
  const targetRow = Math.floor(Math.random() * 10);
  const targetCol = Math.floor(Math.random() * 10);

  return [targetRow, targetCol];
}

function getRandomDirection() {
  return Math.random() < 0.5 ? 'vertical' : 'horizontal';
}

function randomShipPlacement(player) {
  const ships = createShips();
  ships.forEach((ship) => {
    let isPlaced = false;

    while (!isPlaced) {
      const randomCoordinate = getRandomCoordinate();
      const randomDirection = getRandomDirection();

      isPlaced = player.gameboard.placeShip(
        ship.ship,
        randomCoordinate,
        randomDirection,
      );
    }
  });
}

function gameController(
  playerOneName = 'Player 1',
  playerTwoName = 'Computer',
) {
  const player1 = Player(playerOneName);
  const player2 = Player(playerTwoName, 'computer');

  randomShipPlacement(player1);
  randomShipPlacement(player2);

  let activePlayer = player1;
  let message = `It's ${activePlayer.name}'s turn.`;
  let isGameover = false;

  function switchActivePlayer() {
    activePlayer = activePlayer === player1 ? player2 : player1;
  }

  function getTargetBoard() {
    return activePlayer === player1 ? player2.gameboard : player1.gameboard;
  }

  function computerPlayRound() {
    while (activePlayer.type === 'computer') {
      const [targetRow, targetCol] = getRandomCoordinate();

      // eslint-disable-next-line no-use-before-define
      playRound(targetRow, targetCol);
    }
  }

  function announceWinner() {
    message += ` Last ship has been destroyed! The winner is ${activePlayer.name}!`;
    isGameover = true;
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
  }

  return {
    getActivePlayer: () => activePlayer,
    getPlayerOne: () => player1,
    getPlayerTwo: () => player2,
    getMessage: () => message,
    isGameover: () => isGameover,
    playRound,
  };
}

export default function screenController() {
  const controller = gameController();
  const player1 = controller.getPlayerOne();
  const player2 = controller.getPlayerTwo();

  // cache DOM
  const gameContainer = document.querySelector('.game-container');
  const messageContainer = gameContainer.querySelector('.game-message');
  const p1Container = gameContainer.querySelector('.player-container.player-1');
  const p2Container = gameContainer.querySelector('.player-container.player-2');

  function getTargetBoardElement() {
    return controller.getActivePlayer() === player1
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

      controller.playRound(targetRow, targetCol);
      // eslint-disable-next-line no-use-before-define
      render();
    });
  }

  function render() {
    messageContainer.textContent = controller.getMessage();
    p1Container.textContent = '';
    p2Container.textContent = '';
    player1.render(p1Container);
    player2.render(p2Container);

    if (!controller.isGameover()) {
      activateBoard();
    }
  }

  // init
  render();
}
