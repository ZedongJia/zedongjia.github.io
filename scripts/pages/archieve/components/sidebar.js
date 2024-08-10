import { TOP_LIST } from '../../../constant/docsIndex.js'
import ArchieveItem from './archieveItem.js'
const template = `
<div id="archieve-sidebar">
    <ArchieveItem
        :item="top"
        icon="flame-outline"
        short
    >
    </ArchieveItem>
</div>
`

export default {
    setup() {
        const top = {
            name: 'Recently',
            type: 'dir',
            children: TOP_LIST.slice(0, TOP_LIST.length > 5 ? 5 : TOP_LIST.length)
        }
        return {
            top
        }
    },
    template: template,
    components: {
        ArchieveItem
    }
}
