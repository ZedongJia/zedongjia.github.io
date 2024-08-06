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
        @updateContext="updateContext"
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
    <hr v-if="!short" style="width:100%">
    <span v-if="!short" class="archieve-item-time">
        <ion-icon name="time-outline"></ion-icon>
        &nbsp;
        <span>{{item.time}}</span>
        &nbsp;
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
    setup(props, { emit }) {
        const { item, icon, short } = props
        // updateContext
        const updateContext = (file) => {
            emit('updateContext', file)
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
