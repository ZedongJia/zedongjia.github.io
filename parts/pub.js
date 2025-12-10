import { ref } from 'vue';
const template = `
<div class="part pub">
    <h2>@ Publications</h2>
    <ul v-if="papers.length!=0">
        <li v-for="(paper, index) in papers" class="paper">
            <div class="title">{{index+1}}. {{paper.title}}</div>
            <div v-html="paper.author" class="author"></div>
            <div v-html="paper.where" class="where"></div>
            <div class="row">
                <span class="label">{{paper.year}}</span>
                <span :class="{'label': true, 'ccf-a':paper.ccf=='A', 'ccf-b':paper.ccf=='B'}">CCF-{{paper.ccf}}</span>
                <span v-for="field in paper.fields" class="label">{{field}}</span>
            </div>
            <div class="action">
                <a target="_blank" :href="paper.paper" class="btn">paper</a>
                <a target="_blank" :href="paper.code" class="btn">code</a>
            </div>
        </li>
    </ul>
    <div class="empty" v-else>EMPTY</div>
</div>
`;

function setup() {
    const papers = ref([]);
    [].length;
    fetch('../data/pubs.json')
        .then((response) => {
            response
                .json()
                .then((data) => {
                    papers.value = data.sort((a, b) => b.year - a.year);
                })
                .catch((e) => {
                    console.log('Fail to parse data: ', e);
                    papers.value = [];
                });
        })
        .catch((e) => {
            console.log('Fail to load data: ', e);
            papers.value = [];
        });
    return {
        papers
    };
}

export default {
    template: template,
    setup
};
