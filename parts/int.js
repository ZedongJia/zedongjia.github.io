import { RocketIcon } from './icons.js';
const template = `
<div class="interest">
    <ul class="lab-list">
        <li class="item">
            <span class="icon"><RocketIcon/></span>
            <div class="content">
                Microservice System Fault Diagnosis
            </div>
        </li>

        <li class="item">
            <span class="icon"><RocketIcon/></span>
            <div class="content">
                Network Measurement and Security
            </div>
        </li>
    </ul>
</div>
`;

function setup() {
    return {};
}

export default {
    template: template,
    setup,
    components: {
        RocketIcon
    }
};
