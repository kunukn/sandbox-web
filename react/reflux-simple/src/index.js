import React from 'react';
import {render} from 'react-dom';
import './index.css';
import Box from './Box';

const count = 4;

const createDiv = () => document.createElement('div');

const app = createDiv();
app.className = 'app';

for (let i = 0; i < count; i++) {    
    let box = createDiv();
    box.setAttribute('id', `box${i}`)
    app.appendChild(box);   
}

document.body.appendChild(app);

for (let i = 0; i < count; i++) {
    render(<Box index={i}/>, document.getElementById(`box${i}`));
}
