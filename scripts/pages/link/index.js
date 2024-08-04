import Wrapper from '../../components/wrapper.js'
import LinkBlock from './components/linkBlock.js'
import { ref } from '../../../plugins/vue3.4.33.js'
const template = `
<Wrapper>
    <div id="link">
        <LinkBlock
        v-for="block in linkBlocks"
        :title="block.title"
        :icon="block.icon"
        :links="block.links"
        >
        </LinkBlock>
    </div>
</Wrapper>
`

export default {
    setup() {
        const linkBlocks = ref([])
        fetch('/scripts/constant/links.json').then((response) => {
            response.json().then((links) => {
                linkBlocks.value = links
            })
        })
        return {
            linkBlocks
        }
    },
    template: template,
    components: {
        Wrapper,
        LinkBlock
    }
}
