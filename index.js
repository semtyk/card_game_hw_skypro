import { renderGamePage } from "./components/game-page-component.js";

let globalState = {
    diffLevel: '',
}

const levelSelectEls = document.querySelectorAll('.difficult-item');
for (const levelSelectEl of levelSelectEls) {
    levelSelectEl.addEventListener('click', () => {
        for (const levelSelectEl of levelSelectEls) {
                levelSelectEl.classList.remove('difficult-item__select');
        }
        levelSelectEl.classList.add('difficult-item__select');
        globalState.diffLevel = levelSelectEl.dataset.index;
        console.log(globalState.diffLevel);
    })
}

const buttonStartGame = document.querySelector('.startGame-button');
buttonStartGame.addEventListener('click', () => {
    renderGamePage(globalState.diffLevel);
})