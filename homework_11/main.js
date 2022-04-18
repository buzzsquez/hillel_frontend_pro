//  1. Есть 3 input. Выводить в textarea содержимое всех полей ввода через запятую. Использовать setInterval. (При вводе данных в input - они отображаются в textarea)

window.onload = function () {
    let input = document.querySelectorAll('input');
    let textarea = document.querySelector('textarea');

    setInterval(() => {
        let some = [];
        for (let i = 0; i < input.length; i++) {
            if (input[i].value != '')
                some.push(input[i].value)
        }
        textarea.value = some.join(', ');
    }, 3000)
}

//----------------------------------------------------------
// 2. Написать скрипт, который можно выполнить на любой странице в консоли. Скрипт делает следующие действие - убирает значения color, background-color, width, height у всех тэгов на странице, исключая html, head, body. Прочтение ссылок в домашней работе обязательны.


window.onload = function () {
    let style = document.createElement("style");
    style.innerHTML = "body.remove-class * { color: initial !important; background-color: initial !important; width: initial !important; height: initial !important; }";
    document.head.appendChild(style);

    const body = document.querySelector('body');
    body.classList.add('remove-class');
}

// Alternative solution

window.onload = function () {
    let allTags = document.querySelectorAll('*');
    for (i = 0; i < allTags.length; i++) {
        if (allTags[i].tagName !== 'HTML' && allTags[i].tagName !== 'HEAD' && allTags[i].tagName !== 'BODY') {
            allTags[i].style.color = 'initial';
            allTags[i].style.backgroundColor = 'initial';
            allTags[i].style.width = 'initial';
            allTags[i].style.height = 'initial';
        }
    }
}