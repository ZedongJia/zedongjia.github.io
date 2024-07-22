import { computed, ref } from '../../../plugins/vue3.4.33.js'
import Layout from '../../components/layout.js'
import MarkdownPreview from './components/markdownPreview.js'
import SideBar from './components/sidebar.js'
import { TOP_LIST } from '../../constant/docsIndex.js'

const template = `
<Layout>
    <template #main>
        <MarkdownPreview :file="file" @onErrorLoadFile="onErrorLoadFile"></MarkdownPreview>
    </template>
    <template #aside>
        <SideBar></SideBar>
    </template>
</Layout>
`

export default {
    props: {
        context: Object
    },
    setup(props, { emit }) {
        // property
        const file = computed(() => props.context.file)
        // method
        const onErrorLoadFile = () => {
            emit('updateContext', 'file', TOP_LIST[0])
        }
        return {
            file,
            onErrorLoadFile
        }
    },
    template: template,
    components: {
        Layout,
        MarkdownPreview,
        SideBar
    }
}
