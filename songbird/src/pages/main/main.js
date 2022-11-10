import './main.html';
import './main.scss';

// элементы

const btnRu = document.querySelector('.ru');
const btnEn = document.querySelector('.en');
const language = document.querySelector('.dropbtn');
const text = document.querySelector('.main__text');
const btn = document.querySelector('.btn');
const navLink = document.querySelectorAll('.nav__link');
const navItem = document.querySelectorAll('.nav__item');

// переменные

let lang = 'ru'; // язык

// получаем данные из localstorage

if (localStorage.getItem('languageQuiz')) {
  lang = localStorage.getItem('languageQuiz');
}

// смена языка

const changeLanguage = (lang) => {
  if (lang === 'ru') {
    navItem[0].textContent = 'Главная';
    navLink[0].textContent = 'Викторина';
    navLink[1].textContent = 'Галерея';
    text.textContent = 'Проверьте себя с помощью этого теста, а заодно насладитесь звонкими птичьими голосами! Сладкоголосые птицы услаждали человеческий слух испокон веков. Сегодня, в эпоху городов, сможете ли вы узнать птицу по голосу?'
    btn.textContent = 'Пой, птичка!'
    language.classList.add('ru');
    language.classList.remove('en');
    language.textContent = 'RU';
  } else {
    navItem[0].textContent = 'Main';
    navLink[0].textContent = 'Quiz';
    navLink[1].textContent = 'Gallery';
    text.textContent = 'Test yourself with this quiz, and at the same time enjoy the sonorous bird voices! Sweet-voiced birds delighted the human ear from time immemorial. Today, in the era of cities, can you recognize a bird by its voice?'
    btn.textContent = 'Sing, birdie!'
    language.classList.remove('ru');
    language.classList.add('en');
    language.textContent = 'EN';
  }
}

changeLanguage(lang);

btnEn.addEventListener('click', () => {
  lang = 'eng'
  changeLanguage(lang);
  localStorage.setItem('languageQuiz', 'eng');
})

btnRu.addEventListener('click', () => {
  lang = 'ru'
  changeLanguage(lang);
  localStorage.setItem('languageQuiz', 'ru');
})