'use strict';

const body = document.querySelector('body')

const input = document.createElement('input');
input.type = 'text';
body.append(input);
const paragraph = document.createElement('p');
body.append(paragraph);

const timer = setInterval(()=> {
    paragraph.textContent = input.value;
},300);

