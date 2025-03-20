import mount from './src/index.js';

window.addEventListener('load', () => {
    console.log('Hello World!');
    mount(document.querySelector('body'));
})