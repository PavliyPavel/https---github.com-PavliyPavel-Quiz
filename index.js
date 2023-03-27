
const dom = {
    title: document.getElementById('title'),
    progress: {
        progressFill: document.getElementById('progress-fill'),
        questionNumber: document.getElementById('question-number'),
        totalQuestions: document.getElementById('total-questions')
        
    },
    step:{
        question: document.getElementById('question'),
        questionPosition: document.getElementById('question-position'),
    },
    answers: document.getElementById('answers'),
    next: document.getElementById('next'),

}

let questionTotal = data.questions.length;
let step = 0;

function renderProgress(total,step){
    dom.progress.progressFill.style.width = (step /total) * 100  + "%" ;
    dom.progress.questionNumber.innerHTML = step;
    dom.progress.totalQuestions.innerHTML = total;
}


function renderQuestion(total,step){
    if (total > step) {
        dom.step.question.innerHTML = data.questions[step].qustion;
        dom.step.questionPosition.innerHTML = step + 1;
    }
}

function buildAnswersHtml(answers){
    const answersHTML = [];
    answers.forEach((answer, id) => {
        const html = `<div class="quiz__answer" data-id="${id}">${answer}</div>`;
        answersHTML.push(html);
    });

    return answersHTML.join('');
}

function renderAnswers(step) {
    dom.answers.innerHTML = buildAnswersHtml(data.questions[step].answers);
}

function renderQuiz() {
    renderQuestion(questionTotal, step);
    renderProgress(questionTotal, step);
    renderAnswers((questionTotal > step) ? step : (step - 1));
}
//renderQuiz();

dom.answers.onclick = (event) => {
 console.log(event.target);
}

dom.next.onclick = () => {
    step < questionTotal ? step++ : alert("Тест окончен");
    renderQuiz();
}


