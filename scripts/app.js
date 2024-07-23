import { onMounted, onUnmounted, ref } from '../plugins/vue3.4.33.js'
import Home from './pages/home/index.js'
import Archieve from './pages/archieve/index.js'
import About from './pages/about/index.js'
import Link from './pages/link/index.js'
import Nav from './components/nav.js'
import { TOP_LIST } from './constant/docsIndex.js'

const template = `
<Nav :currentPage="currentPage" @navigateTo="navigateTo"></Nav>
<component
    v-if="currentPage!==''"
    :is="currentPage"
    :context="context"
    @updateContext="updateContext"
    @navigateTo="navigateTo"
>
</component>
<div id="bg"></div>
`

export default {
    setup() {
        // property
        const context = ref({
            file: TOP_LIST[0]
        })
        const currentPage = ref('')
        // methods
        const navigateTo = (name) => {
            currentPage.value = name
            window.localStorage.setItem('currentPage', name)
        }
        const updateContext = (key, value) => {
            context.value[key] = value
            window.localStorage.setItem(key, JSON.stringify(value))
        }
        // lifehook
        onMounted(() => {
            let search = window.location.search
            if (search !== '') {
                context.value['file'] = JSON.parse(decodeURIComponent(search.slice(1, search.length)))
                return
            }
            let storeFile = window.localStorage.getItem('file')
            if (storeFile !== null) {
                context.value['file'] = JSON.parse(storeFile)
            }
        })
        return {
            context,
            currentPage,
            navigateTo,
            updateContext
        }
    },
    template: template,
    components: {
        Nav,
        Home,
        Archieve,
        About,
        Link
    }
}
