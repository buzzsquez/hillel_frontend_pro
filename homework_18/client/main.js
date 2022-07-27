// Создать веб сервер.
// API:
// GET `/person` - возвращает данные о человеке
// GET `/person/name` - возвращает только имя человека
// GET `/person?name&age&surname` - возвращает данные полей, которые переданные в строке. Может быть name, age, surname, height, weight, degree, city, street, postCode
// GET `/person/address` - возвращает только те поля, который относятся к адресу.
// GET `/person/post/recipient` - возвращает только те поля, который необходимы для сформирования почтового отправления - имя, фамилия, город, улица, почтовый индекс

class Configurations {
    static webServer = 'http://localhost:2205';
}

class APILayer {
    static getPerson() {
        return fetch(Configurations.webServer + '/person').then(resp => resp.json())
            .catch(err => {
                console.error(err)
            });
    }
    static getPersonName() {
        return fetch(Configurations.webServer + '/person/name').then(resp => resp.json())
            .catch(err => {
                console.error(err)
            });
    }
    static getPersonData() {
        return fetch(Configurations.webServer + '/person?name&age&surname').then(resp => resp.json())
            .catch(err => {
                console.error(err)
            });
    }
    static getPersonAddress() {
        return fetch(Configurations.webServer + '/person/address').then(resp => resp.json())
            .catch(err => {
                console.error(err)
            });
    }
    static getPersonPost() {
        return fetch(Configurations.webServer + '/person/post/recipient').then(resp => resp.json())
            .catch(err => {
                console.error(err)
            });
    }
}

const btn = document.querySelector('#get-person');
const btn2 = document.querySelector('#get-name');
const btn3 = document.querySelector('#get-data');
const btn4 = document.querySelector('#get-address');
const btn5 = document.querySelector('#get-post');

btn.addEventListener('click', () => {
    APILayer.getPerson()
        .then(person => {
            document.querySelector('.person').innerHTML = JSON.stringify(person);
        }).catch(err => {
            console.error(err)
        });
});

btn2.addEventListener('click', () => {
    APILayer.getPersonName()
        .then(person => {
            document.querySelector('.name').innerHTML = JSON.stringify(person);
        })
        .catch(err => {
            console.error(err)
        });
});

btn3.addEventListener('click', () => {
    APILayer.getPersonData()
        .then(person => {
            document.querySelector('.data').innerHTML = JSON.stringify(person);
        })
        .catch(err => {
            console.error(err)
        });
});

btn4.addEventListener('click', () => {
    APILayer.getPersonAddress()
        .then(person => {
            document.querySelector('.address').innerHTML = JSON.stringify(person);
        })
        .catch(err => {
            console.error(err)
        });
});

btn5.addEventListener('click', () => {
    APILayer.getPersonPost()
        .then(person => {
            document.querySelector('.post').innerHTML = JSON.stringify(person);
        })
        .catch(err => {
            console.error(err)
        });
});