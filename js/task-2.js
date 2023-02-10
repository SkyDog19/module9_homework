'use strict';
/*jshint -W097*/

//json, который мы будем парсить 
const jsonString = `
{
    "list": [
     {
      "name": "Petr",
      "age": "20",
      "prof": "mechanic"
     },
     {
      "name": "Vova",
      "age": "60",
      "prof": "pilot"
     }
    ]
   }
`;

//Превращаем объект json в js
const object = JSON.parse(jsonString);
//После превращения в объект js обращаемся к объекту list, чтоб брать из него данные
const user = object.list;

const result = {
    list: [{
            name: user[0].name,
            age: user[0].age,
            prof: user[0].prof
        },
        {
            name: user[1].name,
            age: user[1].age,
            prof: user[1].prof
        },
    ]
};

console.log(result);