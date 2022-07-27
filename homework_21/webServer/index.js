const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser');
const fs = require('fs');
const { resolveSoa } = require('dns');

const app = express();
app.use(cors());

app.use(bodyParser.json());

const port = 3000;
const path = 'todo_tasks/list.json';

class ToDoListOptions {
    static readToDoList() {
        return new Promise((resolve, reject) => {
            fs.readFile(path, 'utf8', (err, todoList) => {
                if (err) {
                    console.error(err);
                    reject(err)
                    return;
                }

                resolve(todoList || '[]')

            });
        })
    }

    static writeTaskInToDo(content) {
        fs.writeFile(path, JSON.stringify(content, null, '\t'), err => {
            if (err) {
                console.error(err);
            }
        });
    }
}

async function loadToDoList() {
    const parsedList = JSON.parse(await ToDoListOptions.readToDoList());
    return parsedList;
}

app.get('/todo-list/', async (req, res) => {
    try {
        const todoList = await loadToDoList()
        res.send(todoList)
    } catch (err) {
        res.send('Error');
    }
});

app.post('/todo-list', async (req, res) => {
    try {
        const { title } = req.body

        const task = {
            id: String(Date.now()),
            title,
            checked: false,
            timestamp: new Date().toLocaleString()
        }

        const todoList = await loadToDoList()
        todoList.push(task)
        ToDoListOptions.writeTaskInToDo(todoList)

        res.send(true)
    } catch (err) {
        res.send('Error');
    }
});

app.put('/todo-list/:id', async (req, res) => {
    try {
        const { checked, title } = req.body;
        const { id } = req.params;

        if (!id) {
            res.status(401).send('Id is required');
            return;
        }
        const toDoList = await loadToDoList()

        const findTask = toDoList.find(({ id: currentId }) => {
            return currentId === id;
        });

        if (!findTask) {
            res.status(401).send('Error');
            return;
        }

        findTask.timestamp = new Date().toLocaleString()
        findTask.checked = !!checked;
        findTask.title = title;
        ToDoListOptions.writeTaskInToDo(toDoList);

        res.send(true);
    } catch (err) {
        res.send('Error');
    }
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});