// В объекте data существует метод addRecord, который аргументами получает любой набор объектов. Метод addRecord добавляет все свойства переданных объектов в data.

data = {
  addRecord: function (...args) {
    for (let index = 0; index < args.length; index++) {
      const element = args[index];
      for (let key in element) {
        this[key] = element[key];
      }
    }
  },
  p: 600,
  str: "hello",
  y: -50,
};

data.addRecord({ x: 10 }, { y: 20 }, { z: 30, x: 50 });
data.x; // 50
data.y; // 20
data.z; // 30
data.p; // 600
data.str; // 'hello'

console.log(data);

