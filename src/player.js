import Gameboard from './gameboard';

export default function Player(name, type = 'player') {
  const gameboard = Gameboard();

  function render(container) {
    const gameboardContainer = document.createElement('div');
    const playerName = document.createElement('p');

    gameboardContainer.classList.add('gameboard-container');
    playerName.classList.add('player-name');

    playerName.textContent = `Player: ${name}`;

    container.appendChild(gameboardContainer);
    container.appendChild(playerName);

    gameboard.render(gameboardContainer);
  }

  return {
    name,
    type,
    gameboard,
    render,
  };
}
