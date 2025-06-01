import { onMounted, ref } from 'vue';
import Card from './components/Card.js';
import Description from './components/Description.js';
import SchoolIcon from './components/icons/SchoolIcon.js';
import ResearchIcon from './components/icons/ResearchIcon.js';
import SkillIcon from './components/icons/SkillIcon.js';
import MailIcon from './components/icons/MailIcon.js';
import OrganizationIcon from './components/icons/OrganizationIcon.js';
const template = `
<div id="home">
    <Card v-for="about in abouts">
        <template #title>
            <component :is="about.icon"/>
            {{about.name}}
        </template>
        <template #content>
            <ul>
                <Description :infos="about.infos"/>
            </ul>
        </template>
    </Card>
</div>
`;

function setup() {
    const abouts = ref([]);
    onMounted(() => {
        fetch('../data/about.json').then((response) => {
            response.json().then((data) => {
                abouts.value = data;
            });
        });
    });
    return {
        abouts
    };
}

export default {
    template: template,
    setup,
    components: {
        Card,
        Description,
        SchoolIcon,
        ResearchIcon,
        SkillIcon,
        MailIcon,
        OrganizationIcon
    }
};
