const template = `
<div v-if="item.type === 'dir'" class="archieve-collection">
    <span class="legend">{{item.name}}</span>
    <ArchieveItem
        v-for="child in item.children"
        :item="child"
        @updateContext="updateContext"
    >
    </ArchieveItem>
</div>
<div v-else class="archieve-item" @click="updateContext(item)">
    <ion-icon name="sparkles-outline"></ion-icon>
    {{item.name}}
</div>
`

export default {
    name: 'ArchieveItem',
    props: {
        item: Object
    },
    setup(props, { emit }) {
        const { item } = props
        // updateContext
        const updateContext = (file) => {
            emit('updateContext', file)
        }
        return {
            item,
            updateContext
        }
    },
    template: template
}
