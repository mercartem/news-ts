import './second.html';
import './second.scss';

import birdsData from './modules/birds.js';

const input = document.getElementsByTagName('input');
const play = document.querySelector('.play');

// Переменные

let lvl = 0;
let currentBird = {};

// Стилизация инпута при перемещении ползунка

for (let i = 0; i < input.length; i++) {
  input[i].addEventListener('input', function() {
    input[i].style.background = 'linear-gradient(to right, rgb(0, 188, 140)' + input[i].value + '%, rgb(115, 115, 115) 1%, rgb(115, 115, 115) 100%)';
  });
}

// Генерация птицы в блок вопроса

const randomBirds = () => birdsData[lvl].sort(() => Math.random() - 0.5)[0];
currentBird = randomBirds();
console.log(currentBird)

// Аудио в блоке вопроса

const playAudio = (src) => {
  const audio = new Audio(src);
  audio.play();
}

play.addEventListener('click', playAudio)