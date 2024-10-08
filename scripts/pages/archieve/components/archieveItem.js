const template = `
<div v-if="item.type === 'dir'" class="archieve-collection">
    <span class="legend">
        <ion-icon name="list-outline"></ion-icon>
        &nbsp;
        {{item.name}}
        </span>
    <ArchieveItem
        v-for="child in item.children"
        :item="child"
        :icon="icon"
        :short="short"
    >
    </ArchieveItem>
</div>
<div v-else class="archieve-item" @click="updateContext(item)">
    <span class="archieve-item-title">
        <ion-icon :name="icon"></ion-icon>
        &nbsp;
        <span>{{item.name}}</span>
    </span>
</div>
`

export default {
    name: 'ArchieveItem',
    props: {
        item: Object,
        icon: {
            type: String,
            default: 'document-text-outline'
        },
        short: {
            type: Boolean,
            default: false
        }
    },
    setup(props) {
        const { item, icon, short } = props
        // updateContext
        const updateContext = (file) => {
            window.location.hash = `/home?file=${encodeURIComponent(JSON.stringify(file))}`
        }
        return {
            item,
            icon,
            short,
            updateContext
        }
    },
    template: template
}
