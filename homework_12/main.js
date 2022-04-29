// 1. Создать вертикальное или горизонтальное (в зависимости от свойства type) меню, в котором будут элементы из свойства items.

// Inner items - выпадающее меню при наведении мышки.
// [OPTIONAL] handler - хранит название функции, которая выполнится при нажатии на пункт меню.

const data = {
    name: 'menu',
    type: 'column',
    items: [
        {
            title: 'title 1',
            handler: 'ActionAdd'
        },
        {
            title: 'title 2',
            handler: 'ActionSaveAs',
            items: [
                { title: 'inner 1' }, { title: 'inner 2' }
            ]
        },
        {
            title: 'title 3',
            handler: 'ActionExit'
        }
    ]
}

const style = `
.menu-container {
    margin: 0 auto;
    padding: 0 20px;
}

.menu-column {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding:0;
    margin:0;
    position: relative;
}

.menu-row {
    display: flex;
    flex-direction: row;
    padding:0;
    margin:0;
    position: relative;
}

.li-item {
    font-family: monospace; 
    font-weight: bold;
    font-size: 20px;
    color: brown;
    margin-right: 10px;
    list-style: none;
}

.submenu {
    display: none;
    padding-left: 0;
}

.submenu > li {
    margin-right: 0px;
}

.li-item:hover {
    cursor: pointer;
    color: black;
}

.li-item:hover .submenu {
    cursor: pointer;
    display: block;
}
`;

function renderer(params) {
    const { type, items } = params;

    const body = document.querySelector('body');

    const styleMenu = document.createElement('style');
    body.appendChild(styleMenu);
    styleMenu.innerHTML = style;

    const nav = document.createElement('nav');
    nav.classList.add('menu-container');
    body.appendChild(nav);

    nav.addEventListener('click', (event => {
        const clickHandler = event.target.getAttribute('data-click');
        if (clickHandler === 'ActionAdd') {
            console.log('Added');
        }
        if (clickHandler === 'ActionSaveAs') {
            console.log('Saved');
        }
        if (clickHandler === 'ActionExit') {
            console.log('Quitted');
        }
    }));

    const ulLevelOne = document.createElement('ul');
    if (type == 'column') {
        ulLevelOne.classList.add('menu-column');
    }
    if (type == 'row') {
        ulLevelOne.classList.add('menu-row');
    }
    nav.appendChild(ulLevelOne);

    items.forEach((elem) => {
        const liItem = createLiElem(elem.title);

        if (elem.handler) {
            liItem.dataset.click = elem.handler;
        }

        ulLevelOne.appendChild(liItem);

        if (elem.items && elem.items.length) {
            const ulLevelTwo = document.createElement('ul');
            ulLevelTwo.classList.add('submenu');
            elem.items.forEach((innerElem) => {
                const liSubElem = createLiElem(innerElem.title);
                ulLevelTwo.appendChild(liSubElem);
            });
            liItem.appendChild(ulLevelTwo);
        };
    });
};

function createLiElem(content) {
    const li = document.createElement('li');
    li.classList.add('li-item');
    li.innerHTML = content;
    return li;
}

renderer(data);