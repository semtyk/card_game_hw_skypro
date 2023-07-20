import { renderMainPage } from '../index.js';
import { renderOpenedCardPage } from './opened-card-page-component.js';
import { createCardArray } from '../js/helpers.js';


export function renderGamePage(difficult) {
    const appEl = document.getElementById('app');
    // let firstCard = null;
    // let secondCard = null;
    // let cardIsClicked = true;
    let cardArray = createCardArray(difficult);  //создаем массив из случайных пермешанных пар карт
    //console.log(cardArray); //ТЕСТ

    const tableCardHtml = cardArray.map((item) => {
        return `<div class='card-item ${item}'></div>`
    }).join('');


    const closedCardHtml = `
    <header class="header">
            <div class="timer"></div>
            <button class="reset-game-button" id="showCardButton">Показать карты</button>
            <button class="reset-game-button" id="startNewGameButton">Начать заново</button>
        </header>
        <section class="game-field">
            ${tableCardHtml}
        </section>
    `;

    appEl.innerHTML = closedCardHtml;

    document
        .getElementById('startNewGameButton')
        .addEventListener('click', () => {
            renderMainPage();
        });

    document.getElementById('showCardButton').addEventListener('click', () => {
        renderOpenedCardPage();
    });
}
