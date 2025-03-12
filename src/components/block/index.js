/**
 * title
 * @param {string} text
 */
function createTitle(text) {
    const title = document.createElement('span');
    title.classList.add('title');
    title.innerHTML = text;
    return title;
}

/**
 * title
 * @param {string} title
 * @param {Array<HTMLElement>} children
 */
function createBlock(title, children) {
    const block = document.createElement('div');
    block.id = title;
    block.classList.add('block');
    block.classList.add('shadow');
    block.append(createTitle(title), ...children);
    return block;
}

export default createBlock;
