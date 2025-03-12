import { goto, changeTheme, typing } from './handler.js';
import createAnchor from '../anchor/index.js';
import createProgressBar from './progressBar/index.js';

function createLogo() {
    const logo = document.createElement('span');
    logo.id = 'name';
    typing(logo);
    return logo;
}

function createSpace() {
    const space = document.createElement('span');
    space.style.flexGrow = 1;
    return space;
}

/**
 * create navigation
 * @param {string} to
 * @param {string} desc
 */
function createNavigation(to, desc) {
    return createAnchor(
        {
            'data-id': `#${to}`
        },
        desc,
        goto
    );
}

function createThemeBtn() {
    const btn = document.createElement('button');
    btn.onclick = changeTheme;
    const body = document.querySelector('body');
    if (window.matchMedia('(prefers-color-scheme: light)').matches) {
        /**
         * Light mode
         */
        body.id = 'light';
        btn.innerHTML = '&#x263d';
    } else {
        /**
         * Dark mode
         */
        body.id = 'dark';
        btn.innerHTML = '&#x2600';
    }

    return btn;
}

function createNav() {
    const nav = document.createElement('nav');
    nav.id = 'nav';
    nav.append(
        createLogo(),
        createSpace(),
        createProgressBar(),
        createNavigation('about', 'About Me ☻'),
        createNavigation('papers', 'Papers [...]'),
        createNavigation('links', 'Links ☍'),
        createThemeBtn()
    );
    return nav;
}

export default createNav;
