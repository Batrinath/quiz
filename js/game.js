const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptAns = true
let score = 0
let questionCounter = 0 
let availableQuestion = []

let questions = [
    {
        question:'What is 1 + 99 ?',
        choice1:'100',
        choice2:'1',
        choice3:'99',
        choice4:'0',
        ans:1,
    },
    {
        question:'A computer system is the integration of physical entities called hardware and non physical entities called ?',
        choice1:'Hardware',
        choice2:'Firmware',
        choice3:'Liveware',
        choice4:'Software',
        ans:4,
    },
    {
        question:'Which one is the first search engine in internet ?',
        choice1:'Altavista',
        choice2:'Google',
        choice3:'Archie',
        choice4:'WAIS',
        ans:3,
    },
    {
        question:'Number of bit used by the IPv6 address ?',
        choice1:'256 bit',
        choice2:'64 bit',
        choice3:'32 bit',
        choice4:'128 bit',
        ans:4,
    },
    {
        question:'Which of the following programming language is used to create programs like applets ?',
        choice1:'COBOL',
        choice2:' C Language',
        choice3:'Java',
        choice4:'BASIC',
        ans:3,
    }
]



const SCORE_POINTS = 100
const MAX_QUESTIONS = questions.length;

startGame = () =>{
    questionCounter = 0
    score = 0
    availableQuestion = [...questions]
    getNewQuestion()
}



getNewQuestion = () =>{
    
if(availableQuestion.length === 0 || questionCounter > MAX_QUESTIONS){
    localStorage.setItem('mostRecentScore',score)

    return window.location.assign('/end.html')
}

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`

    const questionIndex = Math.floor(Math.random() * availableQuestion.length)

    currentQuestion = availableQuestion[questionIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestion.splice(questionIndex,1)

    acceptAns = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptAns) return

        acceptAns = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.ans ? 'correct' : 'incorrect'

        if(classToApply === 'correct'){
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()
        },1000)
    })
})

incrementScore = num =>{
    score += num
    scoreText.innerText = score
}

startGame()