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

test('Place a ship out of the gameboard', () => {
  const gameboard = Gameboard();
  const ship5 = Ship(5);
  gameboard.placeShip(ship5, [-1, -1]);

  expect(gameboard.gameboard[1][0]).not.toEqual(ship5);
  expect(gameboard.gameboard[1][0]).toBeNull();
});

test('Place a ship length out of the gameboard', () => {
  const gameboard = Gameboard();
  const ship5 = Ship(5);
  gameboard.placeShip(ship5, [1, 6]);

  expect(gameboard.gameboard[1][6]).not.toEqual(ship5);
  expect(gameboard.gameboard[1][6]).toBeNull();
});

test('Collapse ship coordinate', () => {
  const gameboard = Gameboard();
  const ship5 = Ship(5);
  const ship3 = Ship(3);
  gameboard.placeShip(ship5, [1, 2]);
  gameboard.placeShip(ship3, [1, 2]);

  expect(gameboard.gameboard[1][2]).toEqual(ship5);
  expect(gameboard.gameboard[1][3]).toEqual(ship5);
  expect(gameboard.gameboard[1][4]).toEqual(ship5);
  expect(gameboard.gameboard[1][5]).toEqual(ship5);
  expect(gameboard.gameboard[1][6]).toEqual(ship5);
});

test('Collapse ship body', () => {
  const gameboard = Gameboard();
  const ship5 = Ship(5);
  const ship3 = Ship(3);
  gameboard.placeShip(ship5, [1, 2]);
  gameboard.placeShip(ship3, [0, 3], 'vertical');

  expect(gameboard.gameboard[1][2]).toEqual(ship5);
  expect(gameboard.gameboard[1][3]).toEqual(ship5);
  expect(gameboard.gameboard[1][4]).toEqual(ship5);
  expect(gameboard.gameboard[1][5]).toEqual(ship5);
  expect(gameboard.gameboard[1][6]).toEqual(ship5);
});

test('Place ship vertically', () => {
  const gameboard = Gameboard();
  const ship3 = Ship(3);
  gameboard.placeShip(ship3, [1, 2], 'vertical');

  expect(gameboard.gameboard[1][2]).toEqual(ship3);
  expect(gameboard.gameboard[2][2]).toEqual(ship3);
  expect(gameboard.gameboard[3][2]).toEqual(ship3);
});

test('Receive attack at target empty coordinate', () => {
  const gameboard = Gameboard();
  gameboard.receiveAttack([1, 2]);

  expect(gameboard.gameboard[1][2]).toBe('missed');
});

test('Receive attack at target coordinate with ship', () => {
  const gameboard = Gameboard();
  const ship3 = Ship(3);
  gameboard.placeShip(ship3, [1, 2]);
  gameboard.receiveAttack([1, 2]);

  expect(gameboard.gameboard[1][2].getHitCount()).toBe(1);
  expect(gameboard.gameboard[1][3].getHitCount()).toBe(1);
  expect(gameboard.gameboard[1][4].getHitCount()).toBe(1);
});

test('Attack same coordinate twice', () => {
  const gameboard = Gameboard();
  const ship3 = Ship(3);
  gameboard.placeShip(ship3, [1, 2]);
  gameboard.receiveAttack([1, 2]);
  gameboard.receiveAttack([1, 2]);

  expect(gameboard.gameboard[1][2].getHitCount()).toBe(1);
  expect(gameboard.gameboard[1][3].getHitCount()).toBe(1);
  expect(gameboard.gameboard[1][4].getHitCount()).toBe(1);
});

test('Get missed attacks', () => {
  const gameboard = Gameboard();
  const ship3 = Ship(3);
  gameboard.placeShip(ship3, [1, 2]);
  gameboard.receiveAttack([0, 1]);
  gameboard.receiveAttack([0, 2]);
  gameboard.receiveAttack([1, 2]);
  gameboard.receiveAttack([1, 3]);
  gameboard.receiveAttack([2, 3]);
  expect(gameboard.getMissedAttacks()).toEqual([
    [0, 1],
    [0, 2],
    [2, 3],
  ]);
});
