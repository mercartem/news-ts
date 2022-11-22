import './second.html';
import './second.scss';

import birdsDataRu from './modules/birds.js';
import birdsDataEn from './modules/birdsEng.js';

// элементы

const play = document.querySelectorAll('.play');
const volume = document.querySelectorAll('.volume');
const progressBar = document.querySelectorAll('.play-progress');
const currentTime = document.querySelectorAll('.time-now');
const durationTime = document.querySelectorAll('.duration');
const volumeProgress = document.querySelectorAll('.volume-progress');
const birds = document.querySelectorAll('.quiz__bird');
const answer = document.querySelector('.title');
const img = document.querySelectorAll('.quiz__img');
const instructionBlock = document.querySelector('.quiz__instruction');
const descriptionBlock = document.querySelector('.description');
const birdName = document.querySelector('.kind__name');
const birdNameEng = document.querySelector('.kind__name-eng');
const birdAbout = document.querySelector('.kind__text');
const btn = document.querySelector('.quiz__btn');
const lvls = document.querySelectorAll('.quiz__item');
const score = document.querySelector('.score');
const questBlock = document.querySelector('.quiz__question');
const optionsBlock = document.querySelector('.quiz__options');
const descriptBlock = document.querySelector('.quiz__description');
const congratBlock = document.querySelector('.quiz__congrat');
const quizBlock = document.querySelector('.quiz');
const text = document.querySelector('.text');
const navLink = document.querySelectorAll('.nav__link');
const navItem = document.querySelectorAll('.nav__item');
const quizItem = document.querySelectorAll('.quiz__item');
const titleCongrat = document.querySelector('.title-congrat');
const btnNewGame = document.querySelector('.quiz__btn-new-game');
const btnRu = document.querySelector('.ru');
const btnEn = document.querySelector('.en');
const language = document.querySelector('.dropbtn');

// Переменные

let lvl = 0; // текущий уровень
let currentScore = 0; // баллы
let currentBird = {}; // текущая птица в вопросе
let isPlay = false; // флаг проигрывателя
let restoreValue; // сохранение значения звука
let intervalId; // очищение интервала
let lang = 'ru'; // язык
const audio = new Audio();

// Получаем данные из localstorage

if (localStorage.getItem('languageQuiz')) {
  lang = localStorage.getItem('languageQuiz');
}

let birdsData = lang === 'ru' ? birdsDataRu.slice() : birdsDataEn.slice();

// Наполнение вариантов ответа

const showOptions = () => {
  for (let i = 0; i < birds.length; i++) {
    birds[i].childNodes[1].textContent = birdsData[lvl][i].name;
  }
}

showOptions();

// Генерация птицы в блок вопроса

const randomBirds = () => { 
  const bird = birdsData[lvl].slice();
  return bird.sort(() => Math.random() - 0.5)[0];
}
currentBird = randomBirds();

// смена языка

const changeLanguage = (lang) => {
  if (lang === 'ru') {
    navLink[0].textContent = 'Главная';
    navItem[1].textContent = 'Викторина';
    navLink[1].textContent = 'Галерея';
    quizItem[0].textContent = 'Разминка';
    quizItem[1].textContent = 'Воробьиные';
    quizItem[2].textContent = 'Лесные птицы';
    quizItem[3].textContent = 'Певчие птицы';
    quizItem[4].textContent = 'Хищные птицы';
    quizItem[5].textContent = 'Морские птицы';
    instructionBlock.innerHTML = 'Послушайте плеер.<br>Выберите птицу из списка.';
    titleCongrat.textContent = 'ПОЗДРАВЛЯЕМ!';
    btnNewGame.textContent = 'Попробовать ещё раз!';
    btn.textContent = 'Дальше';
    text.textContent = `Вы прошли викторину и набрали ${currentScore} из 30 возможных баллов!`;
    language.classList.add('ru');
    language.classList.remove('en');
    language.textContent = 'RU';
    birdsData = birdsDataRu.slice();
    showOptions()
    for (let i = 0; i < birdsData[lvl].length; i++) {
      if (currentBird.name === birdsDataEn[lvl][i].name) {
        currentBird = birdsDataRu[lvl][i];
      }
      if (birdName.textContent === birdsDataEn[lvl][i].name) {
        birdName.textContent = birdsDataRu[lvl][i].name;
        birdAbout.textContent = birdsDataRu[lvl][i].description;
      }
    }
  } else {
    navLink[0].textContent = 'Main';
    navItem[1].textContent = 'Quiz';
    navLink[1].textContent = 'Gallery';
    quizItem[0].textContent = 'Warm up';
    quizItem[1].textContent = 'Passerines';
    quizItem[2].textContent = 'Forest birds';
    quizItem[3].textContent = 'Song birds';
    quizItem[4].textContent = 'Predator birds';
    quizItem[5].textContent = 'Sea birds';
    instructionBlock.innerHTML = 'Listen to the player.<br>Select a bird from the list.';
    titleCongrat.textContent = 'CONGRATULATIONS!';
    btnNewGame.textContent = 'Try again!';
    btn.textContent = 'Next level';
    text.textContent = `You passed the quiz and scored ${currentScore} out of 30 possible points!`;
    language.classList.remove('ru');
    language.classList.add('en');
    language.textContent = 'EN';
    birdsData = birdsDataEn.slice();
    showOptions()
    for (let i = 0; i < birdsData[lvl].length; i++) {
      if (currentBird.name === birdsDataRu[lvl][i].name) {
        currentBird = birdsDataEn[lvl][i];
      }
      if (birdName.textContent === birdsDataRu[lvl][i].name) {
        birdName.textContent = birdsDataEn[lvl][i].name;
        birdAbout.textContent = birdsDataEn[lvl][i].description;
      }
    }
  }
}

changeLanguage(lang)

btnEn.addEventListener('click', () => {
  lang = 'eng'
  showOptions();
  changeLanguage(lang);
  localStorage.setItem('languageQuiz', 'eng');
})

btnRu.addEventListener('click', () => {
  lang = 'ru'
  showOptions();
  changeLanguage(lang);
  localStorage.setItem('languageQuiz', 'ru');
})

// Аудио в блоке вопроса

progressBar[0].value = 0;
progressBar[1].value = 0;

const playAudio = (i, src) => {
  clearInterval(intervalId);
  play[0].classList.remove('pause');
  play[1].classList.remove('pause');
  if (i === 0) {
    audio.src = currentBird.audio;
  } else {
    audio.src = src;
  }
  audio.currentTime = progressBar[i].value;
  if (isPlay === false) {
    audio.play();
    isPlay = true;
    play[i].classList.add('pause');
    intervalId = setInterval(updateProgressValue, 1000, i);
  } else {
    audio.pause();
    isPlay = false;
    play[i].classList.remove('pause');
  }
}

play[0].addEventListener('click', () => {
  playAudio(0)
})

const resetAudio = () => {
  isPlay = false;
  play[0].classList.remove('pause');
  play[1].classList.remove('pause');
  progressBar[0].value = 0;
  progressBar[1].value = 0;
  audio.currentTime = 0;
  currentTime[1].innerHTML = '0:00';
  durationTime[1].innerHTML = '0:00';
  currentTime[0].innerHTML = '0:00';
  durationTime[0].innerHTML = '0:00';
  audio.pause();
  clearInterval(intervalId);
}

audio.addEventListener('ended', resetAudio);

const updateProgressValue = (i) => {
  progressBar[i].max = audio.duration;
  progressBar[i].value = audio.currentTime;
  currentTime[i].innerHTML = (formatTime(Math.floor(audio.currentTime)));
  durationTime[i].innerHTML = (formatTime(Math.floor(audio.duration)));
};

const formatTime = (seconds) => {
  let min = Math.floor((seconds / 60));
  let sec = Math.floor(seconds - (min * 60));
  if (sec < 10){ 
      sec  = `0${sec}`;
  };
  return `${min}:${sec}`;
};

const moveProgressBar = (i) => {
  audio.currentTime = progressBar[i].value;
}

for (let i = 0; i < progressBar.length; i++) {
  progressBar[i].addEventListener('input', () => {
    moveProgressBar(i);
  });
}

const changeVolume = (i) => {
  audio.volume = volumeProgress[i].value;
  if (audio.volume === 0) {
      volume[i].classList.add('mute');
  } else {
      volume[i].classList.remove('mute');
  }
}

for (let i = 0; i < volumeProgress.length; i++) {
  volumeProgress[i].addEventListener('input', () => {
    changeVolume(i);
  });
}

function muteSound(i) {
  if (volumeProgress[i].value != 0) {
      restoreValue = volumeProgress[i].value;
      audio.volume = 0;
      volumeProgress[i].value = 0;
      volume[i].classList.add('mute');
  } else {
      volume[i].classList.remove('mute');
      volumeProgress[i].value = restoreValue;
      audio.volume = volumeProgress[i].value;
  }
}

for (let i = 0; i < play.length; i++) {
  volume[i].addEventListener('click', () => {
    muteSound(i);
  });
}

// Выбор ответа

const chooseBird = (i) => {
  const points = document.querySelectorAll('.point');
  const answerAudio = new Audio();
  instructionBlock.style.display = 'none';
  descriptionBlock.style.display = 'block';
  img[1].setAttribute('src', birdsData[lvl][i].image);
  birdName.textContent = birdsData[lvl][i].name;
  birdName.setAttribute('id', i);
  birdNameEng.textContent = birdsData[lvl][i].species;
  birdAbout.textContent = birdsData[lvl][i].description;
  if (currentBird.name === birds[i].textContent) {
    answerAudio.src = 'https://allsoundsaround.com/wp-content/uploads/2021/01/zvuk-pravilnogo-otveta-iz-peredachi-100-k-1-5200.mp3?_=1';
    answerAudio.play();
    answer.textContent = currentBird.name;
    img[0].setAttribute('src', currentBird.image);
    btn.classList.add('quiz__btn_active');
    resetAudio();
    if (points[i].classList.contains('point_green') === false) {
      currentScore = currentScore + 5;
    }
    points[i].classList.add('point_green');
    if (lvl === 5) {
      showCongrat();
    }
  } else {
    if (play[1].classList.contains('pause')) {
      resetAudio();
    }
    answerAudio.src = 'https://allsoundsaround.com/wp-content/uploads/2021/01/zvuk-netochnosti-v-otvete-ne-zaschitan-5194.mp3?_=11';
    answerAudio.play();
    if (points[i].classList.contains('point_red') === false && btn.classList.contains('quiz__btn_active') === false) {
      currentScore = currentScore - 1;
      points[i].classList.add('point_red');
    }
  }
  if (btn.classList.contains('quiz__btn_active')) {
    score.textContent = `Score: ${currentScore}`;
  }
}

for (let i = 0; i < birds.length; i++) {
  birds[i].addEventListener('click', () => {
    chooseBird(i);
  })
}

// Аудио в описании птиц

play[1].addEventListener('click', () => {
  playAudio(1, birdsData[lvl][birdName.id].audio);
})

// Следующий уровень

const newLvl = () => {
  lvl = lvl + 1;
  lvls[lvl].classList.add('quiz__item_active');
  lvls[lvl - 1].classList.remove('quiz__item_active');
  answer.textContent = '******';
  img[0].setAttribute('src', 'assets/secret-bird.jpg');
  currentBird = randomBirds();
  for (let i = 0; i < birds.length; i++) {
    birds[i].innerHTML = `<span class="point"></span>${birdsData[lvl][i].name}`;
  }
  instructionBlock.style.display = 'block';
  descriptionBlock.style.display = 'none';
  btn.classList.remove('quiz__btn_active');
  resetAudio();
}

btn.addEventListener('click', newLvl)

// Поздравление

const showCongrat = () => {
  questBlock.style.display = 'none';
  optionsBlock.style.display = 'none';
  btn.style.display = 'none';
  descriptBlock.style.display = 'none';
  quizBlock.style.display = 'block';
  congratBlock.style.display = 'flex';
  if (lang === 'ru') {
    text.textContent = `Вы прошли викторину и набрали ${currentScore} из 30 возможных баллов!`;
  } else {
    text.textContent = `You passed the quiz and scored ${currentScore} out of 30 possible points!`;
  }
}