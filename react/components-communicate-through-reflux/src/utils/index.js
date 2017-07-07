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

export const LOADINGSTATES = {
    LOADING: 'Loading',
    LONGLOADING: 'LongLoading',
    LOADED: 'Loaded',
    LOADINGERROR: 'LoadingError',
};

export const LOADING_CONFIG = {
    LONGLOADING_START_TIME: 2000,
};

export function loadingTrackerLoading() {
    this.setState({loadingState: LOADINGSTATES.LOADING});
    this.loadingTrackerCancelTimeout = setTimeout(() => {
        this.setState({loadingState: LOADINGSTATES.LONGLOADING});
    }, LOADING_CONFIG.LONGLOADING_START_TIME);
}

export function loadingTrackerLoaded() {
    if (this.loadingTrackerCancelTimeout) {
        window.clearTimeout(this.loadingTrackerCancelTimeout);
    }
    this.setState({loadingState: LOADINGSTATES.LOADED});
}

export function loadingTrackerError() {
    if (this.loadingTrackerCancelTimeout) {
        window.clearTimeout(this.loadingTrackerCancelTimeout);
    }
    this.setState({loadingState: LOADINGSTATES.LOADINGERROR});
}
