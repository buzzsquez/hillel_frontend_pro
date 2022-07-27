const root = 'http://localhost:3000';

class ToDoList {
    list = [];
    root = null;
    currentId = null;

    addBlock = document.querySelector('.addBlock');
    addInput = document.querySelector('.addInput');
    addBtn = document.querySelector('.addBtn');
    editBlock = document.querySelector('.editBlock');
    editInput = document.querySelector('.editInput');
    editBtn = document.querySelector('.editBtn');

    template = ({ checked, title, id }) => `<li ${checked ? 'class="checked"' : ''} data-id="${id}">${title}<span class="button editButton" data-id="${id}">Edit</span></li>`

    constructor(query) {
        this.root = document.querySelector(query);
        this.root.addEventListener('click', this.onItemClick.bind(this));
        this.root.addEventListener('click', this.onEditClick.bind(this));
        this.editBtn.addEventListener('click', this.onChangeClick.bind(this));
    }

    async addTodo(title) {
        try {
            const response = await fetch(root + '/todo-list', {
                method: 'POST',
                body: JSON.stringify({ title }),
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            return response.json();
        } catch (err) {
            console.error(err)
        }
    }

    async getList() {
        try {
            const response = await fetch(root + '/todo-list');
            this.list = await response.json();

            if (!this.root) {
                return;
            }

            const stringForHtml = this.list.map(this.template).join('');
            this.root.innerHTML = stringForHtml;
        } catch (err) {
            console.error(err)
        }
    }

    async updateTask(id, title, checked) {
        try {
            const response = await fetch(root + `/todo-list/${id}`, {
                method: 'PUT',
                body: JSON.stringify({ title, checked }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            return response.json();
        } catch (err) {
            console.error(err)
        }
    }

    getTaskById(id) {
        return this.list.find(({ id: todoId }) => todoId === id);
    }

    async onItemClick(event) {
        try {
            if (event.target.tagName !== 'LI') {
                return;
            }

            const id = event.target.dataset['id'];
            const { title, checked } = this.getTaskById(id);
            await this.updateTask(id, title, checked);


            await this.updateTask(id, this.getTaskById(id).title, !this.getTaskById(id).checked);
            await this.getList();

        } catch (err) {
            console.error(err)
        }
    }

    onEditClick(event) {
        if (event.target.tagName !== 'SPAN') {
            return
        }

        this.addBlock.classList.add('hidden');
        this.editBlock.classList.remove('hidden');

        const id = event.target.dataset['id'];
        this.currentId = id;

        this.editInput.value = this.getTaskById(id).title
    }

    async onChangeClick() {
        try {
            const title = this.editInput.value;

            if (!title) {
                return;
            }
            await this.updateTask(this.currentId, title, this.getTaskById(this.currentId).checked);
            await this.getList();
            this.editInput.value = '';
            this.addBlock.classList.remove('hidden');
            this.editBlock.classList.add('hidden');
            this.currentId = '';

        } catch (err) {
            console.error(err)
        }
    }

    async init() {
        try {
            await this.getList();
        } catch (e) {
            console.error('SOMETHING WENT WRONG', e);
        }
    }
}

window.addEventListener('load', () => {
    const todoList = new ToDoList('#myUL');

    todoList.addBtn.addEventListener('click', async () => {
        try {
            const title = todoList.addInput.value;

            if (!title) {
                return;
            }

            await todoList.addTodo(title);
            await todoList.getList();

            todoList.addInput.value = '';
        }
        catch (err) {
            console.error(err)
        }
    })

    todoList.init()
});
