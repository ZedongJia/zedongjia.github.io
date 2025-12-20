import { ref } from 'vue';
import { PaperIcon, ShareIcon } from './icons.js';
const template = `
<div class="pub">
    <ul class="paper-list" v-if="papers.length!=0">
        <li v-for="(paper, index) in papers" class="paper">
            <div class="title">{{index+1}}. {{paper.title}}</div>
            <div v-html="paper.author" class="author"></div>
            <div v-html="paper.where" class="where"></div>
            <div class="row">
                <span class="label">{{paper.year}}</span>
                <span :class="{'label': true, 'r-a':paper.ccf=='A', 'r-b':paper.ccf=='B', 'r-c':paper.ccf=='C'}">CCF {{paper.ccf}}</span>
                <span :class="{'label': true, 'r-a':paper.thcpl=='A', 'r-b':paper.thcpl=='B', 'r-c':paper.thcpl=='C'}">THCPL {{paper.thcpl}}</span>
                <span v-for="field in paper.fields" class="label">{{field}}</span>
            </div>
            <div class="action">
                <a target="_blank" :href="paper.paper">
                    <PaperIcon/>
                    Paper
                </a>
                <a target="_blank" :href="paper.code">
                    <ShareIcon/>
                    Code
                </a>
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
    setup,
    components: {
        PaperIcon,
        ShareIcon
    }
};
