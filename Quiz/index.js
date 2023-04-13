import data1 from "/dataJSON.json" assert {type: 'json'};
let data = JSON.parse(localStorage.getItem(getCookie('quiz')));

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
    timer:{
        timerCounter: document.getElementById('timer__counter'),
        timerFill: document.getElementById('timer__body'),
        timerWrap: document.getElementById('timer-wrap'),
        timeIsOver: document.getElementById('timeIsOver')
    },
    result: {
        resultBlock: document.getElementById('result'),
        validAnswers: document.getElementById('valid-answers'),
        questionsCount: document.getElementById('result-total-questions'),
    }
    
}


dom.title.innerHTML = data.title;
dom.timer.timerCounter.innerHTML =  data.timeToAnswer;

let questionTotal = data.questions.length;
let step = 0;
let validAnswersCount = 0;
let ArrayAnswers;
let faild = false;

function renderProgress(total,step){
    dom.progress.progressFill.style.width = (step /total) * 100  + "%" ;
    dom.progress.questionNumber.innerHTML = step;
    dom.progress.totalQuestions.innerHTML = total;
}


function renderQuestion(total,step){
    if (total > step) {
        dom.step.question.innerHTML = data.questions[step].question;
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
   // if ((step+1) == questionTotal) {changeButtonOnResult();}
    renderQuestion(questionTotal, step);
    renderProgress(questionTotal, step);
    renderAnswers((questionTotal > step) ? step : (step - 1));
    isDisableButtonNext(true);
    ArrayAnswers = findAnswers();
    if (step == questionTotal) {
        renderResult();
    }
}
renderQuiz();


dom.next.onclick = () => {
    if (dom.next.dataset.result == 'result' && faild == true) {
        renderResult();
    }else{
        step < questionTotal ? step++ : alert("Тест окончен");
        renderQuiz();
    }
}

dom.answers.onclick = (event) => {
    const target = event.target;
    //Проверка на последний вопрос, после ответа кнопка меняется на "Показать результыты"
   if ((step+1) == questionTotal) {
    changeButtonOnResult();
    }

    if (target.classList.contains('quiz__answer')) {
        
        const answerNumber = target.dataset.id;
        const isValid = checkAnswer(step,answerNumber);
        const answerClass = isValid 
        ? 'quiz__answer_true': 'quiz__answer_false';
        target.classList.add(answerClass);
        if (isValid) {
            for (const iterator of ArrayAnswers) {
                iterator.classList.add('quiz__btn_disable');
            }
        }else{
            for (const iterator of ArrayAnswers) {
                iterator.classList.add('quiz__btn_disable');
                if(data.questions[step].validAnswer == iterator.dataset.id){
                    iterator.classList.add('quiz__answer_true');
                }
            }
        }
        isDisableButtonNext(false);
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

function isDisableButtonNext(isDisable){
    if (isDisable) {
        dom.next.classList.add('quiz__btn_disable');
    }else{
        dom.next.classList.remove('quiz__btn_disable');
    }
}

function isDisableButtons(){
    for (const iterator of ArrayAnswers) {
        iterator.classList.add('quiz__btn_disable');

    }
}

function renderResult(){
    dom.answers.style.display = 'none';
    dom.next.style.display = 'none';
    dom.questionWrap.style.display = 'none';
    dom.timer.timerWrap.style.display ='none';

    renderProgress(questionTotal,step);
    
    dom.result.resultBlock.style.display = 'block';
    dom.result.validAnswers.innerHTML = validAnswersCount;
    dom.result.questionsCount.innerHTML = questionTotal;
}

renderTimer();
function renderTimer() {
    setTimeout(function timer() {
        if (data.timeToAnswer != 0) {
            if (dom.next.dataset.result == 'result') {
                return 0;
            }
            dom.timer.timerCounter.innerHTML = (--data.timeToAnswer);
            setTimeout(timer,1000);
        }else{
            faildQuiz();
        }
    },1000);    
}

function findAnswers() {
    ArrayAnswers = document.getElementsByClassName('quiz__answer');
    return ArrayAnswers;
}

function faildQuiz() {
    changeButtonOnResult();
    isDisableButtonNext(false);
    isDisableButtons();
    faild = true;
    for (const iterator of ArrayAnswers) {
        if (iterator.classList.contains('quiz__answer_true')) {
          step++;
        }
    }

    dom.timer.timeIsOver.innerHTML = '&nbsp;-&nbsp;' + 'Вы не успели завершить Quiz!!!'
    dom.timer.timerFill.style.backgroundColor = 'red';
}

function getCookie(cookieName) {
    var name = cookieName + "=";
    var splitCookies = document.cookie.split(';');
    for(var i = 0; i < splitCookies.length; i++) {
        var Cookie = splitCookies[i];
         if (Cookie.indexOf(name) == 0) {
            return Cookie.substring(name.length, Cookie.length);
         }
     }
    return "";
}