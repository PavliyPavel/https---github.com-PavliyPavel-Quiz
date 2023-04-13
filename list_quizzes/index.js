
const dom = {
    buttons: document.getElementById('buttons'),
}

renderNamesQuiz();

function renderNamesQuiz() {
    
        for (let i = 0; i < localStorage.length; i++) {
            const quizName = localStorage.key(i);
                dom.buttons.append(addHtmlQuizName(quizName));
           }
}
function addHtmlQuizName(quizName){
    let div = document.createElement('div');
    div.className = "button";
    div.innerHTML = quizName;
    return div;
}
    dom.buttons.onclick = (event) => {
        const target = event.target;
        let selectedQuiz = target.textContent;
        document.cookie = `quiz=${selectedQuiz};path=/Quiz;`;
        window.location.href = '/Quiz/index.html';
    }




