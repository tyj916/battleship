import Ship from './ship';
import Gameboard from './gameboard';
import Player from './player';

export default function game() {
  const player1 = Player('Player 1');
  const player2 = Player('Computer', 'computer');

  function render() {
    player1.gameboard.placeShip(Ship(5), [1, 2]);
    player1.gameboard.placeShip(Ship(3), [3, 1], 'vertical');
    player1.gameboard.placeShip(Ship(4), [6, 6], 'vertical');
    player1.gameboard.receiveAttack([0, 0]);
    player1.render();
    player2.render();
  }

  render();
}
