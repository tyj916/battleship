export default function Gameboard(rows = 10, cols = 10) {
  const gameboard = [];

  for (let i = 0; i < rows; i++) {
    gameboard.push([]);

    for (let j = 0; j < cols; j++) {
      gameboard[i].push(null);
    }
  }

  function placeShip(ship, coordinate) {
    const x = coordinate[0];
    const y = coordinate[1];
    const shipLength = ship.length;

    if (gameboard[x][y] !== null) return;
    if (x + shipLength >= 10 || y + shipLength >= 10) return;

    for (let i = 0; i < shipLength; i++) {
      gameboard[x][y + i] = ship;
    }
  }

  return {
    gameboard,
    placeShip,
  };
}
