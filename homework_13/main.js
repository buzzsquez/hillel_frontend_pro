// 1. Написать скрипт который в title страницы (document.title) будет выводить текущее время и количество секунд которое прошло после открытия страниџы.

// Сгенерировать при помощи JS элемент div с двумя span, где выводится тоже самое время, что и в title в разные span соответственно

window.onload = function () {
    const startTime = new Date().toLocaleTimeString();
    document.title = `${startTime}, прошло: 0 сек.`
    let div = document.createElement('div');
    div.innerHTML = `<span>${startTime}</span><span> Прошло: 0 сек.</span>`
    document.body.appendChild(div);

    setInterval(() => {
        let now = new Date().toLocaleTimeString();
        let showSec = Math.round(performance.now() / 1000);
        document.title = `${now}, прошло: ${showSec} сек.`;
        div.innerHTML = `<span>${now}</span><span> Прошло: ${showSec} сек.</span>`
    }, 1000);
};