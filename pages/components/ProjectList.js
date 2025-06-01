const template = `
<ul class="project-list">
    <li class="project" v-for="project, index in projects">
        <span class="project-index">{{index + 1}}. </span>
        <span class="title" v-html="project.name"></span>
        (
        <a target="_blank" :href="project.project_link">CODE</a>
        )
        <br>
        <span v-html="project.description"></span>
        <div class="ad">
            <img :src="project.url_left">
            <img :src="project.url_right">
        </div>
        <div class="tag-list flex-left">
            <span class="tag" v-for="tag in project.tag_list">{{tag}}</span>
        </div>
    </li>
</ul>
`;
// <a v-if="typeof(content) === 'object'" :href="content.href" v-html="content.text"></a>

export default {
    template: template,
    props: ['projects']
};
