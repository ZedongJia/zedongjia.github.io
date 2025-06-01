const template = `
<div class="card flex-col-center">
    <span class="title">
        <slot name="title"></slot>
    </span>
    <span class="content">
        <slot name="content"></slot>
    </span>
    <span class="action flex-right">
        <slot name="action"></slot>
    </span>
</div>
`;

export default {
    template: template
};
