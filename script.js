// Create data storage here
// A list [] that holds multiple dictionaries {key-value pairs}
// A dictionary represents a question set
const database = [
    {
        question : "What Country Has The Capital called Kuala Lumpur ?",
        options : ["Singapore","Malaysia","Thailand","Indonesia"],
        answer : "Malaysia"
    },

    {
        question : "How Many Islands is Indonesia Made Up Of ?",
        options : ["17,500 islands","1,000,234 islands","1 island","70,000,000 islands"],
        answer : "17,500 islands"
    },


    {
        question : "What Is The Biggest Country In Asia ?",
        options : ["Russia","China","India","Indonesia"],
        answer : "Russia"
    },


    {
        question : "What Is The Richest Country In Asean ?",
        options : ["Singapore","China","Japan","India"],
        answer : "Singapore"
    },


    {
        question : "What Is The Poorest Continent ?",
        options : ["Africa","Asia","Europe","Middle East"],
        answer : "Africa"
    },


    {
        question : "How Many States Does USA Have ?",
        options : ["10","52","50","1"],
        answer : "50"
    },



    {
        question : "What Country Has the Capital Named Tokyo ?",
        options : ["Japan","Singapore","India","Usa"],
        answer : "Japan"
    },


    {
        question : "What Country Has No Capital And No States ?",
        options : ["Singapore","Malaysia","Russia","Thailand"],
        answer : "Singapore"
    },


    {
        question : "Which Continent Is Uk(United Kindom) From ?",
        options : ["Asia","Africa","North & South Amarica","Europe"],
        answer : "Europe"
    },



    {
        question : "Which Country Has The National Anthem Called Jana Gana Mana ?",
        options : ["Nepal","India","Bangladesh","sri Lanka"],
        answer : "India"
    },



    {
        question : "Which Country Has The National Anthem Called The Thunder Dragon Kindom ?",
        options : ["Nepal","India","Bangladesh","Bhutan"],
        answer : "Bhutan"
    },


    {
        question : "Which Country Has The National Anthem Called Majulah Singapura ?",
        options : ["Singapore","India","Malaysia","Indonesia"],
        answer : "Singapore"
    },

    {
        question : "Which Country Has The National Anthem Called Sayaun Thunga Phulka ?",
        options : ["Bangladesh","India","Thailand","Nepal"],
        answer : "Nepal"
    },

    {
        question : "Which Country Has The National Anthem Called Pheng Xat Lao ?",
        options : ["Myanmar","India","Thailand","Laos (Lao PDR)"],
        answer : "Laos (Lao PDR)"
    },
];

const startButton = document.getElementById('start-btn');
const questionLabel = document.getElementById('question');
const timerTextLabel = document.getElementById('countdownText');
const timerElement = document.getElementById('timer');
const progressBarContainer = document.getElementById('progress-bar-container');
const progressBarFill = document.getElementById('progress-bar-fill');
const optionContainer = document.getElementById('option-container');
const scoreLabel = document.getElementById('score');

progressBarFill.style.width ='0%';

let currentQuestionNo = 1;
let timer = 0;
let score = 0;
// Trigers
startButton.addEventListener('click', StartQuiz);

function StartQuiz()
{
    startButton.style.display ='none';
    LoadNextQuestion();
}

function LoadNextQuestion()
{
    // Reset timer
    clearInterval(timer);

    if(currentQuestionNo <= database.length)
    {
        // update the progress bar
        progressBarFill.style.width = `${((currentQuestionNo) / database.length) * 100}%`;

        const currentQuestionSet = database[currentQuestionNo - 1];
        questionLabel.textContent = currentQuestionSet.question;

        // Set initial countdown value
        timerTextLabel.textContent = 20;

        // Remove all previous button clones
        optionContainer.innerHTML = '';

        // Clone 4 option buttons for each question
        currentQuestionSet.options.forEach((option) => {
            const button = document.createElement('button');
            button.classList.add('option-btn');
            button.textContent = option;
            optionContainer.appendChild(button);

            button.addEventListener('click', () => {
                disableOptionButtons();
                checkAnswer(option);
            });
                
        });

        // Start The countdown timer
        // Define in {} what to do when timer fires
        timer = setInterval(() => {
            timerTextLabel.textContent = parseInt(timerTextLabel.textContent)-1;

            // stop counting down when it hits zero
            if(parseInt(timerTextLabel.textContent) === 0)
            {
                //reset timer
                clearInterval(timer);
                currentQuestionNo = currentQuestionNo + 1;
                LoadNextQuestion();
            }

        }, 1000);
    } else
    {
        EndQuiz();
    }
}


function EndQuiz()
{
    clearInterval(timer);
    timerElement.style.display ='none';
    questionLabel.textContent ="The Quiz Has Ended. YAY!!! You Did A Great Job!!!";
    optionContainer.style.display = 'none';
}

function disableOptionButtons()
{
    const allOptionButtons = document.querySelectorAll('.option-btn');

    //disable all option buttons with a for-each loop
    allOptionButtons.forEach(button => {
        button.disabled = true;
    });
}


function enableOptionButtons()
{
    const allOptionButtons = document.querySelectorAll('.option-btn');

    //disable all option buttons with a for-each loop
    allOptionButtons.forEach(button => {
        button.disabled = false;
    });
}


function checkAnswer(option)
{
    // Retrieve answer key of a question set from the database
    const answer = database[currentQuestionNo - 1].answer;


    if(option === answer)
    {
        score = score + 1;
    }

    scoreLabel.textContent = `You scored ${score} point(s) `;

    currentQuestionNo = currentQuestionNo + 1;
    LoadNextQuestion();
}