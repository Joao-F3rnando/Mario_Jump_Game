const mario = document.querySelector('.mario')
const pipe = document.querySelector('.pipe')
const clouds = document.querySelector('.clouds')
const gameBoard = document.querySelector('.gameBoard')
const pointsView = document.querySelector('.points')
const HIView = document.querySelector('#HI')
const selectDifficulty = document.querySelector('#difficulty')

if(localStorage.getItem('speedPine') == null || localStorage.getItem('speedPine') == 2)
{
    localStorage.setItem('speedPine', 2)
    document.querySelector('.difficulty').innerText = 'Dificuldade: Fácil'
}

else if(localStorage.getItem('speedPine') == 1.5)
{
    document.querySelector('.difficulty').innerText = 'Dificuldade: Média'
}

else if(localStorage.getItem('speedPine') == 1)
{
    document.querySelector('.difficulty').innerText = 'Dificuldade: Díficil'
}

pipe.style.animation = `pipeAnimation ${localStorage.getItem('speedPine')}s infinite linear`

let points = 0
let level = 'easy'

function jump(){
    mario.classList.add('jump')

    setTimeout(function(){
        mario.classList.remove('jump')
    }, 500)
}

const loop = setInterval(() => {
   
    console.log(level)
    const pipePosition = +window.getComputedStyle(pipe).left.replace('px', '')
    const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '')
    const cloudsPosition = +window.getComputedStyle(clouds).left.replace('px', '')

    if(pipePosition <= 120 && pipePosition > -20 && marioPosition <= 70)
    {
        pipe.style.animation = 'none'
        pipe.style.left = `${pipePosition}px`

        mario.style.animation = 'none'
        mario.style.bottom = `${marioPosition}px`

        clouds.style.animation = 'none'
        clouds.style.left = `${cloudsPosition}px`

        mario.src = './images/game-over.png'
        mario.style.width = '75px'
        mario.style.marginLeft = '50px'

        if(points > localStorage.getItem('HI'))
        {
        localStorage.setItem('HI', points)
        }
        document.querySelector('.restartButton').classList.remove('block')
        document.querySelector('.clearHI').classList.remove('block')
        document.querySelector('select').classList.remove('block')
        clearInterval(loop)
    }

    pointsView.innerText = `Pontuação: ${points}m`
    HIView.innerText = `HI: ${localStorage.getItem('HI')}m`
    
}, 10)

const pointsCount = setInterval(() => {
    points ++
}, 100)

document.addEventListener('keydown', function(e)
{
    if(e.key === ' ' || e.key === 'ArrowUp')
    [
        jump()
    ]
})

document.querySelector('.restartButton').addEventListener('click', function(){
    document.location.reload(true)
})

document.querySelector('.clearHI').addEventListener('click', function(){
    localStorage.setItem('HI', 0)
    HIView.innerText = `HI: ${localStorage.getItem('HI')}m`
})

selectDifficulty.addEventListener('change', function(option){

    console.log(option.target.value)
    if(option.target.value === 'easy')
    {
        document.querySelector('.difficulty').innerText = 'Dificuldade: Fácil'
        localStorage.setItem('speedPine', 2)
    }
    else if(option.target.value === 'medium')
    {
        document.querySelector('.difficulty').innerText = 'Dificuldade: Médio'
        localStorage.setItem('speedPine', 1.5)
    }

    else if(option.target.value === 'hard')
    {
        document.querySelector('.difficulty').innerText = 'Dificuldade: Díficil'
        localStorage.setItem('speedPine', 1)
    }
})