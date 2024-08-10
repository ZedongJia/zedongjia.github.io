import { computed, onMounted, ref, watch } from '../../../plugins/vue3.4.33.js'
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
    setup(props) {
        // property
        const file = ref(TOP_LIST[0])
        const query = computed(() => props.context.query)
        // method
        const onErrorLoadFile = () => {
            window.location.hash = `/home?file=${encodeURIComponent(JSON.stringify(TOP_LIST[0]))}`
        }
        const loadFile = () => {
            if (query.value.length != 0) {
                let key = query.value[0]['key']
                let value = query.value[0]['value']
                if (key == 'file') {
                    file.value = JSON.parse(decodeURIComponent(value))
                    return
                }
            }
            window.location.hash = `/home?file=${encodeURIComponent(JSON.stringify(TOP_LIST[0]))}`
        }
        watch(query, () => {
            loadFile()
        })
        onMounted(() => {
            loadFile()
        })
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
