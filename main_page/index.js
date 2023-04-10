const dom = {
    buttons: document.getElementById('buttons'),
    activeButtons: {
        createQuiz: document.getElementById('create_quize'),
        listQuizzes: document.getElementById('list_quizzes'),
    }
}

dom.buttons.onclick = (event) => {
    const target = event.target;
    if (target.classList.contains('button')) {
        switch (target.id) {
            case 'list_quizzes':
                window.location.href = '/Quiz/index.html';
                break;
            case 'create_quize':
                window.location.href = '/create_quiz/index.html';
                break;
            default:
                break;
        }
    }
}