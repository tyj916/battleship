import Ship from './ship';

export default function Gameboard(rows = 10, cols = 10) {
  const gameboard = [];
  const hitCoordinate = [];
  const missedAttacks = [];

  for (let i = 0; i < rows; i++) {
    gameboard.push([]);

    for (let j = 0; j < cols; j++) {
      gameboard[i].push(null);
    }
  }

  function render(container) {
    const gameboardEl = document.createElement('div');
    gameboardEl.classList.add('gameboard');

    for (let i = 0; i < rows; i++) {
      const row = document.createElement('div');
      row.classList.add('row');

      for (let j = 0; j < cols; j++) {
        const node = document.createElement('div');
        node.classList.add('node');

        if (gameboard[i][j] instanceof Object) {
          node.classList.add('ship');
        }

        row.appendChild(node);
      }

      gameboardEl.appendChild(row);
    }

    container.appendChild(gameboardEl);
  }

  function isPathClear(shipLength, x, y, direction) {
    for (let i = 0; i < shipLength; i++) {
      if (direction === 'horizontal') {
        if (gameboard[x][y + i] !== null) return false;
      } else {
        // eslint-disable-next-line no-lonely-if
        if (gameboard[x + i][y] !== null) return false;
      }
    }

    return true;
  }

  function placeShip(ship, coordinate, direction = 'horizontal') {
    const x = coordinate[0];
    const y = coordinate[1];
    const shipLength = ship.length;

    // if target coordinate out of board
    if (x < 0 || x >= rows || y < 0 || y >= cols) return;

    // if target path has ship
    if (!isPathClear(shipLength, x, y, direction)) return;

    // if ship length is too long for the board
    if (x + shipLength > rows || y + shipLength > cols) return;

    for (let i = 0; i < shipLength; i++) {
      if (direction === 'horizontal') {
        gameboard[x][y + i] = ship;
      } else {
        gameboard[x + i][y] = ship;
      }
    }
  }

  function isHitBefore(coordinate) {
    const x = coordinate[0];
    const y = coordinate[1];

    for (let i = 0; i < hitCoordinate.length; i++) {
      if (hitCoordinate[i][0] === x && hitCoordinate[i][1] === y) {
        return true;
      }
    }

    return false;
  }

  function isAllShipsSunk() {
    for (let i = 0; i < gameboard.length; i++) {
      for (let j = 0; j < gameboard[i].length; j++) {
        if (gameboard[i][j] instanceof Ship && !gameboard[i][j].isSunk()) {
          return false;
        }
      }
    }

    return true;
  }

  function reportAllShipsSunk() {
    console.log('All ships sunk');
  }

  function receiveAttack(coordinate) {
    if (isHitBefore(coordinate)) return;

    hitCoordinate.push(coordinate);

    const x = coordinate[0];
    const y = coordinate[1];

    if (gameboard[x][y] === null) {
      gameboard[x][y] = 'missed';
      missedAttacks.push(coordinate);
    } else {
      gameboard[x][y].hit();

      if (gameboard[x][y].isSunk() && isAllShipsSunk()) {
        reportAllShipsSunk();
      }
    }
  }

  return {
    gameboard,
    render,
    placeShip,
    receiveAttack,
    getMissedAttacks: () => missedAttacks,
  };
}
