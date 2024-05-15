import Ship from './ship';
import Gameboard from './gameboard';
import Player from './player';

export default function game() {
  const player1 = Player('Player 1');
  const player2 = Player('Computer', 'computer');

  function render() {
    player1.render();
    player2.render();
  }

  render();
}
