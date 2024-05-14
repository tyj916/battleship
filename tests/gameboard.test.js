import Ship from '../src/ship';
import Gameboard from '../src/gameboard';

test('Place a ship on a coordinate of the gameboard', () => {
  const gameboard = Gameboard();
  const ship5 = Ship(5);
  gameboard.placeShip(ship5, [1, 2]);

  expect(gameboard.gameboard[1][1]).not.toEqual(ship5);
  expect(gameboard.gameboard[1][2]).toEqual(ship5);
  expect(gameboard.gameboard[1][3]).toEqual(ship5);
  expect(gameboard.gameboard[1][4]).toEqual(ship5);
  expect(gameboard.gameboard[1][5]).toEqual(ship5);
  expect(gameboard.gameboard[1][6]).toEqual(ship5);
  expect(gameboard.gameboard[1][7]).not.toEqual(ship5);
});
