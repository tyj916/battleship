import Gameboard from './gameboard';

export default function Player(type) {
  const gameboard = Gameboard();

  return {
    type,
    gameboard,
  };
}
