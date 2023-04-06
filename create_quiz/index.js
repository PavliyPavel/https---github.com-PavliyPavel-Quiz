const dom = {
    buttons: {
        addAnswer: document.getElementById('addAnswer'),
        addQuestion: document.getElementById('addQuestion'),
        deleteAnswer: document.getElementById('deleteAnswer'),
        deleteQuestion: document.getElementById('deleteQuestion'),
    },
    inputs:{
        inputTitle: document.getElementById('input_title'),
        inputTime: document.getElementById('input_time'),
    },
    answers: document.getElementById('answers'),
    arrayQuestion: [[]],
}
let id = 0;

dom.buttons.addAnswer.onclick = (arrayQustion) => {
    const html = `
    <div class="input__answer" data-id="${id + 1}">
                        <form>
                            <input id="input__answer" class="input" type="text">
                            <div id="deleteAnswer" class="deleteAnswer" ">X</div>
                        </form>
                      </div>

    `;
    dom.arrayQuestion[0].push(html);
    dom.answers.innerHTML = dom.arrayQuestion[0].join('');
}