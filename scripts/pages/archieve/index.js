import Layout from '../../components/layout.js'
import ArchieveItem from './components/archieveItem.js'
import SideBar from './components/sidebar.js'
import { ARCHIEVE_TREE } from '../../constant/docsIndex.js'
const template = `
<Layout>
    <template #main>
        <ArchieveItem
            v-for="child in archieveTree.children"
            :item="child"
        >
        </ArchieveItem>
    </template>
    <template #aside>
        <SideBar></SideBar>
    </template>
</Layout>
`

export default {
    setup() {
        // property
        const archieveTree = ARCHIEVE_TREE
        return {
            archieveTree
        }
    },
    template: template,
    components: {
        Layout,
        ArchieveItem,
        SideBar
    }
}
