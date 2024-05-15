import Gameboard from './gameboard';

export default function Player(name, type = 'player') {
  const gameboard = Gameboard();

  // cache DOM
  const gameContainer = document.querySelector('.game-container');

  function render() {
    const playerContainer = document.createElement('div');
    const gameboardContainer = document.createElement('div');
    const playerName = document.createElement('p');

    playerContainer.classList.add('player-container');
    gameboardContainer.classList.add('gameboard-container');
    playerName.classList.add('player-name');

    playerName.textContent = `Player: ${name}`;

    gameContainer.appendChild(playerContainer);
    playerContainer.appendChild(gameboardContainer);
    playerContainer.appendChild(playerName);

    gameboard.render(gameboardContainer);
  }

  return {
    name,
    type,
    gameboard,
    render,
  };
}
