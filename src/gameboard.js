export default function Gameboard(rows = 10, cols = 10) {
  const gameboard = [];

  for (let i = 0; i < rows; i++) {
    gameboard.push([]);

    for (let j = 0; j < cols; j++) {
      gameboard[i].push(null);
    }
  }

  function placeShip(ship, coordinate, direction = 'horizontal') {
    const x = coordinate[0];
    const y = coordinate[1];
    const shipLength = ship.length;

    // if coordinate out of board
    if (x < 0 || x >= 10 || y < 0 || y >= 10) return;

    // if target coordinate has ship
    if (gameboard[x][y] !== null) return;

    // if ship length is too long for the board
    if (x + shipLength >= 10 || y + shipLength >= 10) return;

    for (let i = 0; i < shipLength; i++) {
      if (direction === 'horizontal') {
        gameboard[x][y + i] = ship;
      } else {
        gameboard[x + i][y] = ship;
      }
    }
  }

  return {
    gameboard,
    placeShip,
  };
}
