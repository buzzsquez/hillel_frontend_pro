// 1. Создать массив А размерностью n. Заполнить случайными числами любом диапазоне. Например A = [23,1,2,52,5,34,23,6,246,436];
// проверить все числа на простоту, и найденные простые числа сохранить в массив B.
// найти максимальное число и минимальное число.

let A = new Array(20);

for (let i = 0; i < A.length; i++) {
  A[i] = Math.floor(Math.random() * 101);
}
console.log("Array A =", A);

let B = [];

for (let i = 0; i < A.length; i++) {
  const number = A[i];

  let isSimpleNumber = true;
  let counter = 2;

  do {
    if ((number % counter == 0 && number != counter) || number < 2) {
      isSimpleNumber = false;
      break;
    }
    counter++;
  } while (isSimpleNumber && counter < number);

  if (isSimpleNumber) {
    B.push(number);
  }
}

let minNumber;
let maxNumber;

for (let i = 0; i < B.length; i++) {
  if (B[i] > maxNumber || !maxNumber) {
    maxNumber = B[i];
  }
  if (B[i] < minNumber || !minNumber) {
    minNumber = B[i];
  }
}

console.log("Array B =", B, ", Min Number =", minNumber, ", Max Number =", maxNumber);

// ------------------------------------------------------------------------------------
//2. Перевернуть массив, т.е. если был массив 1, 5, 6, 2, 4 -- то мы должны получить 4, 2, 6, 5, 1. Нельзя использовать стандартный метод reverse(). Постарайтесь не использовать дополнительный массив. Оригинальный массив А сохранять не нужно (т.е. он должен перевернуться).

let arr = new Array(15);
const arrLength = arr.length;

for (let i = 0; i < arrLength; i++) {
  arr[i] = Math.floor(Math.random() * 101);
}

console.log('Initial = ', arr);

for (let i = 0; i < Math.floor(arrLength / 2); i++) {
    let tempElement = arr[i];
    let tempElementLast = arr[arrLength - (i + 1)];

    arr[arrLength - (i + 1)] = tempElement;
    arr[i] = tempElementLast;
}

console.log('Reverse =', arr);

// ------------------------------------------------------------------------------------
// 3. Создать массивы А и В. Заполнить случайными числами. Найди все элементы которые повторяются в массивах А и B.

let A = new Array(20);
let B = new Array(20);

for (let i = 0; i < A.length; i++) {
  A[i] = Math.floor(Math.random() * 101);
}
console.log(A);

for (let i = 0; i < B.length; i++) {
  B[i] = Math.floor(Math.random() * 101);
}
console.log(B);

for (let i = 0; i < A.length; i++) {
    for (let j = 0; j < B.length; j++) {
        if (B[j]==A[i]) {
            console.log(A[i]);
        }
    }
}

// ------------------------------------------------------------------------------------
// 4. В одномерном массиве произвести такую замену: 1 элемент поменять с 2, 3 элемент поменять с 4, 5 элемент поменять с 6 и тд. Если длинна массива непарная - последний элемент не трогать.
// Например: было 1 2 3 4 5 6, должно стать: 2 1 4 3 6 5

let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
console.log(arr);

for (i = 0; i < Math.floor(arr.length / 2); i++) {
    let index = i;
    if (i >= 1) {
        index = i * 2;
    }
    let tempElem = arr[index];
    let tempElement1 = arr[index + 1];

    arr[index + 1] = tempElem;
    arr[index] = tempElement1;
}

console.log(arr);