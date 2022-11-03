import './second.html';
import './second.scss';

const inputPlay = document.querySelector('.play-progress');
const inputVolume = document.querySelector('.volume-progress');

console.log(inputVolume)

inputPlay.addEventListener('input', function() {
  inputPlay.style.background = 'linear-gradient(to right, rgb(0, 188, 140)' + inputPlay.value + '%, rgb(115, 115, 115) 1%, rgb(115, 115, 115) 100%)';
});
inputVolume.addEventListener('input', function() {
  inputVolume.style.background = 'linear-gradient(to right, rgb(0, 188, 140)' + inputVolume.value + '%, rgb(115, 115, 115) 1%, rgb(115, 115, 115) 100%)';
});

// linear-gradient(to right, rgb(0, 188, 140) 0%, rgb(61, 133, 140) 45.9378%, rgb(115, 115, 115) 45.9378%, rgb(115, 115, 115) 100%)