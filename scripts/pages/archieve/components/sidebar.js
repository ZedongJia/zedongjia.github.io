import { TOP_LIST } from '../../../constant/docsIndex.js'
import ArchieveItem from './archieveItem.js'
const template = `
<div id="archieve-sidebar">
    <ArchieveItem :item="top" @updateContext="updateContext"></ArchieveItem>
</div>
`

export default {
    setup(props, { emit }) {
        const top = {
            name: 'Recently',
            type: 'dir',
            children: TOP_LIST.slice(0, TOP_LIST.length > 5 ? 5 : TOP_LIST.length)
        }
        // updateContext
        const updateContext = (file) => {
            emit('updateContext', file)
        }
        return {
            top,
            updateContext
        }
    },
    template: template,
    components: {
        ArchieveItem
    }
}
