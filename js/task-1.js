'use strict';
/*jshint -W097*/

//Объект, позволяющий порсить XML 
const parser = new DOMParser();

//XML, который мы будем парсить
const xmlString = `
    <list>
      <student>
        <name lang="en">
          <first>Ivan</first>
          <second>Ivanov</second>
        </name>
        <age>35</age>
        <prof>teacher</prof>
      </student>
      <student>
        <name lang="ru">
          <first>Петр</first>
          <second>Петров</second>
        </name>
        <age>58</age>
        <prof>driver</prof>
      </student>
    </list>
`;

//Парсинг XML(првевращаем строку в DOM xml, из которого можно будет извлекать значения для работы с js) 
const xmlDOM = parser.parseFromString(xmlString, "text/xml");

//Получение всех DOM-нод
const userNode = xmlDOM.querySelectorAll('first');
const ageNode = xmlDOM.querySelectorAll('second');
const profNode = xmlDOM.querySelectorAll('prof');
const langNode = xmlDOM.querySelectorAll('name');

const result = {
    list: [{
            name: userNode[0].textContent,
            age: ageNode[0].textContent,
            prof: profNode[0].textContent,
            lang: langNode[0].getAttribute('lang')
        },
        {
            name: userNode[1].textContent,
            age: ageNode[1].textContent,
            prof: profNode[1].textContent,
            lang: langNode[1].getAttribute('lang')
        },
    ]
};

console.log(result);