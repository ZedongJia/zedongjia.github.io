import { ref } from 'vue';
import Nav from './components/Nav.js';
import Layout from './components/Layout.js';

import Home from './pages/Home.js';
import Archive from './pages/Archive.js';
import Link from './pages/Link.js';

const template = `
<Nav :pages="pages" :page_on="page_on" @set_page_on="set_page_on"/>
<Layout>
    <component :is="page_on.name"/>
</Layout>
`;

function setup() {
    const pages = [
        { name: 'Home', icon: 'HomeIcon' },
        { name: 'Archive', icon: 'ApertureIcon' },
        { name: 'Link', icon: 'LinkIcon' }
    ];
    const page_on = ref(pages[0]);
    const set_page_on = (page_to) => {
        page_on.value = page_to;
    };
    return {
        page_on,
        set_page_on,
        pages
    };
}

export default {
    template: template,
    setup,
    components: {
        Layout,
        Nav,
        Home,
        Archive,
        Link
    }
};
