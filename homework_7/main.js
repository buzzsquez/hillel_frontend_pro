// Написать функцию `compress(list)`, которая сжимает серии массива, состоящего из единиц и нулей по следующему принципу:
// например, массив [0,0,0,0,1,1,1,1,1,1,1,0,0,1,1,1,1,0,1] преобразуется в [4,7,2,4,1,1]

function createArray(arrayLength) {
  const arr = new Array(arrayLength);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = Math.floor(Math.random() * 2);
  }
  return arr;
}

const arrMain = createArray(30);
console.log(arrMain);

function compress(list) {
  const arrB = [];

  let countNumber = 0;
  for (let i = 0; i < list.length; i++) {
    const currElement = list[i];
    const nextElement = list[i + 1];
    if (currElement !== nextElement || nextElement === undefined) {
      countNumber += 1;
      arrB.push(countNumber);
      countNumber = 0;
    } else {
      countNumber += 1;
    }
  }
  return arrB;
}

console.log(compress(arrMain));
