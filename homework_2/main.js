// 1. Ввести с клавиатуры 2 числа `a` и `b` (где `a <<< b`. Символ "<<<" - означает "сильно меньше" ). Запустить цикл перебора от `a` до `b`. Вывести в консоль квадраты чётных чисел.

let a = +prompt("Введите число a");

while (isNaN(a)) {
  a = +prompt("Неверно! Введите число a");
}

let b = +prompt("Введите число b");

while (isNaN(b) || !(b > a)) {
  b = +prompt("Неверно! Введите число b");
}

const diff = b - a;

for (let i = 0; i <= diff; i++) {
  const currentNumber = a + i;

  if (currentNumber % 2 == 0) {
    console.log(currentNumber ** 2); 
  }
}

//--------------------------------------------------------------------------------------

// 2. Заставить пользователя ввести с клавиатуры число (не строку и не NaN).

do {
    a = +prompt('Введите число');
} while (isNaN(a));

alert(a);

//--------------------------------------------------------------------------------------

// 3. Проверить число на простоту. Число вводить с клавиатуры.

let number = +prompt("Введите число");

while (isNaN(number)) {
  number = +prompt("Введите число");
}

let isSimpleNumber = true;
let counter = 2;

do {
  if (number % counter == 0 && number != counter || number < 2) {
    isSimpleNumber = false;
    break;
  }
  counter++;
} while (isSimpleNumber && counter < number);

console.log(isSimpleNumber ? "Простоe число" : "Составное число");

//--------------------------------------------------------------------------------------

// // 4. Посчитать сумму простых чисел от 0 до 250.

let result = 0;

for (let i = 0; i <= 250; i++) {
  let isSimpleNumber = true;
  let counter = 2;

  do {
    if (i % counter == 0 && i != counter || i < 2) {
      isSimpleNumber = false;
      break;
    }
    counter++;
  } while (isSimpleNumber && counter < i);

  if (isSimpleNumber) {
      console.log(result, i);
      result = result + i;
  }
}

console.log(result);