// Написать функцию, которая примет как аргументы(параметры) два массива и сравнит суммы всех ЧИСЛОВЫХ элементов.
// Тот массив, сумма которого большая - должен вернутся функцией.

function createArray(arrayLength) {
  const someArr = new Array(arrayLength);
  for (let i = 0; i < arrayLength; i++) {
    
    if (i % 2 == 0) {
      someArr[i] = Math.floor(Math.random() * 101);
    } else {
      someArr[i] = 'Some String';
    }
  }
  return someArr;
}

function calculateSum(arr) {
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    if (!isNaN(arr[i])) {
      sum = sum + arr[i];
    }
  }
  return sum;
}

function compareArrSum(firstArr, secondArr) {
  const firstSum = calculateSum(firstArr);
  const secondSum = calculateSum(secondArr);

  if (firstSum > secondSum) {
    return firstArr;
  } else {
    return secondArr;
  }
}

const arrOne = createArray(10);
const arrTwo = createArray(10);

const result = compareArrSum(arrOne, arrTwo);
console.log(arrOne, arrTwo);

console.log(result);