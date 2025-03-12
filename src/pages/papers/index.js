import { createBlock, createAnchor } from '../../components/index.js';
import { loadJson } from '../../utils/load.js';

/**
 * @param {number} index
 * @param {{name:string, paper_link:string, code_link:string}} paper
 * @returns
 */
function createPaperInfo(index, paper) {
    const info = document.createElement('span');
    info.innerHTML = `<i style="font-size:1.5em; font-weight:bold;">${index + 1}.</i> ${paper['name']}`;
    info.append(
        ...[
            document.createTextNode(', '),
            createAnchor({ href: paper['paper_link'] }, 'Paper', null, '_blank'),
            document.createTextNode(', '),
            createAnchor({ href: paper['code_link'] }, 'Code', null, '_blank')
        ]
    );
    return info;
}

/**
 * @param {Array<string>} tagNames
 * @returns
 */
function createPaperTags(tagNames) {
    const tags = document.createElement('span');
    tags.classList.add('tag-list');
    tags.append(
        ...tagNames.map((tagName) => {
            const tag = document.createElement('span');
            tag.classList.add('tag');
            tag.innerHTML = tagName;
            return tag;
        })
    );
    return tags;
}

/**
 * @param {number} index
 * @param {{name:string, paper_link:string, code_link:string, tag_list:Array<string>}} paper
 * @returns
 */
function createPaper(index, paper) {
    const el = document.createElement('li');
    el.classList.add('list-container');
    el.classList.add('shadow');
    el.append(createPaperInfo(index, paper), createPaperTags(paper['tag_list']));
    return el;
}

function createPapers() {
    const el = document.createElement('ul');
    el.id = 'paper-list';
    el.innerHTML = 'Loading...';
    loadJson('../../../data/papers.json')
        .then((papers) => {
            el.innerHTML = '';
            papers.forEach((paper, index) => {
                el.appendChild(createPaper(index, paper));
            });
        })
        .catch((error) => {
            el.innerHTML = `${error}`;
        });
    return createBlock('papers', [el]);
}

export default createPapers;
