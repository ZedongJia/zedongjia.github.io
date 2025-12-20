import Bio from './parts/bio.js';
import Info from './parts/info.js';
import Pub from './parts/pub.js';

const template = `
<div id="wrapper">
    <div id="headline">ZeDong Jia</div>
    <Bio/>
    <div class="sec">Hi~👋</div>
    <Info/>
    <div class="sec">Publications</div>
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
        Bio,
        Info,
        Pub
    }
};
