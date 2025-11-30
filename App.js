import { ref } from 'vue';
import Info from './parts/info.js';
import Pub from './parts/pub.js';

const template = `
<div id="wrapper">
    <h1 id="headline">ZeDong Jia' Profile</h1>
    <Info/>
    <Pub/>
</div>
`;

function setup() {
    return {};
}

export default {
    template: template,
    setup,
    components: {
        Info,
        Pub
    }
};
