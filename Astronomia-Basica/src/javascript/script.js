function calcularPeso() {
    const pesoNaTerra = parseFloat(document.getElementById('peso-terra').value);
    const planetaSelecionado = document.getElementById('planeta').value;
    const resultadoElemento = document.getElementById('resultado-peso');

    if (isNaN(pesoNaTerra) || pesoNaTerra <= 0) {
        resultadoElemento.value = "Por favor, insira um peso válido.";
        return;
    }

    const gravidades = {
        mercurio: 0.38,
        venus: 0.91,
        terra: 1.00,
        marte: 0.38,
        jupiter: 2.34,
        saturno: 1.06, 
        urano: 0.92,
        netuno: 1.19
    };

    const nomesPlanetas = {
        mercurio: "Mercúrio",
        venus: "Vênus",
        terra: "Terra",
        marte: "Marte",
        jupiter: "Júpiter",
        saturno: "Saturno",
        urano: "Urano",
        netuno: "Netuno"
    };

    const gravidadePlaneta = gravidades[planetaSelecionado];
    const pesoNoPlaneta = pesoNaTerra * gravidadePlaneta;
    const nomePlaneta = nomesPlanetas[planetaSelecionado];

    resultadoElemento.value = `Seu peso em ${nomePlaneta} seria ${pesoNoPlaneta.toFixed(2)} kg.`;
}

document.addEventListener('DOMContentLoaded', function() {
    const calcularBtn = document.querySelector('.calculadora button');
    if (calcularBtn) {
        calcularBtn.addEventListener('click', calcularPeso);
    }
    
    const pesoInput = document.getElementById('peso-terra');
    if (pesoInput) {
        pesoInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                calcularPeso();
            }
        });
    }

    const quizContainer = document.getElementById('quiz-container');
    if (quizContainer) {
        const questions = [
            {
                question: "Qual é o maior planeta do sistema solar?",
                answers: [
                    { text: "Terra", correct: false },
                    { text: "Júpiter", correct: true },
                    { text: "Saturno", correct: false },
                    { text: "Netuno", correct: false }
                ]
            },
            {
                question: "Qual planeta é conhecido como 'Planeta Vermelho'?",
                answers: [
                    { text: "Vênus", correct: false },
                    { text: "Marte", correct: true },
                    { text: "Júpiter", correct: false },
                    { text: "Saturno", correct: false }
                ]
            },
            {
                question: "Qual é a estrela mais próxima da Terra?",
                answers: [
                    { text: "Alpha Centauri", correct: false },
                    { text: "Sirius", correct: false },
                    { text: "Sol", correct: true },
                    { text: "Betelgeuse", correct: false }
                ]
            },
            {
                question: "Quantos planetas existem no nosso sistema solar?",
                answers: [
                    { text: "7", correct: false },
                    { text: "8", correct: true },
                    { text: "9", correct: false },
                    { text: "10", correct: false }
                ]
            },
            {
                question: "Qual destes não é um planeta gasoso?",
                answers: [
                    { text: "Júpiter", correct: false },
                    { text: "Saturno", correct: false },
                    { text: "Marte", correct: true },
                    { text: "Urano", correct: false }
                ]
            },
            {
                question: "Qual é o planeta mais próximo do Sol?",
                answers: [
                    { text: "Vênus", correct: false },
                    { text: "Terra", correct: false },
                    { text: "Mercúrio", correct: true },
                    { text: "Marte", correct: false }
                ]
            },
            {
                question: "O que é a Via Láctea?",
                answers: [
                    { text: "Uma constelação", correct: false },
                    { text: "Nossa galáxia", correct: true },
                    { text: "Um sistema planetário", correct: false },
                    { text: "Um tipo de nebulosa", correct: false }
                ]
            },
            {
                question: "Qual destes planetas tem anéis?",
                answers: [
                    { text: "Marte", correct: false },
                    { text: "Vênus", correct: false },
                    { text: "Saturno", correct: true },
                    { text: "Mercúrio", correct: false }
                ]
            },
            {
                question: "Qual é o segundo planeta mais próximo do Sol?",
                answers: [
                    { text: "Terra", correct: false },
                    { text: "Marte", correct: false },
                    { text: "Vênus", correct: true },
                    { text: "Mercúrio", correct: false }
                ]
            },
            {
                question: "Qual destes é considerado um planeta anão?",
                answers: [
                    { text: "Plutão", correct: true },
                    { text: "Marte", correct: false },
                    { text: "Vênus", correct: false },
                    { text: "Netuno", correct: false }
                ]
            }
        ];

        const quizElements = {
            startButton: document.querySelector(".start-quiz"),
            nextButton: document.querySelector(".next-question"),
            questionsContainer: document.querySelector(".questions-container"),
            questionText: document.querySelector(".question"),
            answersContainer: document.querySelector(".answers-container")
        };

        let currentQuestionIndex = 0;
        let totalCorrect = 0;

        if (Object.values(quizElements).every(el => el !== null)) {
            quizElements.startButton.addEventListener("click", startQuiz);
            quizElements.nextButton.addEventListener("click", nextQuestion);

            function startQuiz() {
                quizElements.startButton.classList.add("hide");
                quizElements.questionsContainer.classList.remove("hide");
                showQuestion();
            }

            function showQuestion() {
                resetQuizState();
                
                if (currentQuestionIndex >= questions.length) {
                    return showResults();
                }
                
                const currentQuestion = questions[currentQuestionIndex];
                quizElements.questionText.textContent = currentQuestion.question;
                
                currentQuestion.answers.forEach(answer => {
                    const button = document.createElement("button");
                    button.className = "answer button";
                    button.textContent = answer.text;
                    
                    if (answer.correct) {
                        button.dataset.correct = "true";
                    }
                    
                    button.addEventListener("click", selectAnswer);
                    quizElements.answersContainer.appendChild(button);
                });
            }

            function resetQuizState() {
                quizElements.answersContainer.innerHTML = '';
                quizElements.nextButton.classList.add("hide");
            }

            function selectAnswer(e) {
                const selectedButton = e.target;
                const isCorrect = selectedButton.dataset.correct === "true";
                
                document.querySelectorAll('.answer').forEach(button => {
                    button.disabled = true;
                    
                    if (button.dataset.correct === "true") {
                        button.classList.add("correct");
                    } else {
                        button.classList.add("incorrect");
                    }
                });
                
                if (isCorrect) {
                    totalCorrect++;
                }
                
                quizElements.nextButton.classList.remove("hide");
            }

            function nextQuestion() {
                currentQuestionIndex++;
                showQuestion();
            }

            function showResults() {
                const score = Math.floor((totalCorrect / questions.length) * 100);
                let message;
                
                if (score >= 90) message = "Excelente! Você é um expert em astronomia!";
                else if (score >= 70) message = "Muito bom! Você conhece bem o sistema solar.";
                else if (score >= 50) message = "Bom! Continue aprendendo sobre o cosmos.";
                else message = "Continue explorando o universo!";
                
                quizElements.questionsContainer.innerHTML = `
                    <p class="final-message">
                        Você acertou ${totalCorrect} de ${questions.length} questões!<br>
                        <span>${message}</span>
                    </p>
                    <button class="button" onclick="window.location.reload()">Refazer teste</button>
                `;
            }
        }
    }
});