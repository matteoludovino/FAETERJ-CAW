const quizForm = document.getElementById('quiz-form');
const quizFieldset = document.getElementById('quiz');
const resultsOutput = document.getElementById('results');
const submitButton = document.getElementById('submit');
const quizContainer = document.getElementById('quiz-container');

const myQuestions = [
    {
        question: "Qual é o maior planeta do sistema solar?",
        answers: {
            a: "Terra",
            b: "Júpiter",
            c: "saturnoo"
        },
        correctAnswer: "b",
        explanation: "Júpiter é o maior planeta do sistema solar, com um diâmetro de aproximadamente 142.984 km."
    },
    {
        question: "Quantos planetas existem no sistema solar?",
        answers: {
            a: "7",
            b: "8",
            c: "9"
        },
        correctAnswer: "b",
        explanation: "Desde 2006, quando Plutão foi reclassificado como planeta anão, nosso sistema solar tem 8 planetas."
    },
    {
        question: "Qual planeta é conhecido como 'Estrela da Manhã' ou 'Estrela da Tarde'?",
        answers: {
            a: "Mercúrio",
            b: "Vênus",
            c: "Marte"
        },
        correctAnswer: "b",
        explanation: "Vênus é frequentemente chamado de 'Estrela da Manhã' ou 'Estrela da Tarde' porque é visível a olho nu no céu antes do nascer do sol ou após o pôr do sol."
    },
    {
        question: "Qual planeta tem os anéis mais visíveis?",
        answers: {
            a: "Júpiter",
            b: "saturnoo",
            c: "Urano"
        },
        correctAnswer: "b",
        explanation: "saturnoo é famoso por seu impressionante sistema de anéis, que são os mais visíveis e extensos de todos os planetas do sistema solar."
    },
    {
        question: "Qual é o planeta mais quente do sistema solar?",
        answers: {
            a: "Mercúrio",
            b: "Vênus",
            c: "Marte"
        },
        correctAnswer: "b",
        explanation: "Apesar de não ser o mais próximo do Sol, Vênus é o mais quente devido à sua densa atmosfera de CO2 que cria um forte efeito estufa."
    },
    {
        question: "Qual planeta tem o dia mais longo?",
        answers: {
            a: "Vênus",
            b: "Júpiter",
            c: "Mercúrio"
        },
        correctAnswer: "a",
        explanation: "Vênus tem o dia mais longo, levando cerca de 243 dias terrestres para completar uma rotação."
    },
    {
        question: "Qual destes planetas é considerado um 'gigante gasoso'?",
        answers: {
            a: "Terra",
            b: "Marte",
            c: "Júpiter"
        },
        correctAnswer: "c",
        explanation: "Júpiter, saturnoo, Urano e Netuno são classificados como gigantes gasosos, enquanto os outros são planetas terrestres."
    },
    {
        question: "Qual planeta tem mais luas?",
        answers: {
            a: "saturnoo",
            b: "Júpiter",
            c: "Urano"
        },
        correctAnswer: "b",
        explanation: "Atualmente, Júpiter tem 79 luas conhecidas, mais do que qualquer outro planeta no sistema solar."
    },
    {
        question: "Qual é o planeta mais próximo do Sol?",
        answers: {
            a: "Vênus",
            b: "Mercúrio",
            c: "Terra"
        },
        correctAnswer: "b",
        explanation: "Mercúrio é o planeta mais próximo do Sol, orbitando a uma distância média de apenas 57,9 milhões de quilômetros."
    },
    {
        question: "Qual planeta é conhecido como o 'Planeta Vermelho'?",
        answers: {
            a: "Júpiter",
            b: "Marte",
            c: "saturnoo"
        },
        correctAnswer: "b",
        explanation: "Marte é chamado de 'Planeta Vermelho' devido à presença de óxido de ferro (ferrugem) em sua superfície, que lhe dá uma coloração avermelhada."
    }
];

function buildQuiz() {
    myQuestions.forEach((currentQuestion, questionNumber) => {
        const legend = document.createElement('legend');
        legend.textContent = currentQuestion.question;
        
        const fieldset = document.createElement('fieldset');
        fieldset.classList.add('question-container');
        fieldset.appendChild(legend);
        
        for (const letter in currentQuestion.answers) {
            const label = document.createElement('label');
            const input = document.createElement('input');
            input.type = 'radio';
            input.name = `question${questionNumber}`;
            input.value = letter;
            
            label.appendChild(input);
            label.append(` ${letter.toUpperCase()}. ${currentQuestion.answers[letter]}`);
            fieldset.appendChild(label);
        }
        
        quizFieldset.appendChild(fieldset);
    });
}

buildQuiz();

function showResults() {
    const questionContainers = quizContainer.querySelectorAll('.question-container');
    let numCorrect = 0;
    let resultsOutput = [];
    
    myQuestions.forEach((currentQuestion, questionNumber) => {
        const questionContainer = questionContainers[questionNumber];
        const selector = `input[name=question${questionNumber}]:checked`;
        const userAnswer = (questionContainer.querySelector(selector) || {}).value;
        
        if(userAnswer === currentQuestion.correctAnswer) {
            numCorrect++;
            questionContainer.style.color = 'lightgreen';
            resultsOutput.push(
                `<section class="correct"> <!-- Alterado div para section -->
                    <p>${questionNumber + 1}. ${currentQuestion.question}</p>
                    <p>Sua resposta: <strong>${currentQuestion.answers[userAnswer]}</strong> (Correta!)</p>
                    <p class="explanation">${currentQuestion.explanation}</p>
                </section>`
            );
        } else {
            questionContainer.style.color = 'red';
            const correctLetter = currentQuestion.correctAnswer;
            resultsOutput.push(
                `<section class="incorrect"> <!-- Alterado div para section -->
                    <p>${questionNumber + 1}. ${currentQuestion.question}</p>
                    <p>Sua resposta: <strong>${userAnswer ? currentQuestion.answers[userAnswer] : "Nenhuma resposta"}</strong></p>
                    <p>Resposta correta: <strong>${currentQuestion.answers[correctLetter]}</strong></p>
                    <p class="explanation">${currentQuestion.explanation}</p>
                </section>`
            );
        }
    });
    
    resultsOutput.innerHTML = `
        <h3>Você acertou ${numCorrect} de ${myQuestions.length} questões</h3>
        <div class="results-details">${resultsOutput.join('')}</div>
    `;
    
    resultsOutput.scrollIntoView({ behavior: 'smooth' });
}

buildQuiz();

submitButton.addEventListener('click', showResults);

function createStars() {
    const style = document.createElement('style');
    style.textContent = `
        body::after {
            content: '';
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: 
                radial-gradient(circle at ${Math.random() * 100}% ${Math.random() * 100}%, 
                white 1px, transparent 1px),
                radial-gradient(circle at ${Math.random() * 100}% ${Math.random() * 100}%, 
                white 1px, transparent 1px);
            background-size: 50px 50px;
            z-index: -1;
            pointer-events: none;
            animation: twinkle 5s infinite alternate;
        }
        
        @keyframes twinkle {
            0% { opacity: 0.3; }
            100% { opacity: 0.8; }
        }
    `;
    document.head.appendChild(style);
}

document.addEventListener('DOMContentLoaded', function() {
    createStars();
});