import { ref } from 'vue';
import { MailIcon, GithubIcon } from './icons.js';
const template = `
<div class="bio">
    <div class="text" v-html="bio.text">
    </div>
    <div class="contact">
        <a :href="'mailto:'+bio.email">
            <MailIcon/>
            <span>{{bio.email}}</span>
        </a>
        <a :href="'https://'+bio.github" target="_blank">
            <GithubIcon/>
            <span>{{bio.github}}</span>
        </a>
    </div>
</div>
`;

function setup() {
    const bio = ref([]);
    fetch('../data/bio.json')
        .then((response) => {
            response
                .json()
                .then((data) => {
                    bio.value = data;
                })
                .catch((e) => {
                    console.log('Fail to parse data: ', e);
                    bio.value = {};
                });
        })
        .catch((e) => {
            console.log('Fail to load data: ', e);
            bio.value = {};
        });
    return {
        bio
    };
}

export default {
    template: template,
    setup,
    components: {
        MailIcon,
        GithubIcon
    }
};
