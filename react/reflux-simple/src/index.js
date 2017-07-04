import React from 'react';
import {render} from 'react-dom';
import './index.css';
import Box from './Box';

const count = 4;
const add = 'appendChild';

const app = createDiv({className: 'app'});
for (let i = 1; i <= count; i++) 
    app[add]( createDiv({id: `js-react-box${i}`}) );

document.body[add](app);

render(<Box index={1}/>, byId(`js-react-box${1}`));
render(<Box index={2}/>, byId(`js-react-box${2}`));
render(<Box index={3}/>, byId(`js-react-box${3}`));
render(<Box index={4} localx/>, byId(`js-react-box${4}`));




















function byId(id){
    return document.getElementById(id);
}
function createDiv({id, className}) {
    let div = document.createElement('div')
    if (id) div.setAttribute('id', id)
    if (className) div.className = className
    
    return div
}