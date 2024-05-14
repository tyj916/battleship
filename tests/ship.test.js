import Ship from '../src/ship';

test('Ship length', () => {
  const ship5 = Ship(5);
  const ship7 = Ship(7);

  expect(ship5.length).toBe(5);
  expect(ship7.length).toBe(7);
});

test('Hit ship', () => {
  const ship = Ship(5);

  for (let i = 0; i < 7; i++) {
    ship.hit();
  }

  expect(ship.getHitCount()).toBe(5);
});

test('Ship sunk', () => {
  const ship = Ship(5);

  for (let i = 0; i < 5; i++) {
    ship.hit();
  }

  expect(ship.isSunk()).toBeTruthy();
});
