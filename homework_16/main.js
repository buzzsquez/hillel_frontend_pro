// Реализовать контекстное (event = contextmenu) меню. Список хранить в памяти. // Почитать про event.preventDefault()

// Хранить в списке action - название функции которая будет выполнятся при нажатии на пункт меню из задания №1.

// Применить меню к домашке с лекции #19_2 (персонаж). Создать actions: Jump, Remove, ChangeColor

// *Меню должно всегда открыватся в окне, не создавая скрола.

const body = document.querySelector('body');

const outerBlock = document.createElement('div');
outerBlock.classList.add('outer-block');
body.appendChild(outerBlock);

const gameBox = document.createElement('div');
gameBox.classList.add('game-box');
outerBlock.appendChild(gameBox);

const step = 10;
const h = 75;
const cssAnimationDuration = 100;
const jumpDuration = 120;
let isJumping = false;
let isPushed = false;
let heightBorder = outerBlock.clientHeight - gameBox.clientHeight;
let widthBorder = outerBlock.clientWidth - gameBox.clientWidth;

let positionX = 150;
let positionY = 150;

let moving = function moving(event) {
  switch (event.keyCode) {
    case 37: // Left
      event.preventDefault();
      if (positionX >= step) {
        positionX = positionX - step;
        gameBox.style.left = `${positionX}px`;
      }
      break;
    case 38: // Up
      if (isPushed) return;
      event.preventDefault();
      if (positionY < heightBorder) {
        positionY = positionY + step;
        gameBox.style.bottom = `${positionY}px`;
      }
      break;
    case 39: // Right
      event.preventDefault();
      if (positionX < widthBorder) {
        positionX = positionX + step;
        gameBox.style.left = `${positionX}px`;
      }
      break;
    case 40: // Down
      if (isPushed) return;
      event.preventDefault();
      if (positionY >= step) {
        positionY = positionY - step;
        gameBox.style.bottom = `${positionY}px`;
      }
      break;
    case 32: // Space
      if (isPushed || isJumping) return;
      event.preventDefault();
      doJump();
      break;
    case 17: // CTRL
      event.preventDefault();
      gameBox.style.height = 60 + `px`;
      gameBox.style.width = 115 + `px`;
      isPushed = true;
      break;
    default:
      return;
  }
};

let doJump = function () {
  isJumping = true;
  gameBox.style.bottom = `${positionY + h}px`;
  setTimeout(() => {
    gameBox.style.bottom = `${positionY}px`;
    setTimeout(() => {
      isJumping = false;
    }, cssAnimationDuration);
  }, jumpDuration);
};

document.addEventListener('keydown', moving);

document.addEventListener('keyup', (event) => {
  switch (event.keyCode) {
    case 17: // CTRL
      event.preventDefault();
      gameBox.style.height = 100 + `px`;
      gameBox.style.width = 100 + `px`;
      isPushed = false;
      break;
    default:
      return;
  }
});

class MenuActions {
  constructor({ actions, handlers, menuContainer, target = document }) {
    this.handlers = handlers;
    this.menuContainer = menuContainer;
    this.target = target;
    this.action = actions;
  };

  prepareItems() {
    this.menuContainer.innerHTML = `${this.action
      .map(
        (item) => `<div class="item" data-id="${item.id}">${item.title}</div>`
      )
      .join('')}`;
  };

  enable() {
    this.menuContainer.classList.add('active');
  };

  disable() {
    this.menuContainer.classList.remove('active');
  };

  positioning(x, y) {
    this.menuContainer.style.left = `${x}px`;
    this.menuContainer.style.top = `${y}px`;
  };

  initialHandlers() {
    this.prepareItems();

    this.target.addEventListener('contextmenu', (event) => {
      event.preventDefault();
      event.stopPropagation();

      this.positioning(event.clientX + 10, event.clientY + 10);
      this.enable();
    });

    this.menuContainer.addEventListener('click', (event) => {
      const id = event.target.dataset.id;
      if (!this.handlers[id]) {
        return;
      }
      this.handlers[id](this.target);
    });

    document.addEventListener('click', (event) => {
      this.disable();
    });
  }
};

const action = [
  { title: 'JUMP', id: 'jump' },
  { title: 'CHANGE COLOR', id: 'changeColor' },
  { title: 'REMOVE', id: 'remove' },
];

function getColor() {
  return Math.floor(Math.random() * 256);
};

const menuHandlers = {
  jump: () => { doJump() },
  remove: () => {
    gameBox.remove();
    document.removeEventListener('keydown', moving);
    if (!outerBlock.children.length) {
      body.appendChild(pageMenu);
    } else {
      pageMenu.remove();
    }
  },
  changeColor: () => {
    gameBox.style.backgroundColor = `rgb(${getColor()}, ${getColor()}, ${getColor()})`;
  },
};

const actionPage = [{ title: 'SHOW BOX', id: 'showBox' }];

const pageHandlers = {
  showBox: () => {
    outerBlock.appendChild(gameBox);
    document.addEventListener('keydown', moving);

    setTimeout(() => {
      gameBox.style.backgroundColor = 'black';
      setTimeout(() => {
        gameBox.style.backgroundColor = 'red';
        setTimeout(() => {
          gameBox.style.backgroundColor = 'black';
          setTimeout(() => {
            gameBox.style.backgroundColor = 'red';
          }, 150);
        }, 150);
      }, 150);
    }, 150);
    if (outerBlock.children.length) {
      pageMenu.remove();
    }
  },
};

const pageMenu = document.createElement('div');
pageMenu.classList.add('page-menu');
pageMenu.classList.add('context-menu');

const pageActions = new MenuActions({
  actions: actionPage,
  handlers: pageHandlers,
  menuContainer: pageMenu
});
pageActions.initialHandlers();

const contextMenu = document.createElement('div');
contextMenu.classList.add('box-menu');
contextMenu.classList.add('context-menu');
body.appendChild(contextMenu);

const gameBoxActions = new MenuActions({
  actions: action,
  handlers: menuHandlers,
  menuContainer: contextMenu,
  target: gameBox
});

gameBoxActions.initialHandlers();