import { onMounted, ref } from '../plugins/vue3.4.33.js'
import Home from './pages/home/index.js'
import Archieve from './pages/archieve/index.js'
import About from './pages/about/index.js'
import Link from './pages/link/index.js'
import Nav from './components/nav.js'

const template = `
<Nav :currentPage="context.page"></Nav>
<component
    v-if="context.page !==''"
    :is="context.page"
    :context="context"
>
</component>
<div id="bg"></div>
`
const getQuery = () => {
    let hasharr = window.location.hash.split('?')
    if (hasharr.length == 2) {
        let search = hasharr[1]
        return search.split('&').map((item) => {
            let kv = item.split('=')
            return {
                key: kv[0],
                value: kv[1]
            }
        })
    } else {
        return []
    }
}

const ROUTE_TABLE = {
    '/home': 'Home',
    '/archieve': 'Archieve',
    '/about': 'About',
    '/link': 'Link'
}

export default {
    setup() {
        // navigation
        const context = ref({
            page: '',
            query: []
        })
        function navigateTo() {
            let hashpath = window.location.hash.split('?')[0]
            hashpath = hashpath.slice(1, hashpath.length)
            if (Object.keys(ROUTE_TABLE).includes(hashpath)) {
                context.value = {
                    page: ROUTE_TABLE[hashpath],
                    query: getQuery()
                }
            } else {
                window.location.hash = '/home'
            }
        }
        // window event
        window.addEventListener('hashchange', () => {
            navigateTo()
        })
        // lifehook
        onMounted(() => {
            navigateTo()
        })
        return {
            context,
            navigateTo
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
