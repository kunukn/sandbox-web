import React from 'react';
import {render} from 'react-dom';
import './index.css';
import Box from './Box';

let byId = id => document.getElementById(id);
let createDiv = () => document.createElement('div');

const count = 4;

let app = createDiv();
app.className = 'app';

for (let i = 0; i < count; i++) {
    let box = createDiv();
    
    box.setAttribute('id', `box${i}`)
    app.appendChild(box);   
}

document.body.appendChild(app);

for (let i = 0; i < count; i++) {
    render(<Box index={i}/>, byId(`box${i}`));
}

