import { createBlock, createAnchor } from '../../components/index.js';
import { loadJson } from '../../utils/load.js';

/**
 * @param {number} index
 * @param {{name:string, description:string, project_link:string}} project
 * @returns
 */
function createProjectInfo(index, project) {
    const info = document.createElement('span');
    info.innerHTML = `<i style="font-size:1.5em; font-weight:bold;">${index + 1}. ${project['name']}</i>`;
    info.append(
        ...[
            document.createTextNode(' ('),
            createAnchor({ href: project['project_link'] }, 'Source code', null, '_blank'),
            document.createTextNode(')'),
            document.createElement('hr'),
            document.createTextNode(project['description'])
        ]
    );
    return info;
}

function createImage(url) {
    const img = document.createElement('img');
    img.src = url;
    return img;
}

/**
 * @param {number} index
 * @param {{images:Array<string>}} project
 * @returns
 */
function createProjectAd(index, project) {
    const ad = document.createElement('span');
    ad.classList.add('ad');
    ad.append(
        createImage(project['url-left']),
        createImage(project['url-right']),
    );
    return ad;
}

/**
 * @param {Array<string>} tagNames
 * @returns
 */
function createProjectTags(tagNames) {
    const tags = document.createElement('span');
    tags.classList.add('tag-list');
    tags.append(
        ...tagNames.map((tagName) => {
            const tag = document.createElement('span');
            tag.classList.add('tag');
            tag.innerHTML = '🔥 ' + tagName;
            return tag;
        })
    );
    return tags;
}

/**
 * @param {number} index
 * @param {object} project
 * @returns
 */
function createProject(index, project) {
    const el = document.createElement('li');
    el.classList.add('list-container');
    el.classList.add('shadow');
    el.append(createProjectInfo(index, project), createProjectAd(index, project), createProjectTags(project['tag_list']));
    return el;
}

function createProjects() {
    const el = document.createElement('ul');
    el.id = 'project-list';
    el.innerHTML = 'Loading...';
    loadJson('../../../data/projects.json')
        .then((projects) => {
            el.innerHTML = '';
            projects.forEach((project, index) => {
                el.appendChild(createProject(index, project));
            });
        })
        .catch((error) => {
            el.innerHTML = `${error}`;
        });
    return createBlock('projects', [el]);
}

export default createProjects;
