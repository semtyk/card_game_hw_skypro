import { renderMainPage } from '../index.js';
import { createCardArray } from '../js/helpers.js';
import { renderEndGameMessage } from './end-game-message-component.js';

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
    <div id='game'>
    <header class="header">
            <div class="timer"></div>
            <button class="reset-game-button" id="startNewGameButton">Начать заново</button>
        </header>
        <section class="game-field">
            ${openedCardHtml}
        </section>
        </div>
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
                    cardElement.classList.add(`flip`);
                    setTimeout(() => {
                        cardElement.classList.add(`${cardArray[index]}`); //открываем карту
                        cardElement.classList.remove(`flip`);
                    }, 200);
                    if (firstCard === null) {
                        firstCard = index;
                    } else {
                        if (index !== firstCard) {
                            secondCard = index;
                            clickable = false;
                        }
                    } //запоминаем индексы открытых карт
                    /*Когда обе карты открыты, сверяем их: */
                    if (firstCard !== null && secondCard !== null) {
                        if (cardArray[firstCard] === cardArray[secondCard]) {
                            //если карты равны то обнуляем переменные для новой итерации, а также стилизуем их как сыгранные
                            setTimeout(() => {
                                for (const playedCards of document.querySelectorAll(
                                    `.${cardArray[firstCard]}`,
                                )) {
                                    playedCards.classList.add('checkedCard');
                                }
                                firstCard = null;
                                secondCard = null;
                                clickable = true;

                                //Если на все карты навесили класс что они чекнуты, то значит игра завершена успешна
                                if (
                                    Array.from(cardElements).every((card) =>
                                        card.className.includes('checkedCard'),
                                    )
                                ) {
                                    renderEndGameMessage(true, appEl);
                                }
                            }, 500);
                        } else {
                            setTimeout(() => {
                                //если карты не равны, то выводим экран с проигрышем
                                renderEndGameMessage(false, appEl);
                //                 const endGameBoxHtml = `
                //                     <div class="end-game-box">
                // <div class="loose-smille-img"></div>
                // <h1 class="end-game-text">Вы проиграли!</h1>
                // <h2 class="end-time-text">Затраченное время:</h2>
                // <div class="game-time">14.88</div>
                // <button class="reset-game-button reset-game-button__bottom">Играть снова</button>
                //                     </div>
                //                 `;
                //                 appEl.innerHTML =
                //                     appEl.innerHTML + endGameBoxHtml;
                //                 document
                //                     .getElementById('game')
                //                     .classList.add('game-field__transparent');
                //                 document
                //                     .querySelector('.reset-game-button__bottom')
                //                     .addEventListener('click', () => {
                //                         renderMainPage();
                //                     });
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
