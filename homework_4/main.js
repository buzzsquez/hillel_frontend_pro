// В двумерном массиве удалить столбцы где сумма элементов столбца < 0.
// Массив должен быть размером 10 на 10, заполненым случайными числам в диапазоне от -20 до +20

const m = 10;
let arr = new Array(m);

for (let row = 0; row < arr.length; row++) {
  arr[row] = new Array(m);
  for (let col = 0; col < arr[row].length; col++) {
    arr[row][col] = Math.floor(Math.random() * 41) - 20;
    document.write(arr[row][col] + "&nbsp;&nbsp;");
  }
  document.write("</br>");
}

let arrB = [];
for (let col = 0; col < arr.length; col++) {
  let colSum = 0;
  for (let row = 0; row < arr[col].length; row++) {
    colSum = colSum + arr[row][col];
  }
  arrB.push(colSum);
}
document.write("</br>", "Array of column sum = ", arrB);

for (i = arrB.length - 1; i >= 0; i--) {
  if (arrB[i] < 0) {
    for (let row = 0; row < m; row++) {
      arr[row].splice(i, 1);
    }
    document.write("</br>");
  }
}
console.log(arr);

for (let row = 0; row < arr.length; row++) {
  for (let col = 0; col < arr[row].length; col++) {
    document.write(arr[row][col] + "&nbsp;&nbsp;&nbsp;");
  }
  document.write("</br>");
}