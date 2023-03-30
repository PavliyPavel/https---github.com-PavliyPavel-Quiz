
const dom = {
    title: document.getElementById('title'),
    progress: {
        progressFill: document.getElementById('progress-fill'),
        questionNumber: document.getElementById('question-number'),
        totalQuestions: document.getElementById('total-questions')
        
    },
    questionWrap: document.getElementById('question-wrap'),
    step:{
        question: document.getElementById('question'),
        questionPosition: document.getElementById('question-position'),
    },
    answers: document.getElementById('answers'),
    next: document.getElementById('next'),
    result: {
        resultBlock: document.getElementById('result'),
        validAnswers: document.getElementById('valid-answers'),
        questionsCount: document.getElementById('result-total-questions'),
    }

}
dom.title.innerHTML = data.title;

let questionTotal = data.questions.length;
let step = 0;
let result = 0;
let = validAnswersCount = 0;

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
        const html = `<div class="quiz__answer" data-id="${id + 1}">${answer}</div>`;
        answersHTML.push(html);
    });

    return answersHTML.join('');
}

function renderAnswers(step) {
    dom.answers.innerHTML = buildAnswersHtml(data.questions[step].answers);
}

function renderQuiz() {
    if ((step+1) == questionTotal) {
        changeButtonOnResult();
    }
    renderQuestion(questionTotal, step);
    renderProgress(questionTotal, step);
    renderAnswers((questionTotal > step) ? step : (step - 1));
    isDisableButton(true);
    if (step == questionTotal) {
        renderResult();
    }
}
renderQuiz();


dom.next.onclick = () => {
    step < questionTotal ? step++ : alert("Тест окончен");
    renderQuiz();
}

dom.answers.onclick = (event) => {
    const target = event.target;

    if (target.classList.contains('quiz__answer')) {

        const answerNumber = target.dataset.id;
        const isValid = checkAnswer(step,answerNumber);
        //console.log(isValid)
        const answerClass = isValid 
        ? 'quiz__answer_true': 'quiz__answer_false';
        target.classList.add(answerClass);
        isDisableButton(false);

        isValid ? validAnswersCount++ : validAnswersCount;
    }
}

function checkAnswer(step,answerId){
  const validAnswerId = data.questions[step].validAnswer;
  return (validAnswerId == answerId)
}

function changeButtonOnResult() {
        dom.next.innerHTML = 'Посмотреть результат';
        dom.next.dataset.result = 'result';
}   

function isDisableButton(isDisable){
    if (isDisable) {
        dom.next.classList.add('quiz__btn_disable');
    }else{
        dom.next.classList.remove('quiz__btn_disable');
    }
}

function renderResult(){
    dom.answers.style.display = 'none';
    dom.next.style.display = 'none';
    dom.questionWrap.style.display = 'none';

    dom.result.resultBlock.style.display = 'block';
    dom.result.validAnswers.innerHTML = validAnswersCount;
    dom.result.questionsCount.innerHTML = questionTotal;
}