import { renderGamePage } from './components/game-page-component.js';

window.globalState = {
    diffLevel: '',
};

export const renderMainPage = () => {
    const appEl = document.getElementById('app');
    const appHtml = `
    <div class="start-select-box">
                <h1 class="difficult-text">Выбери сложность</h1>
                <section class="difficult-checkbox">
                    <div class="difficult-item" data-index='1'>1</div>
                    <div class="difficult-item" data-index='2'>2</div>
                    <div class="difficult-item" data-index='3'>3</div>
                </section>
                <button class="startGame-button">Старт</button>
            </div>
    `;
    appEl.innerHTML = appHtml;

    const levelSelectEls = document.querySelectorAll('.difficult-item');
    for (const levelSelectEl of levelSelectEls) {
        levelSelectEl.addEventListener('click', () => {
            for (const levelSelectEl of levelSelectEls) {
                levelSelectEl.classList.remove('difficult-item__select');
            }
            levelSelectEl.classList.add('difficult-item__select');
            window.globalState.diffLevel = levelSelectEl.dataset.index;
            console.log(window.globalState.diffLevel);
        });
    }

    const buttonStartGame = document.querySelector('.startGame-button');
    buttonStartGame.addEventListener('click', () => {
        renderGamePage();
    });
};

renderMainPage();
