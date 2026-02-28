const template = `
<div class="lab shared-cards">
    <div class="shared-card-item">
        <div class="lab-name">
            <a href="https://nkcs.iops.ai/" target="_blank" class="lab-name">
                AIOPS@NKU
            </a>
        </div>
        <span class="lab-detail">
            Artificial Intelligence Operations
        </span>
    </div>

    <div class="shared-card-item">
        <div class="lab-name">
            <a href="https://thuname.github.io/lab-website/" target="_blank" class="lab-name">
                THUNAME
            </a>
            <span class="lab-stat">(current)</span>
        </div>
        <span class="lab-detail">
            Network Architecture and Measurement
        </span>
    </div>
</div>
`;

function setup() {
    return {};
}

export default {
    template: template,
    setup,
};
