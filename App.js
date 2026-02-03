import Bio from './parts/bio.js';
import Edu from './parts/edu.js';
import Int from './parts/int.js';
import Lab from './parts/lab.js';
import Pub from './parts/pub.js';

const template = `
<div id="wrapper">
    <div id="headline"><b>ZeDong</b> Jia</div>
    <br/>
    <Bio/>
    <div class="sec">Educations</div>
    <Edu/>
    <div class="sec">Research Interests</div>
    <Int/>
    <div class="sec">Laboratories</div>
    <Lab/>
    <div class="sec">Publications</div>
    <Pub/>
    <footer>
        &copy Copyright 2026 Zedong Jia.
    </footer>
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
        Edu,
        Int,
        Lab,
        Pub
    }
};
