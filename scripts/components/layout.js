import { ref } from '../../plugins/vue3.4.33.js'
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
