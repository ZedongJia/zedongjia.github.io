import { createNav, createFooter, createBg } from './components/index.js';
import { createAbout, createPapers, createLinks } from './pages/index.js';
/**
 * @param {HTMLElement} el
 */
function mount(el) {
    el.append(createNav(), createAbout(), createPapers(), createLinks(), createBg(), createFooter());
}

export default mount;
