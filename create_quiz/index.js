const dom = {
    buttons: {
        addQuestion: document.getElementById('addQuestion'),
        createQuiz:document.getElementById('createQuiz'),
    },
    inputs:{
        inputTitle: document.getElementById('input_title'),
        inputTime: document.getElementById('input_time'),
    },
    questions: document.getElementById('questions'),
    inputIsEmpty: document.getElementById('inputIsEmpty'),

    
}
let idAnswer = 1;
let idQuastion = 1;

dom.buttons.addQuestion.onclick = () => {
  dom.questions.append(addHtmlQuestion());
}

dom.buttons.createQuiz.onclick = () => {
    if (notifyUserEmpty(isValueInputEmpty())){
        return;
    }
    let titleQuiz = document.getElementById('input_title').value;
    localStorage.setItem(titleQuiz,toJSON(saveQuiz()));
    window.location.href = '/main_page/index.html';
}

function toJSON(quiz) {
    return JSON.stringify(quiz);
}

dom.questions.onclick = (event) => {
    const target = event.target;
    if(target.classList.contains('addAnswer__btn')){
        activityAddAnswer(target);
        return;
    }
    if(target.classList.contains('deleteAnswer')){
        activityDeleteAnswer(target);
        return;
    }
    if(target.classList.contains('deleteAnswer__btn')){
        activityDeleteQuestion(target);
        return;
    }
    if(target.classList.contains('boolAnswer')){
        activityBoolAnswer(target);
        return;
    }
}

function activityAddAnswer(target) {
        childs = target.closest('.quiz').children;
        for (let child of childs) {
             if (child.id == 'answers') {
                child.append(addHtmlAnswer());
             }
        }
}

function activityDeleteAnswer(target) {
    target.closest('.input__answer').remove();
}

function activityDeleteQuestion(target) {
    target.closest('.quiz').remove();
}

function activityBoolAnswer(target) {
        childs = target.closest('.quiz').querySelectorAll('.boolAnswer');
        for (const child of childs) {
            child.dataset.active = false;
            child.style.background = 'linear-gradient(to right bottom,#45558b, #438567)';  
        }
        target.dataset.active = true;
        target.style.background = 'linear-gradient(to left top,yellow,#77ee99)';    
        
}

function addHtmlQuestion() {
    let div = document.createElement('div');
    div.className = "quiz";
    div.dataset.id = idQuastion;
    div.innerHTML = `
                <div id="question-wrap"  class="quiz__question">
                    <input id="question" class="input"></input>
                </div>
                <div id="answers" class="quiz_answers" data-id="${idQuastion}"></div>
                <div id="addAnswer" class="addAnswer__btn">Добавить ответ</div>
                <div id="deleteQuestion" class="deleteAnswer__btn">Удалить вопрос</div>
            
    `;
    idQuastion++;//?????? уверен?
   return div;
}

function addHtmlAnswer(){
    let div = document.createElement('div');
    div.className = "input__answer";
    div.dataset.id = idAnswer++;
    div.innerHTML = `
                        <form>
                            <div id="boolAnswer" class="boolAnswer" ></div>
                            <input id="input__answer" class="input" type="text">
                            <div id="deleteAnswer" class="deleteAnswer">X</div>
                        </form>
    `;
    return div;
}

function findValidAnswer(question) {
    let answers = question.querySelectorAll('#boolAnswer');
    let variantAnswers = [];
    for (const answer of answers) {
        variantAnswers.push(answer.dataset.active);
    }
    for (let variantAnswer = 0; variantAnswer < variantAnswers.length; variantAnswer++) {
        console.log(variantAnswers[variantAnswer]);
        if (variantAnswers[variantAnswer] === "true") {
            return ++variantAnswer;
        }
    }
}



function saveQuiz() {
    
    let quiz = {
        title: "",
        timeToAnswer: 0,
        questions: [],
    };
    let answersTime = [];
    const questions = document.querySelectorAll('.quiz');
    for (const question of questions) {
        let answers = question.querySelectorAll('#input__answer');
        for (const answer of answers) {
            answersTime.push(answer.value);
        }
    quiz.questions.push({
        question: question.querySelector('#question').value, 
        answers: answersTime,
        validAnswer: findValidAnswer(question),
    })
    answersTime = [];
    }
    quiz.title = document.getElementById('input_title').value;
    quiz.timeToAnswer = document.getElementById('input_time').value;

    return quiz;
}

function isValueInputEmpty() {
    let inputs = document.querySelectorAll(".input")
    for (const input of inputs) {
        if (input.value === '') {
            return true;
        }
    }
    return false;
}

function notifyUserEmpty(bool) {
    if (bool) {
        dom.inputIsEmpty.innerHTML = 'Не все поля заполнены!!!'
        dom.inputIsEmpty.style.color = 'red';
        setTimeout(() => {
            dom.inputIsEmpty.innerHTML = ''
        }, 2000);
        return true;
    }
    return false;
}


