const template = `
<ul class="paper-list">
    <li class="paper" v-for="paper, index in papers">
        <span class="paper-index">{{index + 1}}. </span>
        <span v-html="paper.name"></span>
        (
        <a target="_blank" :href="paper.paper_link">PAPER</a>
        ,
        <a target="_blank" :href="paper.code_link">CODE</a>
        )
        <div class="tag-list flex-left">
            <span class="tag" v-for="tag in paper.tag_list">{{tag}}</span>
        </div>
    </li>
</ul>
`;
// <a v-if="typeof(content) === 'object'" :href="content.href" v-html="content.text"></a>

export default {
    template: template,
    props: ['papers']
};
