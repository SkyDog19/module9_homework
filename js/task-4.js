'use strict';
/*jshint -W097*/

const inputNum41 = document.querySelector('#num41');
const inputNum42 = document.querySelector('#num42');
const btn = document.querySelector('#btn4');
const form = document.querySelector('.form-task-4');
const forCards = document.querySelector('.form-task-4__cards-body');

function getInfoHTML(text) {
    btn.disabled = true;
    const div = document.createElement('div');
    div.classList.add('text-error-fo-task');
    div.innerHTML = `
        <p>${text}</p>
        `;
    form.append(div);
    setTimeout(() => {
        div.remove();
        btn.disabled = false;
    }, 2940);
}

//не делал через form с событием submit, так как в таком случае событие срабатывает ни с первого клика(выявил при тестировании)
btn.addEventListener('click', (e) => {
    e.preventDefault();
    let value41 = inputNum41.value;
    let value42 = inputNum42.value;

    if (value41 >= 100 && value41 <= 300 && value42 >= 100 && value42 <= 300) {
        fetch(`https://picsum.photos/${value41}/${value42}`)
            .then((response) => {
                return response;
            }).then(() => {
                let cards = '';

                const cardBlock = `
                    <div class="card">
                    <img
                        src="https://picsum.photos/${value41}/${value42}" alt="image"
                        class="card-image"
                    />
                    </div>
                    `;
                cards = cards + cardBlock;

                forCards.innerHTML = cards;
            }).catch(() => {
                getInfoHTML('проверьте соединение с интернетом');
            }).finally(() => {
                form.reset();
            });
    } else if (value41 == '' || value42 == '') {
        getInfoHTML('Введена пустая строка');
    } else {
        getInfoHTML('числа вне диапазона от 100 до 300');
    }
});