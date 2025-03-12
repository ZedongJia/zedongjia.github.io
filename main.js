import mount from './src/index.js';

window.onload = () => {
    console.log('Hello World!');
    mount(document.querySelector('body'));
};
