//  Создаем 2 блока, у каждого блока есть кнопка Click и счетчик counter(в виде числа).

// При нажатии на Click - counter увеличивается. При перезагрузке страницы counter должен сохраняться.

// Создать кнопку ClearCounters()

// Создать кнопку setCounter(), который запрашивает id блока и устанавливает значение( в типе number ) в counter.

// При увеличении counter-а: каждое значение до 50 должно окрашивать соответствующий блок в случайно сгенерированный цвет. Цвета генерируются при изменении counter-a и сохраняются в Storage. Когда значение доходит до 50 - применяется цвет по умолчанию. 'this.style.backgroundColor = "rgb(x, y, z)";' -> x = getRand(256) y = getRand(256) z = getRand(256)

const body = document.querySelector('body');

const container = document.createElement('div');
container.classList.add('container');

const blocksContainer = document.createElement('div');
blocksContainer.classList.add('blocks-container');
container.appendChild(blocksContainer);

const blockLeft = document.createElement('div');
blockLeft.id = 'left';
blocksContainer.appendChild(blockLeft);

const blockNameLeft = document.createElement('p');
blockNameLeft.classList.add('name');
blockNameLeft.innerHTML = 'Left';
blockLeft.appendChild(blockNameLeft);

const numberCounterLeft = document.createElement('p');
numberCounterLeft.classList.add('counter');
blockLeft.appendChild(numberCounterLeft);

const buttonClickLeft = document.createElement('button');
buttonClickLeft.dataset.button = 'left-click';
buttonClickLeft.classList.add('button');
buttonClickLeft.innerHTML = 'CLICK';
blockLeft.appendChild(buttonClickLeft);

const blockRight = document.createElement('div');
blockRight.id = 'right';
blocksContainer.appendChild(blockRight);

const blockNameRight = document.createElement('p');
blockNameRight.classList.add('name');
blockNameRight.innerHTML = 'Right';
blockRight.appendChild(blockNameRight);

const numberCounterRight = document.createElement('p');
numberCounterRight.classList.add('counter');
blockRight.appendChild(numberCounterRight);

const buttonClickRight = document.createElement('button');
buttonClickRight.dataset.button = 'right-click';
buttonClickRight.classList.add('button');
buttonClickRight.innerHTML = 'CLICK';
blockRight.appendChild(buttonClickRight);

const buttonContainer = document.createElement('div');
buttonContainer.classList.add('container-button');
container.appendChild(buttonContainer);

const clearCounters = document.createElement('button');
clearCounters.dataset.button = 'clear-button';
clearCounters.classList.add('button');
clearCounters.innerHTML = 'CLEAR';
buttonContainer.appendChild(clearCounters);

const setCounter = document.createElement('button');
setCounter.dataset.button = 'set-button';
setCounter.classList.add('button');
setCounter.innerHTML = 'SET';
buttonContainer.appendChild(setCounter);

body.appendChild(container);

function getColor() {
    return Math.floor(Math.random() * 256);
}

const indicator = {
    counterLeft: 0,
    counterRight: 0,
    backgroundColorLeft: 'white',
    backgroundColorRight: 'white',
};

function setInitialValues() {
    const indicatorInitial = JSON.parse(localStorage.getItem('indicator')) || indicator;

    numberCounterLeft.innerHTML = indicatorInitial.counterLeft;
    blockLeft.style.backgroundColor = indicatorInitial.backgroundColorLeft;

    numberCounterRight.innerHTML = indicatorInitial.counterRight;
    blockRight.style.backgroundColor = indicatorInitial.backgroundColorRight;
}

setInitialValues();

function changeColor(blockNode, value, colorKey) {
    if (value > 0 && value < 50) {
        const color = `rgb(${getColor()}, ${getColor()}, ${getColor()})`;
        blockNode.style.backgroundColor = color;
        indicator[colorKey] = color;
    } else {
        blockNode.style.backgroundColor = 'white';
        indicator[colorKey] = 'white';
    }
}

container.addEventListener('click', (event) => {
    if (event.target.dataset.button == 'left-click') {
        indicator.counterLeft++;
        numberCounterLeft.innerHTML = indicator.counterLeft;
        changeColor(blockLeft, indicator.counterLeft, 'backgroundColorLeft');
        localStorage.setItem('indicator', JSON.stringify(indicator));
    }
    if (event.target.dataset.button == 'right-click') {
        indicator.counterRight++;
        numberCounterRight.innerHTML = indicator.counterRight;
        changeColor(blockRight, indicator.counterRight, 'backgroundColorRight');
        localStorage.setItem('indicator', JSON.stringify(indicator));
    }
    if (event.target.dataset.button == 'clear-button') {
        numberCounterLeft.innerHTML = 0;
        numberCounterRight.innerHTML = 0;
        indicator.counterLeft = 0;
        indicator.counterRight = 0;

        changeColor(blockLeft, indicator.counterLeft, 'backgroundColorLeft');
        changeColor(blockRight, indicator.counterRight, 'backgroundColorRight');

        localStorage.setItem('indicator', JSON.stringify(indicator));
    }
    if (event.target.dataset.button == 'set-button') {
        let blockChoose = prompt('Choose block (Left of Right)').toLowerCase();
        let enterNumber = prompt('Enter number');

        if (isNaN(enterNumber)) return;

        if (blockChoose == 'left') {
            numberCounterLeft.innerHTML = +enterNumber;
            indicator.counterLeft = +enterNumber;
            changeColor(blockLeft, +enterNumber, 'backgroundColorLeft');
        }
        if (blockChoose == 'right') {
            numberCounterRight.innerHTML = +enterNumber;
            indicator.counterRight = +enterNumber;
            changeColor(blockRight, +enterNumber, 'backgroundColorRight');
        }
        localStorage.setItem('indicator', JSON.stringify(indicator));
    }
});