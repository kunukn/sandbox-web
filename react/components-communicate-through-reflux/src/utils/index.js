import {createElement} from 'react';

/* eslint-disable no-console */
export const log = console.log.bind(console); 

/* eslint-disable no-console */
export const error = console.error.bind(console); 

export function byId(id) {
    return document.getElementById(id);
}

export function qs(expr, context) {
    return (context || document).querySelector(expr)
}
export function qsa(expr, context) {
    return [].slice.call((context || document).querySelectorAll(expr), 0)
}

export function toDOM(component, props, ...children){
    return createElement(component, props, children);
}

export function createAndAppendById(id){
    const child = document.createElement('div');
    child.className = 'react-component';
    byId(id).appendChild(child);    
    return child;
}

export const LOADING_STATES = {
    LOADING: 'Loading',
    LOADED: 'Loaded',
    LOADING_ERROR: 'LoadingError',
};

export const LOADING_TYPES = {
    SHORT: 'short',
    LONG: 'long',
};

export const LOADING_CONFIG = {
    LONG_LOADING_START_TIME: 2000,
};
