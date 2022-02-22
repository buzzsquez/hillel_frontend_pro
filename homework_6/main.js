// Реализовать функцию copy(list) по копированию массива.
// Предусмотреть возможность передачи вторым аргументом функции. При копировании массива - функция применится к каждому элементу копируемого массива.
// newL = copy(list, function(value){ return value*10; })

function createArray(arrayLength) {
  const arr = new Array(arrayLength);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = Math.floor(Math.random() * 100);
  }
  return arr;
}

const list = createArray(10);

function copy(list, someFunc) {
  if (typeof someFunc === "function") {
    return list.map(someFunc);
  } else {
    return list.slice();
  }
}

let newArray = copy(list, function (value) {
  return value * 10;
});

let newArray2 = copy(list);

console.log(list);
console.log(newArray);
console.log(newArray2);
