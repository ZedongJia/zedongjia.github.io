import { LabIcon } from './icons.js';
const template = `
<div class="lab">
    <ul class="lab-list">
        <li class="item">
            <span class="icon"><LabIcon/></span>
            <div class="content">
                <a href="https://nkcs.iops.ai/" target="_blank" class="lab-name">
                    AIOPS@NKU
                </a>
            </div>
        </li>

        <li class="item">
            <span class="icon"><LabIcon/></span>
            <div class="content">
                <a href="https://thuname.github.io/lab-website/" target="_blank" class="lab-name">
                    THUNAME
                </a>
                <span class="badge">current</span>
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
        LabIcon
    }
};
