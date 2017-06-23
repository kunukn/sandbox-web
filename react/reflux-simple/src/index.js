import React from 'react'
import {render} from 'react-dom'
import './index.css'
import Box from './Box'

const count = 4

const createDiv = ({id, className}) => {
    let div = document.createElement('div')
    if (id) div.setAttribute('id', id)
    if (className) div.className = className
    
    return div
}

const app = createDiv({className: 'app'})


for (let i = 0; i < count; i++) 
    app.appendChild( createDiv({id: `box${i}`}) )


document.body.appendChild(app)


for (let i = 0; i < count; i++)
    render(<Box index={i}/>, document.getElementById(`box${i}`))
