/* eslint-disable max-len */
/* eslint-disable no-plusplus */
import './index.html';
import './index.scss';
import './audio/sound.mp3';

import createElements from './modules/createElements';

// создаем элементы и присваиваем переменным

createElements();
const body = document.querySelector('body');
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
const results = document.querySelector('.results');
const resultsItems = document.querySelectorAll('.results-item');
const showResults = document.querySelector('.results-table');
const overlay = document.querySelector('.overlay');
const win = document.querySelector('.win');

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
let numbers; // массив чисел

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
    numbers = objStorage.numbers;
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

// генерация решаемости
// если поле нечетное и четное кол-во инверсий - игра решаема
// если поле четное и четное кол-ов инверсий - игра решаема

function genNumbers() {
  const arrNumbers = [...Array(sizeOfTable - 1).keys()].map((x) => x + 1).sort(() => Math.random() - 0.5);
  let inversions = 0;
  for (let i = 0; i < arrNumbers.length; i++) {
    for (let j = i - 1; j >= 0; j--) {
      if (arrNumbers[j] > arrNumbers[i]) {
        inversions++;
      }
    }
  }
  if ((inversions % 2 !== 0 && sizeOfTable % 2 !== 0) || (inversions % 2 === 0 && sizeOfTable % 2 === 0)) {
    return genNumbers();
  }
  return arrNumbers;
}

// создаем ячейки таблицы

function createItems() {
  if (gameField) {
    table.innerHTML = gameField;
  } else {
    numbers = [0, ...genNumbers()];
    for (let i = 0; i < numbers.length; i++) {
      const item = document.createElement('div');
      item.className = 'item';
      item.innerHTML = numbers[i];
      item.setAttribute('id', i);
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
      item.setAttribute('draggable', 'true');
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

// выигрыш и сохранение результата

function showWin() {
  win.innerHTML = `УРА!<br> Вы решили головоломку за ${String(hour).padStart(2, '0')}:${String(min).padStart(2, '0')}:${String(sec).padStart(2, '0')} и ${move} ходов!`;
  overlay.classList.add('overlay_active');
  win.classList.add('win_active');
  const setLocalStorageResults = () => {
    let allResults = [];
    if (localStorage.getItem('savedResults')) {
      allResults = JSON.parse(localStorage.getItem('savedResults'));
    }
    const savedResults = {
      time: `${String(hour).padStart(2, '0')}:${String(min).padStart(2, '0')}:${String(sec).padStart(2, '0')}`,
      move,
      timeOfMove: (sec + (min * 60) + (hour * 3600)) / move,
    };
    allResults.push(savedResults);
    localStorage.setItem('savedResults', JSON.stringify(allResults));
  };
  setLocalStorageResults();
  restartGame();
}

// получаем топ-10 результатов

const getLocalStorageResults = () => {
  if (localStorage.getItem('savedResults')) {
    const objStorage = JSON.parse(localStorage.getItem('savedResults'));
    objStorage.sort((a, b) => (a.timeOfMove > b.timeOfMove ? 1 : -1));
    for (let i = 0; i < objStorage.length; i++) {
      if (i > 9) {
        break;
      }
      resultsItems[i].innerHTML = `<span>${i + 1}</span><span>${objStorage[i].time}</span><span>${objStorage[i].move}</span>`;
    }
  }
  showResults.classList.add('results_active');
  overlay.classList.add('overlay_active');
};

results.addEventListener('click', getLocalStorageResults);
overlay.addEventListener('click', () => {
  win.classList.remove('win_active');
  showResults.classList.remove('results_active');
  overlay.classList.remove('overlay_active');
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
    table.firstChild.style.left = `${empty.left}px`;
    table.firstChild.style.top = `${empty.top}px`;
    move++;
    moves.innerHTML = `Moves: ${move}`;
    numbers = numbers.map((x) => {
      if (x === 0) {
        return Number(cell[i].innerHTML);
      }
      if (x === Number(cell[i].innerHTML)) {
        return 0;
      }
      return x;
    });
    if (sound === true) {
      const turnOn = new Audio('./assets/sound.mp3');
      turnOn.play();
    }
    const winArray = [...Array(sizeOfTable - 1).keys()].map((x) => x + 1);
    if (JSON.stringify(numbers) === JSON.stringify([...winArray, 0])) {
      showWin();
    }
  }
}

// Click

function clickItem() {
  for (let i = 0; i < cell.length; i++) {
    cell[i].addEventListener('click', (event) => {
      event.stopImmediatePropagation();
      moveItems(i);
    });
  }
}

clickItem();

// drag & drop

function drag() {
  for (let i = 0; i < cell.length; i++) {
    cell[i].addEventListener('dragstart', (event) => {
      event.stopImmediatePropagation();
      event.dataTransfer.setData('id', event.target.id);
    });
  }
  body.addEventListener('dragover', (event) => {
    event.preventDefault();
  });
  body.addEventListener('drop', (event) => {
    event.stopImmediatePropagation();
    const itemId = event.dataTransfer.getData('id');
    table.append(document.getElementById(itemId));
    moveItems(itemId);
  });
}
drag();

// перезапуск игры

function restartGame() {
  localStorage.removeItem('savedGame');
  gameField = false;
  table.innerHTML = '';
  createItems();
  cell = document.querySelectorAll('.item');
  empty.left = 0;
  empty.top = 0;
  clickItem();
  drag();
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
  table.style.fontSize = '250%';
});
size16.addEventListener('click', () => {
  changeSize(16);
  table.style.fontSize = '250%';
});
size25.addEventListener('click', () => {
  changeSize(25);
  table.style.fontSize = '250%';
});
size36.addEventListener('click', () => {
  changeSize(36);
  table.style.fontSize = '200%';
});
size49.addEventListener('click', () => {
  changeSize(49);
  table.style.fontSize = '150%';
});
size64.addEventListener('click', () => {
  changeSize(64);
  table.style.fontSize = '150%';
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
    numbers,
  };
  localStorage.setItem('savedGame', JSON.stringify(savedGame));
};

save.addEventListener('click', setLocalStorage);

// адаптив при изменении ширины экрана

let oldWidth = window.innerWidth;
window.onresize = function () {
  const newWidth = window.innerWidth;
  if (newWidth !== oldWidth) {
    restartGame();
    oldWidth = newWidth;
  }
};
