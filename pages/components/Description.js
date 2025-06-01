import CaretForwardIcon from './icons/CaretForwardIcon.js';

const template = `
<ul class="description">
    <li class="content" v-for="contents in infos">
        <CaretForwardIcon/>
        <span v-html="form_text(contents)"></span>
    </li>
</ul>
`;

function setup() {
    function form_text(contents) {
        let text = '';
        for (let index = 0; index < contents.length; index++) {
            let content = contents[index];
            if (typeof content == 'object') {
                text += `<a href="${content.href}" target="_blank">${content.text}</a>`;
            } else {
                text += content
            }
        }
        return text
    }
    return {
        form_text
    };
}

export default {
    template: template,
    props: ['infos'],
    setup,
    components: {
        CaretForwardIcon
    }
};
