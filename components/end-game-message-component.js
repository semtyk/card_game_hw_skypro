import { renderMainPage } from "../index.js";

export const renderEndGameMessage = (status, appEl) => {
    const endGameBoxHtml = `
                                    <div class="end-game-box">
                <div class=${
                    status ? 'win-smille-img' : 'loose-smille-img'
                }></div>
                <h1 class="end-game-text">${
                    status ? 'Вы выиграли!' : 'Вы проиграли!'
                }</h1>
                <h2 class="end-time-text">Затраченное время:</h2>
                <div class="game-time">14.88</div>
                <button class="reset-game-button reset-game-button__bottom">Играть снова</button>
                                    </div>
                                `;
    
    appEl.innerHTML = appEl.innerHTML + endGameBoxHtml;
    document.getElementById('game').classList.add('game__transparent');
    document
        .querySelector('.reset-game-button__bottom')
        .addEventListener('click', () => {
            renderMainPage();
        });
};