'use strict';
/*jshint -W097*/

const inputNum = document.querySelector('#num');
const btn = document.querySelector('#btn');
const form = document.querySelector('.form-task-3');
const forCards = document.querySelector('.form-task-3__cards-body');

function getInfoHTML(text) {
    btn.disabled = true;
    const div = document.createElement('div');
    div.classList.add('text-error');
    div.innerHTML = `
        <p>${text}</p>
        `;
    form.append(div);
    setTimeout(() => {
        div.remove();
        btn.disabled = false;
    }, 2940);
}

let xhr = new XMLHttpRequest();

//не делал через form с событием submit, так как в таком случае событие срабатывает ни с первого клика(выявил при тестировании)
btn.addEventListener('click', (e) => {
    e.preventDefault();
    let value = inputNum.value;
    if (value >= 1 && value <= 10) {
        xhr.open('GET', `https://picsum.photos/v2/list/?limit=${value}`);
        xhr.onload = function () {
            if (xhr.status != 200) { //если статус не 200(ошибка)
                getInfoHTML(`Статус ответа: ${xhr.status}`);
            } else {
                // Ответ мы получаем в формате JSON, поэтому его надо распарсить
                // console.log('Ответ сервера JSON', xhr.response);
                // Парсим и выводим ответ сервера
                const result = JSON.parse(xhr.response);
                console.log('Результат: ', result);

                let cards = '';

                result.forEach(element => {
                    const cardBlock = `
                    <div class="card">
                    <img
                      src="${element.download_url}"
                      class="card-image"
                    />
                    <p>${element.author}</p>
                    </div>
                    `;
                    cards = cards + cardBlock;
                });

                forCards.innerHTML = cards;
            }
        };
        xhr.onprogress = function (event) {
            getInfoHTML(`Загружено ${event.loaded} из ${event.total}; Ответ в консоли!`);
        };
        xhr.onerror = function () {
            console.log('Ошибка! Статус ответа: ', xhr.status);
            getInfoHTML('Ответ в консоли!');
        };

        // Отправляем запрос
        xhr.send();

    } else if (value == '') {
        forCards.innerHTML = '';
        getInfoHTML('пустая строка!');
    } else {
        forCards.innerHTML = '';
        getInfoHTML('число вне диапазона от 1 до 10');
    }
    form.reset();
});