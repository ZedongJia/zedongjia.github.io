const template = `
<div id="layout">
    <div id="main">
        <slot name="main"></slot>
        </div>
    <div id="aside">
        <slot name="aside"></slot>
    </div>
</div>
`

export default {
    setup() {
        return {}
    },
    template: template
}
