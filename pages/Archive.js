import { ref, onMounted } from 'vue';
import Card from './components/Card.js';
import PaperList from './components/PaperList.js';
import ProjectList from './components/ProjectList.js';
import ProjectIcon from './components/icons/ProjectIcon.js';
import PublicationIcon from './components/icons/PublicationIcon.js';
const template = `
<div id="archive">
    <Card>
        <template #title>
            <PublicationIcon/>
            Publications
        </template>
        <template #content>
            <PaperList :papers="papers"/>
        </template>
    </Card>
    <Card>
        <template #title>
            <ProjectIcon/>
            Projects
        </template>
        <template #content>
            <ProjectList :projects="projects"/>
        </template>
    </Card>
</div>
`;

function setup() {
    const papers = ref([]);
    const projects = ref([]);
    onMounted(() => {
        fetch('../data/papers.json').then((response) => {
            response.json().then((data) => {
                papers.value = data;
            });
        });
    });
    onMounted(() => {
        fetch('../data/projects.json').then((response) => {
            response.json().then((data) => {
                projects.value = data;
            });
        });
    });
    return {
        papers,
        projects
    };
}

export default {
    template: template,
    setup,
    components: {
        Card,
        PaperList,
        ProjectList,
        ProjectIcon,
        PublicationIcon
    }
};
