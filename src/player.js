import Gameboard from './gameboard';

export default function Player(name, type = 'player') {
  const gameboard = Gameboard();

  return {
    name,
    type,
    gameboard,
  };
}
