let s = prompt("Введите площадь цилиндра");
let h = prompt("Введите высоту цилиндра");
const v = s * h;

document.write("**************");
document.write("<p>"+"Обьем цилиндра с площадью основы " + s,", и высотой " + h, " равен: ");
document.write("<p>"+"--------------------");
document.write("<p>"+"V = "+ v);
document.write("<p>"+"-------------------");
document.write("<p>"+"end.");

//-----------------------------------------------------------------------------------------------

let a = Number(prompt("Введите значение для a"));
let b = Number(prompt("Введите значение для b"));
let c = Number(prompt("Введите значение для c"));

const sum = a + b + c;

alert(sum);

alert(a % 2 == 0);
alert(b % 2 == 0);
alert(c % 2 == 0);