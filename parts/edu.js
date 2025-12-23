const template = `
<div class="edu">
    <div class="timeline-item">
        <div class="time">2021.09 ~ 2025.08</div>
        <div class="card">
            <div class="logo">
                <img src="https://www.nankai.edu.cn/_upload/article/images/77/1f/a7852bfa49c3bdea0f4564630e66/c658ec37-5315-4c7c-b5d5-aee3e3e570d3.jpg" alt="学校校徽">
            </div>
            <div class="content">
                <h3>NanKai University</h3>
                Software Engineering <b>(SE)</b>
                <br/>
                <a href="https://cs.nankai.edu.cn/" target="_blank">Website</a>
            </div>
        </div>
    </div>
    <div class="timeline-item">
        <div class="time">2025.09 ~ 2028.08</div>
        <div class="card">
            <div class="logo">
                <img class="logo" src="https://vi.tsinghua.edu.cn/image/img104_1.png" alt="学校校徽">
            </div>
            <div class="content">
                <h3>Tsinghua University</h3>
                Institute for Network Sciences and Cyberspace <b>(INSC)</b>
                <br/>
                <a href="https://www.insc.tsinghua.edu.cn/" target="_blank">Website</a>
            </div>
        </div>
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
