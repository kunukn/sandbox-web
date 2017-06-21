export const log = console.log.bind(console);

export function byId(id) {
    return document.getElementById(id);
}

export function qs(expr, context) {
    return (context || document).querySelector(expr)
}
export function qsa(expr, context) {
    return [].slice.call((context || document).querySelectorAll(expr), 0)
}