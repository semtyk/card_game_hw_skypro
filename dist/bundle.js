/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./components/game-page-component.js":
/*!*******************************************!*\
  !*** ./components/game-page-component.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   renderGamePage: () => (/* binding */ renderGamePage)\n/* harmony export */ });\n/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../index.js */ \"./index.js\");\n/* harmony import */ var _js_helpers_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../js/helpers.js */ \"./js/helpers.js\");\n\n\n\nfunction renderGamePage(difficult) {\n    const appEl = document.getElementById('app');\n    let firstCard = null;\n    let secondCard = null;\n    let clickable = true;\n    let cardArray = (0,_js_helpers_js__WEBPACK_IMPORTED_MODULE_1__.createCardArray)(difficult); //создаем массив из случайных пермешанных пар карт\n    //console.log(cardArray); //ТЕСТ\n\n    const openedCardHtml = cardArray\n        .map((item, index) => {\n            return `<div class='card-item ${item}' data-index=${index}></div>`;\n        })\n        .join(''); //Создаем количество открытых карт, соответственно количеству сгенерированных карт\n\n    const tabledCardHtml = `\n    <header class=\"header\">\n            <div class=\"timer\"></div>\n            <button class=\"reset-game-button\" id=\"startNewGameButton\">Начать заново</button>\n        </header>\n        <section class=\"game-field\">\n            ${openedCardHtml}\n        </section>\n    `;\n    \n    appEl.innerHTML = tabledCardHtml; //Рисуем их в разметку\n\n    const closedCardHtml = cardArray\n        .map((item, index) => {\n            return `<div class='card-item' data-index=${index}></div>`;\n        })\n        .join(''); //Создаем количество закрытых карт, соответственно количеству сгенерированных карт\n\n    let timerId = setTimeout(() => {\n        document.querySelector('.game-field').innerHTML = closedCardHtml; //По истечение 5сек скрываем карты\n\n        const cardElements = document.querySelectorAll('.card-item');\n\n        for (const cardElement of cardElements) {\n            cardElement.addEventListener('click', () => {\n                //При клике на карту проверяем, что клики разрешены а также что эта карта не из пары угаданных\n                if (\n                    clickable &&\n                    !cardElement.classList.contains('checkedCard')\n                ) {\n                    const index = cardElement.dataset.index;\n                    cardElement.classList.add(`${cardArray[index]}`); //открываем карту\n                    if (firstCard == null) {\n                        firstCard = index;\n                    } else {\n                        if (index != firstCard) {\n                            secondCard = index;\n                            clickable = false;\n                        }\n                    } //запоминаем индексы открытых карт\n                    /*Когда обе карты открыты, сверяем их: */\n                    if (firstCard != null && secondCard != null) {\n                        if (cardArray[firstCard] === cardArray[secondCard]) {\n                            //если карты равны то обнуляем переменные для новой итерации, а также стилизуем их как сыгранные\n                            setTimeout(() => {\n                                alert('Вы выиграли');\n                                for (const playedCards of document.querySelectorAll(\n                                    `.${cardArray[firstCard]}`,\n                                )) {\n                                    playedCards.classList.add('checkedCard');\n                                }\n                                firstCard = null;\n                                secondCard = null;\n                                clickable = true;\n                            }, 500);\n                        } else {\n                            setTimeout(() => {\n                                alert('Вы проиграли'); //если карты не равны, то закрываем их\n                                document\n                                    .querySelector(`.${cardArray[firstCard]}`)\n                                    .classList.remove(\n                                        `${cardArray[firstCard]}`,\n                                    );\n                                document\n                                    .querySelector(`.${cardArray[secondCard]}`)\n                                    .classList.remove(\n                                        `${cardArray[secondCard]}`,\n                                    );\n                                firstCard = null;\n                                secondCard = null;\n                                clickable = true;\n                            }, 500);\n                        }\n                    }\n                }\n            });\n        }\n\n    }, 5000);\n\n    \n\n    document\n        .getElementById('startNewGameButton')\n        .addEventListener('click', () => {\n            clearTimeout(timerId);\n            (0,_index_js__WEBPACK_IMPORTED_MODULE_0__.renderMainPage)();\n        });\n}\n\n\n//# sourceURL=webpack://card_game_hw_skypro/./components/game-page-component.js?");

/***/ }),

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   renderMainPage: () => (/* binding */ renderMainPage)\n/* harmony export */ });\n/* harmony import */ var _components_game_page_component_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/game-page-component.js */ \"./components/game-page-component.js\");\n\n\nwindow.globalState = {\n    diffLevel: '',\n};\n\nconst renderMainPage = () => {\n    /*Рендерим стартовую страницу с выбором сложности */\n    const appEl = document.getElementById('app');\n    const appHtml = `\n    <div class=\"start-select-box\">\n                <h1 class=\"difficult-text\">Выбери сложность</h1>\n                <section class=\"difficult-checkbox\">\n                    <div class=\"difficult-item\" data-index='1'>1</div>\n                    <div class=\"difficult-item\" data-index='2'>2</div>\n                    <div class=\"difficult-item\" data-index='3'>3</div>\n                </section>\n                <button class=\"start-game-button\">Старт</button>\n            </div>\n    `;\n    appEl.innerHTML = appHtml;\n\n    /* Добавляем интерактивности выбору сложности. При нажатии на кнопку сложности, она сохраняется в переменную */\n    const levelSelectEls = document.querySelectorAll('.difficult-item');\n    for (const levelSelectEl of levelSelectEls) {\n        levelSelectEl.addEventListener('click', () => {\n            for (const levelSelectEl of levelSelectEls) {\n                levelSelectEl.classList.remove('difficult-item-select');\n            }\n            levelSelectEl.classList.add('difficult-item-select');\n            window.globalState.diffLevel = levelSelectEl.dataset.index;\n            console.log(window.globalState.diffLevel);\n        });\n    }\n\n    /* Добавляем обработчик события на кнопку начала игры */\n    const buttonStartGame = document.querySelector('.start-game-button');\n    buttonStartGame.addEventListener('click', () => {\n        if (window.globalState.diffLevel) {\n            (0,_components_game_page_component_js__WEBPACK_IMPORTED_MODULE_0__.renderGamePage)(window.globalState.diffLevel);\n        }\n    });\n};\n\nrenderMainPage();\n\n\n//# sourceURL=webpack://card_game_hw_skypro/./index.js?");

/***/ }),

/***/ "./js/helpers.js":
/*!***********************!*\
  !*** ./js/helpers.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   createCardArray: () => (/* binding */ createCardArray)\n/* harmony export */ });\nconst PAIR_FOR_LOW = 3;\r\nconst PAIR_FOR_MEDIUM = 6;\r\nconst PAIR_FOR_HIGH = 9;\r\n\r\n/*Функция для перемешивания элементов массива */\r\nfunction shuffle(array) {\r\n    for (let i = array.length - 1; i > 0; i--) {\r\n        let j = Math.floor(Math.random() * (i + 1)); // случайный индекс от 0 до i\r\n        [array[i], array[j]] = [array[j], array[i]];\r\n    }\r\n}\r\n\r\n\r\n/*Создаем массив из карт, количеством элементов в зависимости от сложности */\r\n\r\nconst createCardArray = (difficult) => {\r\n\r\n    /*Создали массив из карт всей колоды */\r\n    let arrOfCards = [];\r\n    for (let index = 1; index < 37; index++) {\r\n        arrOfCards.push(`card-item${index}`);\r\n    }\r\n\r\n    /*Перемешали колоду */\r\n    shuffle(arrOfCards);\r\n\r\n    /*Обрезаем колоду до необходимого количества элементов, деленного на два */\r\n    switch (difficult) {\r\n        case '1':\r\n            arrOfCards = arrOfCards.slice(0, PAIR_FOR_LOW);\r\n            break;\r\n        case '2':\r\n            arrOfCards = arrOfCards.slice(0, PAIR_FOR_MEDIUM);\r\n            break;\r\n        case '3':\r\n            arrOfCards = arrOfCards.slice(0, PAIR_FOR_HIGH);\r\n            break;\r\n        default:\r\n            break;\r\n    }\r\n\r\n    /*Дублируем элементы массива */\r\n    arrOfCards = arrOfCards.concat(arrOfCards);\r\n\r\n    /*И снова перемешиваем */\r\n    shuffle(arrOfCards);\r\n    \r\n    return arrOfCards;\r\n};\r\n\n\n//# sourceURL=webpack://card_game_hw_skypro/./js/helpers.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./index.js");
/******/ 	
/******/ })()
;