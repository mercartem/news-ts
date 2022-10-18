/* eslint-disable max-len */
/* eslint-disable no-plusplus */
import './index.html';
import './index.scss';

import createElements from './modules/elements';

// создаем элементы

createElements();
const table = document.querySelector('.table');
const button = document.querySelector('.btn');
const time = document.querySelector('.time');
const moves = document.querySelector('.moves');

// тайминг

let sec = 0;
let min = 0;
let hour = 0;

function timer() {
  sec++;
  if (sec === 60) {
    min++;
    sec = 0;
  }
  if (min === 60) {
    hour++;
    min = 0;
  }
  time.innerHTML = [hour, min, sec].map((e) => (e < 10 ? `0${e}` : e)).join(':');
}

function startTime() {
  setInterval(timer, 1000);
}

startTime();

// создаем и генерируем ячейки таблицы
function createItems() {
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].sort(() => Math.random() - 0.5);
  for (let i = 1; i <= 15; i++) {
    const item = document.createElement('div');
    item.className = 'item';
    item.innerHTML = numbers[i - 1];
    table.append(item);
    const size = document.querySelector('.item').offsetWidth;
    const left = i % 4;
    const top = (i - left) / 4;
    item.style.left = `${left * size}px`;
    item.style.top = `${top * size}px`;
  }
}

createItems();

// перемещение ячеек
let cell = document.querySelectorAll('.item');
const sizeCell = cell[0].offsetWidth;
const empty = {
  left: 0,
  top: 0,
};
let move = 0;

function moveItems(i) {
  const cellStyle = {
    left: cell[i].style.left,
    top: cell[i].style.top,
  };
  const cellLeft = Number(cellStyle.left.replace(/[^0-9]/g, ''));
  const cellTop = Number(cellStyle.top.replace(/[^0-9]/g, ''));
  const differentLeft = cellLeft - empty.left;
  const differentTop = cellTop - empty.top;
  if ((differentLeft === 0 && (differentTop === sizeCell || differentTop === -sizeCell)) || (differentTop === 0 && (differentLeft === sizeCell || differentLeft === -sizeCell))) {
    cell[i].style.left = `${empty.left}px`;
    cell[i].style.top = `${empty.top}px`;
    empty.left = cellLeft;
    empty.top = cellTop;
    move++;
    moves.innerHTML = `Moves: ${move}`;
  }
}

function clickItem() {
  for (let i = 0; i < cell.length; i++) {
    cell[i].addEventListener('click', () => {
      moveItems(i);
    });
  }
}

clickItem();

// перезапуск игры
function restartGame() {
  table.innerHTML = '';
  createItems();
  cell = document.querySelectorAll('.item');
  empty.left = 0;
  empty.top = 0;
  clickItem();
  time.innerHTML = '00:00:00';
  moves.innerHTML = 'Moves: 0';
  sec = 0;
  min = 0;
  hour = 0;
  move = 0;
}

button.addEventListener('click', restartGame);
