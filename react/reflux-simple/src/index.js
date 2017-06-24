import React from 'react';
import {render} from 'react-dom';
import './index.css';
import Box from './Box';


const count = 4;


const app = createDiv({className: 'app'});
for (let i = 1; i <= count; i++) 
    app.appendChild( createDiv({id: `js-react-box${i}`}) );


document.body.appendChild(app);


render(<Box index={1}/>, document.getElementById(`js-react-box${1}`));
render(<Box index={2}/>, document.getElementById(`js-react-box${2}`));
render(<Box index={3}/>, document.getElementById(`js-react-box${3}`));
render(<Box index={4}/>, document.getElementById(`js-react-box${4}`));





















function createDiv({id, className}) {
    let div = document.createElement('div')
    if (id) div.setAttribute('id', id)
    if (className) div.className = className
    
    return div
}