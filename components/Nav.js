import { onMounted } from 'vue';
import HomeIcon from './icons/HomeIcon.js';
import ApertureIcon from './icons/ApertureIcon.js';
import LinkIcon from './icons/LinkIcon.js';

const template = `
<div id="nav" class="flex-between">
    <span id="logo">Zedong Jia</span>
    <span class="flex-center">
        <a :class="{'flex-center': true, 'is_active': page_on.name === page.name}" v-for="page in pages" @click="$emit('set_page_on',page)">
            <component :is="page.icon"/>
            {{page.name}}
        </a>
    </span>
</div>
`;

function setup() {
    function typingAnimation(el) {
        const str = 'Zedong Jia';
        let subLength = 0;
        let sleep_itv = 1000;

        function inc() {
            subLength++;
            el.innerText = str.substring(0, subLength) + '_';
            if (subLength > str.length) setTimeout(dec, sleep_itv);
            else setTimeout(inc, Math.random() * 450 + 50);
        }
        function dec() {
            subLength--;
            el.innerText = str.substring(0, subLength) + '_';
            if (subLength < 1) setTimeout(inc, sleep_itv);
            else setTimeout(dec, 50);
        }
        inc();
    }
    onMounted(() => {
        typingAnimation(document.querySelector('#logo'));
    });
}

export default {
    template: template,
    props: ['pages', 'page_on'],
    setup,
    components: {
        HomeIcon,
        ApertureIcon,
        LinkIcon
    }
};
