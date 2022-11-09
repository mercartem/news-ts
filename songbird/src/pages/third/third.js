import './third.html';
import './third.scss';

import birdsData from './modules/birds.js';

// элементы

const gallery = document.querySelector('.gallery');

// Отрисовка всех описаний

for (let i = 0; i < birdsData.length; i++) {
  for (let j = 0; j < birdsData[i].length; j++) {

    const description = document.createElement('div');
    description.className = 'description';
    gallery.append(description);

    const kindBlock = document.createElement('div');
    kindBlock.className = 'kind-container';
    description.append(kindBlock);

    const text = document.createElement('p');
    text.className = 'text';
    text.textContent = birdsData[i][j].description;
    description.append(text);

    const img = document.createElement('img');
    img.className = 'img';
    img.setAttribute('src', birdsData[i][j].image);
    kindBlock.append(img);

    const kind = document.createElement('div');
    kind.className = 'kind';
    kindBlock.append(kind);

    const title = document.createElement('h3');
    title.className = 'kind__name';
    title.textContent = birdsData[i][j].name;
    kind.append(title);

    const subTitle = document.createElement('h4');
    subTitle.className = 'kind__name-eng';
    subTitle.textContent = birdsData[i][j].species;
    kind.append(subTitle);

    const player = document.createElement('div');
    player.className = 'player';
    kind.append(player);

    const btn = document.createElement('button');
    btn.className = 'play';
    btn.classList.add('player-icon');
    player.append(btn);

    const progress = document.createElement('div');
    progress.className = 'progress-bar';
    player.append(progress);

    const input = document.createElement('input');
    input.className = 'play-progress';
    input.setAttribute('type', 'range');
    input.setAttribute('value', '0');
    progress.append(input);

    const timer = document.createElement('div');
    timer.className = 'play-timer';
    progress.append(timer);

    const currentTime = document.createElement('div');
    currentTime.className = 'time-now';
    currentTime.textContent = '0:00';
    timer.append(currentTime);

    const duration = document.createElement('div');
    duration.className = 'duration';
    duration.textContent = '0:00';
    timer.append(duration);
  }
}

// Аудио

const play = document.querySelectorAll('.play');
const volume = document.querySelector('.volume');
const volumeProgress = document.querySelector('.volume-progress');
const progressBar = document.querySelectorAll('.play-progress');
const currentTime = document.querySelectorAll('.time-now');
const durationTime = document.querySelectorAll('.duration');
const audio = new Audio();
const birdsArray = birdsData.flat(1);
let isPlay = false;
let intervalId;
let restoreValue;

const playAudio = (i, src) => {
  clearInterval(intervalId);
  audio.src = src;
  audio.currentTime = progressBar[i].value;
  for (let i = 0; i < play.length; i++) {
    play[i].classList.remove('pause');
  }
  if (!isPlay) {
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

play.forEach((e, i) => {
  e.addEventListener('click', () => {
    playAudio(i, birdsArray[i].audio);
  })
})

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

const resetAudio = () => {
  audio.currentTime = 0;
  audio.play();
}

audio.addEventListener('ended', resetAudio);

const changeVolume = () => {
  audio.volume = volumeProgress.value;
  if (audio.volume === 0) {
      volume.classList.add('mute');
  } else {
      volume.classList.remove('mute');
  }
}

volumeProgress.addEventListener('input', changeVolume);

const muteSound = () => {
  if (volumeProgress.value != 0) {
      restoreValue = volumeProgress.value;
      audio.volume = 0;
      volumeProgress.value = 0;
      volume.classList.add('mute');
  } else {
      volume.classList.remove('mute');
      volumeProgress.value = restoreValue;
      audio.volume = volumeProgress.value;
  }
}

volume.addEventListener('click', muteSound);