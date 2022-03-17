// Написать функцию getMaxs(args), где args - любое количество массивов.
// Функция должна вернуть максимальные чисельные значения всех переданных массивов в виде строки, через разделитель `,`

function createArray(arrayLength) {
  const someArr = new Array(arrayLength);
  for (let i = 0; i < arrayLength; i++) {
    someArr[i] = Math.floor(Math.random() * 101);
  }
  return someArr;
}

const arrOne = createArray(4);
const arrTwo = createArray(2);
const arrThree = createArray(5);

console.log(arrOne, arrTwo, arrThree);

function getMaxs(_) {
  const arrMax = [];

  for (let i = 0; i < arguments.length; i++) {
    let maxNumber = Math.max(...arguments[i]);
    arrMax.push(maxNumber);
  }
  let maxNumberArray = arrMax.join(",");
  return maxNumberArray;
}

console.log(getMaxs(arrOne, arrTwo, arrThree));
