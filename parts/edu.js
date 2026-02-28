const template = `
<div class="edu shared-cards">
    <div class="shared-card-item">
        <span class="edu-school">
            <a href="https://www.nankai.edu.cn/" target="_blank">
                NanKai University
            </a>
        </span>
        <span class="edu-degree">B.S. · SE</span>
        <span class="edu-time">2021.09 ~ 2025.08</span>
    </div>
    <div class="shared-card-item">
        <span class="edu-school">
            <a href="https://www.tsinghua.edu.cn/" target="_blank">
                Tsinghua University
            </a>
        </span>
        <span class="edu-degree">M.S. Candidate · INSC</span>
        <span class="edu-time">2025.09 ~ 2028.08</span>
    </div>
</div>
`;

function setup() {
    return {};
}

export default {
    template: template,
    setup
};
