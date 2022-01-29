const startBtn = document.querySelector('#start')
const screens = document.querySelectorAll('.screen')
const timeList = document.querySelector('#time-list')
const timeEl = document.querySelector('#time')
const board = document.querySelector('#board')
const newGameBtn = document.createElement('div')

let time = 0
let score = 0
const colors = [
  '#00FE81',
  '83a7c9',
  '#fff',
  ' #80FF00',
  ' #FFFF01',
  ' #FFC000',
  '#FF4001',
  ' #FF0080',
  '#FF00FE',
  '#7F00FF',
]

startBtn.addEventListener('click', (event) => {
  event.preventDefault()
  screens[0].classList.add('up')
})

timeList.addEventListener('click', (event) => {
  if (event.target.classList.contains('time-btn')) {
    time = parseInt(event.target.getAttribute('data-time'))
    if (time < 10) {
      time = `0${time}`
    }
    screens[1].classList.add('up')
    startGame()
    // delete window.finishGame // это не нужно
  }
})

board.addEventListener('click', (event) => {
  if (event.target.classList.contains('circle')) {
    score++
    event.target.remove()
    createRandomCircle()
  }
})
window.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    event.preventDefault()
  }
})
newGameBtn.addEventListener('click', (e) => {
  e.preventDefault()
  board.innerHTML = ``
  // screens.forEach((item) => {})
  if (screens[1].classList.contains('up')) {
    screens[1].classList.remove('up')
  }
  score = 0

  // if (confirm('перезагрузить?')) {
  // }
  /* document.location.reload() */ // Это то что было у тебя
})

/* Добавляю переменную для того что бы убить потом Интервал, он у тебя тикает после окончания игры */
let interval

function startGame() {
  interval = setInterval(decreseTime, 1000)

  // Убираем класс который прятал твой таймер
  if (timeEl.parentNode.classList.contains('hide')) {
    timeEl.parentNode.classList.remove('hide')
  }
  createRandomCircle()
  setTime(time)
}

function decreseTime() {
  if (time === 0) {
    finishGame()
  } else {
    let current = --time
    if (current < 10) {
      current = `0${current}`
    }
    timeEl.innerHTML = `00:${current}`
  }
}

function setTime(params) {
  timeEl.innerHTML = `00:${params}`
}

function finishGame() {
  clearInterval(interval) // тут мы убиваем интервал
  timeEl.parentNode.classList.add('hide')
  board.innerHTML = `<h1>Ваш счет:<span class="primary"> ${score}</span></h1>`
  newGameBtn.classList.add('btn-new-game')
  board.append(newGameBtn)
  newGameBtn.innerText = 'Новая игра'
}

function createRandomCircle() {
  const circle = document.createElement('div')
  circle.classList.add('circle')
  const randomSize = getRandomNumber(10, 50)
  const { width, height } = board.getBoundingClientRect()
  const x = getRandomNumber(0, width - randomSize)
  const y = getRandomNumber(0, height - randomSize)
  const colorIndex = getRandomNumber(0, colors.length - 1)
  circle.style.background = colors[colorIndex]
  circle.style.width = `${randomSize}px`
  circle.style.height = `${randomSize}px`
  circle.style.top = `${y}px`
  circle.style.left = `${x}px`

  board.append(circle)
}
function getRandomNumber(min, max) {
  return Math.round(Math.random() * (max - min) + min)
}

function playGameMax(timeInterval) {
  function kill() {
    const circlePush = document.querySelector('.circle')
    if (circlePush) {
      circlePush.click()
    }
  }
  setInterval(kill, timeInterval)
}
