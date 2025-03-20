import { createBlock, createAnchor } from '../../components/index.js';
import { loadJson } from '../../utils/load.js';

/**
 * @param {string} text
 * @returns {HTMLElement}
 */
function createAboutTitle(text) {
    const title = document.createElement('span');
    title.innerHTML = `${text}`;
    return title;
}

/**
 * @param {Array<string|object>} data
 * @returns
 */
function createAboutInfo(data) {
    const info = document.createElement('li');
    info.innerText = '✨ ';
    data.forEach((meta) => {
        if (typeof meta == 'string') {
            info.innerHTML += meta;
        } else {
            info.append(createAnchor({ href: meta['href'] }, meta['text'], null, '_blank'));
        }
    });
    return info;
}

/**
 * @param {string} title
 * @param {Array} infos
 * @returns
 */
function createAboutBlock(title, infos) {
    const subAbout = document.createElement('ul');
    subAbout.classList.add('list-container', 'shadow');
    subAbout.append(createAboutTitle(title), ...infos.map((info) => createAboutInfo(info)));
    return subAbout;
}

function createAbout() {
    const el = document.createElement('div');
    el.id = 'about-list';
    el.innerHTML = 'Loading...';
    loadJson('../../../data/about.json')
        .then((blocks) => {
            el.innerHTML = '';
            blocks.forEach((block) => {
                el.appendChild(createAboutBlock(block['name'], block['infos']));
            });
        })
        .catch((error) => {
            el.innerHTML = `${error}`;
        });
    return createBlock('about', [el]);
}

export default createAbout;
