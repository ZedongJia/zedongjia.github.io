const template = `
<div id="layout">
    <div id="main">
        <slot name="main"></slot>
        </div>
    <div v-if="!disableSidebar" id="aside">
        <slot name="aside"></slot>
    </div>
</div>
`

export default {
    props: {
        disableSidebar: {
            type: Boolean,
            default: false
        }
    },
    setup(props) {
        const { disableSidebar } = props
        return {
            disableSidebar
        }
    },
    template: template
}
