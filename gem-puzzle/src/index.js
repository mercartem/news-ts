/* eslint-disable max-len */
/* eslint-disable no-plusplus */
import './index.html';
import './index.scss';
import './audio/sound.mp3';

import createElements from './modules/createElements';

// создаем элементы и присваиваем переменным

createElements();
const table = document.querySelector('.table');
const btnNewGame = document.querySelector('.new-game');
const time = document.querySelector('.time');
const moves = document.querySelector('.moves');
const audio = document.querySelector('.sound');
const size9 = document.querySelector('.size-3');
const size16 = document.querySelector('.size-4');
const size25 = document.querySelector('.size-5');
const size36 = document.querySelector('.size-6');
const size49 = document.querySelector('.size-7');
const size64 = document.querySelector('.size-8');
const save = document.querySelector('.save');

// переменные

let sec = 0;
let min = 0;
let hour = 0;
let sound = true; // звук
let sizeOfTable = 16; // размер поля
const empty = { // пустая ячейка
  left: 0,
  top: 0,
};
let move = 0; // кол-во ходов
let gameField; // сохраненное игровое поле

// получаем сохранения

const getLocalStorage = () => {
  if (localStorage.getItem('savedGame')) {
    const objStorage = JSON.parse(localStorage.getItem('savedGame'));
    sec = objStorage.sec;
    min = objStorage.min;
    hour = objStorage.hour;
    sizeOfTable = objStorage.sizeOfTable;
    document.querySelector('.current-size').innerHTML = `Frame size: ${Math.sqrt(sizeOfTable)}x${Math.sqrt(sizeOfTable)}`;
    move = objStorage.move;
    moves.innerHTML = `Moves: ${move}`;
    empty.left = objStorage.emptyLeft;
    empty.top = objStorage.emptyTop;
    gameField = objStorage.gameField;
  }
};
getLocalStorage();

// тайминг

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
  if (gameField) {
    table.innerHTML = gameField;
  } else {
    const numbers = [...Array(sizeOfTable - 1).keys()].sort(() => Math.random() - 0.5);
    for (let i = 1; i <= sizeOfTable - 1; i++) {
      const item = document.createElement('div');
      item.className = 'item';
      item.innerHTML = numbers[i - 1] + 1;
      table.append(item);
      const widthTable = document.querySelector('.table').offsetWidth;
      const heightTable = document.querySelector('.table').offsetHeight;
      item.style.width = `${widthTable / Math.sqrt(sizeOfTable)}px`;
      item.style.height = `${heightTable / Math.sqrt(sizeOfTable)}px`;
      const width = document.querySelector('.item').offsetWidth;
      const left = i % Math.sqrt(sizeOfTable);
      const top = (i - left) / Math.sqrt(sizeOfTable);
      item.style.left = `${left * width}px`;
      item.style.top = `${top * width}px`;
    }
  }
}

createItems();

// звуковое сопровождение

audio.addEventListener('click', () => {
  if (sound === true) {
    audio.classList.add('sound_off');
    sound = false;
  } else {
    audio.classList.remove('sound_off');
    sound = true;
  }
});

// перемещение ячеек

let cell = document.querySelectorAll('.item'); // получаем сгенерированную ячейку

function moveItems(i) {
  const sizeCell = cell[0].offsetWidth;
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
    if (sound === true) {
      const turnOn = new Audio('./assets/sound.mp3');
      turnOn.play();
    }
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
  localStorage.clear();
  gameField = false;
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

btnNewGame.addEventListener('click', restartGame);

// выбор размера поля

function changeSize(s) {
  sizeOfTable = s;
  document.querySelector('.current-size').innerHTML = `Frame size: ${Math.sqrt(s)}x${Math.sqrt(s)}`;
  restartGame();
}

size9.addEventListener('click', () => {
  changeSize(9);
});
size16.addEventListener('click', () => {
  changeSize(16);
});
size25.addEventListener('click', () => {
  changeSize(25);
});
size36.addEventListener('click', () => {
  changeSize(36);
});
size49.addEventListener('click', () => {
  changeSize(49);
});
size64.addEventListener('click', () => {
  changeSize(64);
});

// сохранение игры

const setLocalStorage = () => {
  const savedGame = {
    gameField: table.innerHTML,
    sec,
    min,
    hour,
    move,
    sizeOfTable,
    emptyLeft: empty.left,
    emptyTop: empty.top,
  };
  localStorage.setItem('savedGame', JSON.stringify(savedGame));
};

save.addEventListener('click', setLocalStorage);
