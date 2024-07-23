import { computed } from '../../plugins/vue3.4.33.js'
const template = `
<div class="addition">
    <span class="key"><ion-icon :name="icon"></ion-icon>&nbsp;{{name}}</span>
    <span class="value">{{description}}</span>
</div>
`

export default {
    props: {
        icon: String,
        name: String,
        description: String
    },
    setup(props) {
        const icon = computed(() => props.icon)
        const name = computed(() => props.name)
        const description = computed(() => props.description)
        return {
            icon,
            name,
            description
        }
    },
    template: template
}
