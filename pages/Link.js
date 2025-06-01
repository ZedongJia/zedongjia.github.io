import { onMounted, ref } from 'vue';
import Card from './components/Card.js';
const template = `
<div id="link">
    <div class="profile flex-center" v-for="link in links">
        <div class="avatar flex-center">
            <img :src="link.avatar">
        </div>
        <div class="intro flex-col-between">
            <span>{{link.nickname}}</span>
            <a :href="link.home_page" target="_blank">goto</a>
        </div>
    </div>
</div>
`;

function setup() {
    const links = ref([]);
    onMounted(() => {
        fetch('../data/links.json').then((response) => {
            response.json().then((data) => {
                links.value = data;
            });
        });
    });
    return {
        links
    };
}

export default {
    template: template,
    setup,
    components: {
        Card
    }
};
