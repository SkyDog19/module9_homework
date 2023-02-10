'use strict';
/*jshint -W097*/


const inputNum51 = document.querySelector('#num51');
const inputNum52 = document.querySelector('#num52');
const btn = document.querySelector('#btn5');
const form = document.querySelector('.form-task-5');
const forCards = document.querySelector('.form-task-5__cards-body');
const LS = localStorage;

forCards.innerHTML = JSON.parse(LS.getItem('cards')); //эту строчку надо глобально сюда, так как при обновлении он читает сверху вниз

function getInfoHTML(text) {
    btn.disabled = true;
    const div = document.createElement('div');
    div.classList.add('text-error-five-task');
    div.innerHTML = `
        <p>${text}</p>
        `;
    form.append(div);
    setTimeout(() => {
        div.remove();
        btn.disabled = false;
    }, 2940);
}

btn.addEventListener('click', (e) => {
    e.preventDefault();
    let value51 = inputNum51.value;
    let value52 = inputNum52.value;

    if (value51 <= 10 && value51 >= 1 && value52 <= 10 && value52 >= 1) {
        fetch(`https://picsum.photos/v2/list?page=${value51}&limit=${value52}`)
            .then((response) => { //полученный json объект
                const result = response.json(); //превратили полученный объект в js
                return result;
            }).then((result) => { //передали полученный js объект
                let cards = '';

                result.forEach(element => {
                    const cardBlock = `
                    <div class="card-for-five-task">
                    <img
                        src="${element.download_url}" alt="image"
                        class="card-image"
                    />
                    </div>
                    `;

                    cards += cardBlock;
                });

                LS.setItem('cards', JSON.stringify(cards));
                forCards.innerHTML = JSON.parse(LS.getItem('cards'));



            }).catch(() => {
                getInfoHTML('проверьте соединение с интернетом');
            }).finally(() => {
                form.reset();
            });

    } else if ((value51 > 10 || value51 < 1) && (value52 > 10 || value52 < 1)) {
        getInfoHTML('Номер страницы и лимита вне диапазона от 1 до 10');
    } else if (value51 > 10 || value51 < 1) {
        getInfoHTML('Номер страницы вне диапазона от 1 до 10');
    } else if (value52 > 10 || value52 < 1) {
        getInfoHTML('Лимит вне диапазона от 1 до 10');
    } else if (value51 == "" || value52 == "") {
        getInfoHTML('Введите числа');
    }
});