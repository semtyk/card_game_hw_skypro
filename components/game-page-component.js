import { renderMainPage } from '../index.js';
import { createCardArray } from '../js/helpers.js';

export function renderGamePage(difficult) {
    const appEl = document.getElementById('app');
    let firstCard = null;
    let secondCard = null;
    let clickable = true;
    let cardArray = createCardArray(difficult); //создаем массив из случайных пермешанных пар карт
    //console.log(cardArray); //ТЕСТ

    const openedCardHtml = cardArray
        .map((item, index) => {
            return `<div class='card-item ${item}' data-index=${index}></div>`;
        })
        .join(''); //Создаем количество открытых карт, соответственно количеству сгенерированных карт

    const tabledCardHtml = `
    <header class="header">
            <div class="timer"></div>
            <button class="reset-game-button" id="startNewGameButton">Начать заново</button>
        </header>
        <section class="game-field">
            ${openedCardHtml}
        </section>
    `;
    
    appEl.innerHTML = tabledCardHtml; //Рисуем их в разметку

    const closedCardHtml = cardArray
        .map((item, index) => {
            return `<div class='card-item' data-index=${index}></div>`;
        })
        .join(''); //Создаем количество закрытых карт, соответственно количеству сгенерированных карт

    let timerId = setTimeout(() => {
        document.querySelector('.game-field').innerHTML = closedCardHtml; //По истечение 5сек скрываем карты

        const cardElements = document.querySelectorAll('.card-item');

        for (const cardElement of cardElements) {
            cardElement.addEventListener('click', () => {
                //При клике на карту проверяем, что клики разрешены а также что эта карта не из пары угаданных
                if (
                    clickable &&
                    !cardElement.classList.contains('checkedCard')
                ) {
                    const index = cardElement.dataset.index;
                    cardElement.classList.add(`${cardArray[index]}`); //открываем карту
                    if (firstCard == null) {
                        firstCard = index;
                    } else {
                        if (index != firstCard) {
                            secondCard = index;
                            clickable = false;
                        }
                    } //запоминаем индексы открытых карт
                    /*Когда обе карты открыты, сверяем их: */
                    if (firstCard != null && secondCard != null) {
                        if (cardArray[firstCard] === cardArray[secondCard]) {
                            //если карты равны то обнуляем переменные для новой итерации, а также стилизуем их как сыгранные
                            setTimeout(() => {
                                alert('Вы выиграли');
                                for (const playedCards of document.querySelectorAll(
                                    `.${cardArray[firstCard]}`,
                                )) {
                                    playedCards.classList.add('checkedCard');
                                }
                                firstCard = null;
                                secondCard = null;
                                clickable = true;
                            }, 500);
                        } else {
                            setTimeout(() => {
                                alert('Вы проиграли'); //если карты не равны, то закрываем их
                                document
                                    .querySelector(`.${cardArray[firstCard]}`)
                                    .classList.remove(
                                        `${cardArray[firstCard]}`,
                                    );
                                document
                                    .querySelector(`.${cardArray[secondCard]}`)
                                    .classList.remove(
                                        `${cardArray[secondCard]}`,
                                    );
                                firstCard = null;
                                secondCard = null;
                                clickable = true;
                            }, 500);
                        }
                    }
                }
            });
        }

    }, 5000);

    

    document
        .getElementById('startNewGameButton')
        .addEventListener('click', () => {
            clearTimeout(timerId);
            renderMainPage();
        });
}
