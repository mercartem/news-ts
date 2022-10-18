export default function createElements() {
  const body = document.querySelector('body');

  const main = document.createElement('main');
  main.className = 'main';
  body.append(main);

  const title = document.createElement('h1');
  title.className = 'title';
  title.innerHTML = 'Gem Puzzle';
  main.append(title);

  const info = document.createElement('div');
  info.className = 'info';
  main.append(info);

  const time = document.createElement('div');
  time.className = 'time';
  time.innerHTML = '00:00:00';
  info.append(time);

  const moves = document.createElement('div');
  moves.className = 'moves';
  moves.innerHTML = 'Moves: 0';
  info.append(moves);

  const table = document.createElement('div');
  table.className = 'table';
  main.append(table);

  const button = document.createElement('button');
  button.className = 'btn';
  button.innerHTML = 'New game';
  main.append(button);
}
