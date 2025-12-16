import { ref, onMounted } from 'vue';
const template = `
<div class="part info">
    <h2>Hi~👋</h2>
    <div class="desc" v-for="info in infos">
        <div class="title">{{info.intro}}</div>
        <ul class="enum">
            <li v-for="item in info.items" v-html="form_text(item)"></li>
        </ul>
    </div>
</div>
`;

function setup() {
    const infos = ref([]);
    onMounted(() => {
        fetch('../data/infos.json')
            .then((response) => {
                response
                    .json()
                    .then((data) => {
                        infos.value = data;
                    })
                    .catch((e) => {
                        console.log('Fail to parse data: ', e);
                        infos.value = [];
                    });
            })
            .catch((e) => {
                console.log('Fail to load data: ', e);
                infos.value = [];
            });
    });
    function form_text(contents) {
        let text = '';
        for (let index = 0; index < contents.length; index++) {
            let content = contents[index];
            if (typeof content == 'object') {
                text += `<a href="${content.href}" target="_blank">${content.text}</a>`;
            } else {
                text += content;
            }
        }
        return text;
    }
    return {
        infos,
        form_text
    };
}

export default {
    template: template,
    setup
};
