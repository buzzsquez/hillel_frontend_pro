// Реализовать калькулятор, в котором есть слайдер (`input type=”range”`) и поле ввода (`input type=”number”`).

// Изменяя состояние `range` меняется состояние поля ввода `number`. И наоборот.

// Реализовать блок-диаграмму, который в пикселях будет отображать значение range.

// Например - range выбрали число 83, высота блока-диаграммы будет 83 пикселя.

// ![Alt Text](/src/images/img_3.png)

// Красный блок - количество комиссии. Комиссия вычисляется по формуле:

//     (range < 20) -> 2%
//     (20 - 50)  -> 4%
//     (50 - 75)  -> 6%
//     (75 - 100)  -> 8%

// Красный блок отображает количество комиссии. Например Значение выбора 100, комиссия будет 8%. Результирующая сумма: 108. Высота красного блока - 8px 

const style = `
.container {
    margin: 0 auto;
    padding: 0 20px;
    display: flex;
}

.number {
    width: 130px;
}

.outer-block {
    position: absolute;
    border: 3px solid black;
    width: 40px;
    height: 100px;
    left: 140px;
    top: 50px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
}

.number-block {
    height: 0px;
    background-color: green;
}

.fee-block {
    height: 0px;
    background-color: red;
}

.show-number {
    position: absolute;
    left: 70px;
    top: 75px;
    font-size: 20px;
}

.show-range {
    position: absolute;
    left: 80px;
    top: 150px;
    font-size: 20px;
}
`;

const body = document.querySelector('body');

const styleMenu = document.createElement('style');
body.appendChild(styleMenu);
styleMenu.innerHTML = style;

const container = document.createElement('div');
container.classList.add('container');
body.appendChild(container);

const range = document.createElement('input');
range.setAttribute('type', 'range');
range.setAttribute('min', '0');
range.setAttribute('max', '100');
range.setAttribute('value', '0');
container.appendChild(range);

const number = document.createElement('input');
number.setAttribute('type', 'number');
number.setAttribute('min', '0');
number.setAttribute('max', '100');
number.setAttribute('value', '0');
number.classList.add('number');
container.appendChild(number);

const outerBlock = document.createElement('div');
outerBlock.classList.add('outer-block');
container.appendChild(outerBlock);

const numberBlock = document.createElement('div');
numberBlock.classList.add('number-block');
outerBlock.appendChild(numberBlock);

const feeBlock = document.createElement('div');
feeBlock.classList.add('fee-block');
numberBlock.appendChild(feeBlock);

const showNumber = document.createElement('p');
showNumber.classList.add('show-number');
body.appendChild(showNumber);
showNumber.innerHTML = 0;

const showRange = document.createElement('p');
showRange.classList.add('show-range');
body.appendChild(showRange);
showRange.innerHTML = 'Test Range: 0 - 100';

function countFee(value) {
    if (value == 0) {
        return 0;
    } else if (value <= 20) {
        return value * 0.02;
    } else if (value > 20 && value <= 50) {
        return value * 0.04;
    } else if (value > 50 && value <= 75) {
        return value * 0.06;
    } else if (value > 75 && value <= 100) {
        return value * 0.08;
    }
};

function onInputChange(e) {
    if (e.target.value >= 0 && e.target.value <= 100) {
        if (e.target.type == 'range') {
            number.value = e.target.value;
        } else if (e.target.type == 'number') {
            range.value = e.target.value;
        }
        numberBlock.style.height = e.target.value + 'px';
        const fee = countFee(Number(e.target.value));
        showNumber.textContent = Number(e.target.value) + fee;
        feeBlock.style.height = fee + 'px';
    }
};

number.addEventListener("change", onInputChange);
range.addEventListener("change", onInputChange);