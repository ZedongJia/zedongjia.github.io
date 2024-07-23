import Wrapper from '../../components/wrapper.js'
import LinkBlock from './components/linkBlock.js'
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
        const linkBlocks = [
            {
                title: 'Resource',
                icon: 'rocket-outline',
                links: [
                    {
                        src: '/images/vue.jpg',
                        name: 'vue',
                        intro: 'Vue official website. Here you can learn almost everything about vue!',
                        href: 'https://vuejs.org',
                        color: 'white',
                        backgroundColor: 'green'
                    }
                ]
            },
            {
                title: 'Friend',
                icon: 'earth-outline',
                links: [
                    {
                        src: '/images/avator.jpg',
                        name: 'ZD_J',
                        intro: 'Link myself(just for testing)',
                        href: 'http://zedongjia.github.io',
                        color: 'green',
                        backgroundColor: 'black'
                    }
                ]
            }
        ]
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
