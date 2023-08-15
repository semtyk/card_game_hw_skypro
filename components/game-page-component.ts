import { renderMainPage } from '../index';
import { createCardArray } from '../js/helpers';
import { renderEndGameMessage } from './end-game-message-component';
import { Timer } from 'timer-node';

export function renderGamePage(difficult: string) {
    const appEl = document.getElementById('app');
    let firstCard: number = null;
    let secondCard: number = null;
    let clickable = true;
    const cardArray = createCardArray(difficult); //создаем массив из случайных пермешанных пар карт
    //console.log(cardArray); //ТЕСТ
    const timer = new Timer();
    const openedCardHtml = cardArray
        .map((item, index) => {
            return `<div class='card-item ${item}' data-index=${index}></div>`;
        })
        .join(''); //Создаем количество открытых карт, соответственно количеству сгенерированных карт

    const tabledCardHtml = `
    <div id='game'>
    <header class="header">
            <div class="timer">
                <div class='timer-prm'>
                    <p class='timer-prm-text'>min</p>
                    <h2 class='current-time current-time-minute'>00</h2>
                </div>
                <div class='timer-prm'>
                    <p class='timer-prm-text'>sek</p>
                    <h2 class='current-time current-time-sec'>.00</h2>
                </div>
            </div>
            <button class="reset-game-button" id="startNewGameButton">Начать заново</button>
        </header>
        <section class="game-field">
            ${openedCardHtml}
        </section>
        </div>
    `;

    appEl.innerHTML = tabledCardHtml; //Рисуем их в разметку

    const minutesHtml = document.querySelector('.current-time-minute');
    const secondsHtml = document.querySelector('.current-time-sec');

    timer.start(); //запускаем таймер

    const intervalId = setInterval(() => {
        minutesHtml.innerHTML = timer.format(
            `${Number(timer.format('%m')) < 10 ? '0%m' : '%m'}`,
        );
        secondsHtml.innerHTML = timer.format(
            `${Number(timer.format('%s')) < 10 ? '.0%s' : '.%s'}`,
        );
    }, 1000); //значения таймера будем выводить каждую секунду

    const closedCardHtml = cardArray
        .map((item, index) => {
            return `<div class='card-item' data-index=${index}></div>`;
        })
        .join(''); //Создаем количество закрытых карт, соответственно количеству сгенерированных карт

    const timerId = setTimeout(() => {
        document.querySelector('.game-field').innerHTML = closedCardHtml; //По истечение 5сек скрываем карты

        const cardElements = document.querySelectorAll('.card-item');

        for (const cardElement of cardElements) {
            cardElement.addEventListener('click', () => {
                //При клике на карту проверяем, что клики разрешены а также что эта карта не из пары угаданных
                if (
                    clickable &&
                    !cardElement.classList.contains('checked-card')
                ) {
                    const index: number = Number(
                        (cardElement as HTMLElement).dataset.index,
                    );
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
                                    playedCards.classList.add('checked-card');
                                }
                                firstCard = null;
                                secondCard = null;
                                clickable = true;

                                //Если на все карты навесили класс что они чекнуты, то значит игра завершена успешна
                                if (
                                    Array.from(cardElements).every((card) =>
                                        card.className.includes('checked-card'),
                                    )
                                ) {
                                    //останавливаем таймер и выводим экран с выигрышем
                                    clearInterval(intervalId);
                                    timer.stop();
                                    renderEndGameMessage(true, appEl, timer);
                                }
                            }, 500);
                        } else {
                            setTimeout(() => {
                                //если карты не равны, останавливаем таймер и выводим экран с проигрышем
                                clearInterval(intervalId);
                                timer.stop();
                                renderEndGameMessage(false, appEl, timer);
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
