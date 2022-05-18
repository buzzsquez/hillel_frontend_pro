// Создать персонажа игры-платформера. При нажатии на пробел - прыжок вверх на h пикселей. При нажатии на стрелки - передвижение персонажа на step пикселей в сторону (вверх, вниз, вправо, влево) // event.keyCode

// Персонаж - это квадрат, имеющий размеры 100 на 100 пикселей. Прыжок - это анимация движения объекта вверх на h пикселей и возврат в изначальное положение (до прыжка)

// При нажатии на CTRL персонаж должен "присесть" (уменьшиться в размерах по высоте на 40%, по ширине - увеличится на 15%)

// Дополнительно: при зажатом CTRL персонаж может продолжать двигатся в ЛЕВО и ПРАВО! (т.е. ВВЕРХ и ВНИЗ не работают, ПРОБЕЛ не работает)

const body = document.querySelector("body");

const outerBlock = document.createElement("div");
outerBlock.classList.add("outer-block");
body.appendChild(outerBlock);

const gameBox = document.createElement("div");
gameBox.classList.add("game-box");
outerBlock.appendChild(gameBox);

const step = 10;
const h = 75;
const cssAnimationDuration = 100;
const jumpDuration = 120;
let isJumping = false;
let isPushed = false;
let heightBorder = outerBlock.clientHeight - gameBox.clientHeight;
let widthBorder = outerBlock.clientWidth - gameBox.clientWidth;

let positionX = 150;
let positionY = 150;

document.addEventListener("keydown", (event) => {
    switch (event.keyCode) {
        case 37: // Left
            event.preventDefault();
            if (positionX >= step) {
                positionX = positionX - step;
                gameBox.style.left = `${positionX}px`;
            }
            break;
        case 38: // Up
            if (isPushed) return;
            event.preventDefault();
            if (positionY < heightBorder) {
                positionY = positionY + step;
                gameBox.style.bottom = `${positionY}px`;
            }
            break;
        case 39: // Right
            event.preventDefault();
            if (positionX < widthBorder) {
                positionX = positionX + step;
                gameBox.style.left = `${positionX}px`;
            }
            break;
        case 40: // Down
            if (isPushed) return;
            event.preventDefault();
            if (positionY >= step) {
                positionY = positionY - step;
                gameBox.style.bottom = `${positionY}px`;
            }
            break;
        case 32: // Space
            if (isPushed) return;
            event.preventDefault();
            if (isJumping) {
                return;
            }
            isJumping = true;
            gameBox.style.bottom = `${positionY + h}px`;
            setTimeout(() => {
                gameBox.style.bottom = `${positionY}px`;
                setTimeout(() => {
                    isJumping = false;
                }, cssAnimationDuration);
            }, jumpDuration);
            break;
        case 17: // CTRL
            event.preventDefault();
            gameBox.style.height = 60 + `px`;
            gameBox.style.width = 115 + `px`;
            isPushed = true;
            break;
        default:
            return;
    }
});

document.addEventListener("keyup", (event) => {
    switch (event.keyCode) {
        case 17: // CTRL
            event.preventDefault();
            gameBox.style.height = 100 + `px`;
            gameBox.style.width = 100 + `px`;
            isPushed = false;
            break;
        default:
            return;
    }
});