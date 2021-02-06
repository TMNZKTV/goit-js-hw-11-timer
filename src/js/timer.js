// Создаем разметку. Создаем массив строк для дальнейшей работы.
const timers = ['Days', 'Hours', 'Minutes', 'Seconds'];

// Функция для создания разметки
const createItem = timer => {
  const itemRef = document.createElement('div');
  itemRef.classList.add('field');
  itemRef.insertAdjacentHTML('afterbegin', `<span class="value" data-value="${timer.toLowerCase()}"></span>`);
  itemRef.insertAdjacentHTML('beforeend', `<span class="label">${timer}</span>`);
  return itemRef;
};

// Создаем перменную-массив, которая содержит в себе результат функции createItem
const mappedTimers = timers.map(timer => createItem(timer));

// Создаем начальный div и помещаем переменную-массив
const divRef = document.createElement('div');
divRef.classList.add('timer');
divRef.id = '#timer-1';
divRef.append(...mappedTimers);

// Собранную структуру за один раз добавляем в ДОМ
const body = document.querySelector('body');
body.insertAdjacentElement('afterbegin', divRef);

// Выбираем поля для дальнейшего заполнения
const refs = {
  daysTimer: document.querySelector('[data-value="days"]'),
  hoursTimer: document.querySelector('[data-value="hours"]'),
  minutesTimer: document.querySelector('[data-value="minutes"]'),
  secondsTimer: document.querySelector('[data-value="seconds"]'),
};

// Создаем класс
class CountdownTimer {
  constructor({ selector, targetDate }) {
    this.selector = selector;
    this.targetDate = targetDate;
  }

  start() {
    const eventTime = this.targetDate.getTime();
    setInterval(() => {
      const currentTime = Date.now();
      const deltaTime = eventTime - currentTime;
      calculateTime(deltaTime);
    }, 1000);
  }
}

// Создаем таймер с нужной датой
const timer = new CountdownTimer({
  selector: '#timer-1',
  targetDate: new Date('Mar 8, 2021'),
});

// Запускаем таймер
timer.start();

// Объявляем переменные для дальнейшей работы с ними
let days;
let hours;
let mins;
let secs;

// Из deltaTime высчитаем время для отображения
function calculateTime(time) {
  days = pad(Math.floor(time / (1000 * 60 * 60 * 24)));
  updateClockFace(days);

  hours = pad(Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
  updateClockFace(hours);

  mins = pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
  updateClockFace(mins);

  secs = pad(Math.floor((time % (1000 * 60)) / 1000));
  updateClockFace(secs);
}

// Функция для отображения чисел в виде "00"
function pad(value) {
  return String(value).padStart(2, '0');
}

// Функция отображения чисел в DOM
function updateClockFace(value) {
  refs.daysTimer.textContent = `${days}`;
  refs.hoursTimer.textContent = `${hours}`;
  refs.minutesTimer.textContent = `${mins}`;
  refs.secondsTimer.textContent = `${secs}`;
}
