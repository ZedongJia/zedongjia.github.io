import { createBlock } from '../../components/index.js';
import { gotoLink } from './handler.js';
import { loadJson } from '../../utils/load.js';

/**
 *
 * @param {{nickname:string, avatar:string, 'home-page':string}} link
 * @returns
 */
function createLink(link) {
    /**
     * Nick name
     */
    const nickname = document.createElement('span');
    nickname.classList.add('nickname');
    nickname.innerText = link['nickname'];

    /**
     * Avatar
     */
    const avatar = document.createElement('span');
    avatar.classList.add('avatar');
    const img = document.createElement('img');
    img.src = link['avatar'];
    img.alt = 'avatar';
    avatar.append(img);

    /**
     * Goto button
     */
    const btn = document.createElement('button');
    btn.onclick = () => {
        gotoLink(link['home-page']);
    };
    btn.innerText = 'Home Page';

    /**
     * Link
     */
    const el = document.createElement('li');
    el.classList.add('shadow');
    el.append(nickname, avatar, btn);
    return el;
}

function createLinks() {
    /**
     * Link list
     */
    const el = document.createElement('ul');
    el.id = 'link-list';
    el.innerHTML = 'Loading...';
    loadJson('../../../data/links.json')
        .then((links) => {
            el.innerHTML = '';
            links.forEach((link) => {
                el.appendChild(createLink(link));
            });
        })
        .catch((error) => {
            el.innerHTML = `${error}`;
        });
    return createBlock('links', [el]);
}

export default createLinks;
