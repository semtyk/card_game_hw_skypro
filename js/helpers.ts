const PAIR_FOR_LOW = 3;
const PAIR_FOR_MEDIUM = 6;
const PAIR_FOR_HIGH = 9;

/*Функция для перемешивания элементов массива */
export function shuffle(array: string[]) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1)); // случайный индекс от 0 до i
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

/*Создаем массив из карт, количеством элементов в зависимости от сложности */

export const createCardArray = (difficult: string) => {
    /*Создали массив из карт всей колоды */
    let arrOfCards = [];
    for (let index = 1; index < 37; index++) {
        arrOfCards.push(`card-item${index}`);
    }

    /*Перемешали колоду */
    arrOfCards = shuffle(arrOfCards);
    //shuffle(arrOfCards);

    /*Обрезаем колоду до необходимого количества элементов, деленного на два */
    switch (difficult) {
        case '1':
            arrOfCards = arrOfCards.slice(0, PAIR_FOR_LOW);
            break;
        case '2':
            arrOfCards = arrOfCards.slice(0, PAIR_FOR_MEDIUM);
            break;
        case '3':
            arrOfCards = arrOfCards.slice(0, PAIR_FOR_HIGH);
            break;
        default:
            break;
    }

    /*Дублируем элементы массива */
    arrOfCards = arrOfCards.concat(arrOfCards);

    /*И снова перемешиваем */
    shuffle(arrOfCards);

    return arrOfCards;
};

//module.exports = { shuffle };
