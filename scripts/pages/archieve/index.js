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
            @updateContext="updateContext"
        >
        </ArchieveItem>
    </template>
    <template #aside>
        <SideBar @updateContext="updateContext"></SideBar>
    </template>
</Layout>
`

export default {
    setup(props, { emit }) {
        // property
        const archieveTree = ARCHIEVE_TREE
        const updateContext = (file) => {
            console.log(file)
            emit('updateContext', 'file', file)
            emit('navigateTo', 'Home')
        }
        return {
            archieveTree,
            updateContext
        }
    },
    template: template,
    components: {
        Layout,
        ArchieveItem,
        SideBar
    }
}
