import { createNav, createFooter, createBg } from './components/index.js';
import { createAbout, createPapers, createProjects, createLinks } from './pages/index.js';
/**
 * @param {HTMLElement} el
 */
function mount(el) {
    el.append(createNav(), createAbout(), createPapers(), createProjects(), createLinks(), createBg(), createFooter());
}

export default mount;
