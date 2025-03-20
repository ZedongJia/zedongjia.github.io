/**
 * create anchor
 * @param {{}} attrs
 * @param {string} innerHTML
 * @param {(...)=>void} onclick
 * @param {string?} target _blank
 */
function createAnchor(attrs, innerHTML, onclick = null, target = null) {
    const anchor = document.createElement('a');
    for (let key in attrs) {
        anchor.setAttribute(key, attrs[key]);
    }
    if (onclick !== null) anchor.addEventListener('click', onclick);
    anchor.innerHTML = innerHTML;
    if (target !== null) {
        anchor.target = target;
        anchor.innerHTML = '🔗 ' + anchor.innerHTML;
    }
    return anchor;
}

export default createAnchor;
