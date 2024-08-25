import { ref } from '../../../plugins/vue3.4.33.js'
import Wrapper from '../../components/wrapper.js'
import Addition from '../../components/addition.js'
import Detail from './components/detail.js'
const template = `
<Wrapper>
    <div id="introduction">
        <div id="left">
            <Detail
                v-for="detail in details"
                :topic="detail.topic"
                :items="detail.items"
            >
            </Detail>
        </div>
        <div id="right">
            <img id="avator" src="/images/avator.jpg">
            <Addition
            v-for="addition in additions"
            :icon="addition.icon"
            :name="addition.name"
            :description="addition.description"
            >
            </Addition>
        </div>
    </div>
</Wrapper>
`

export default {
    setup() {
        const additions = [
            {
                icon: 'school-outline',
                name: 'Education',
                description: 'Undergraduate, Software Engineer, Nankai University'
            },
            {
                icon: 'heart-circle-outline',
                name: 'Interests',
                description: 'Deep Learning, Machine Learning, Netword etc...'
            },
            {
                icon: 'mail-outline',
                name: 'Email',
                description: 'zedongjia305@gmail.com'
            }
        ]
        const details = ref([])
        fetch('/scripts/constant/about.json').then((response) => {
            response.json().then((about) => {
                details.value = about
            })
        })
        return {
            additions,
            details
        }
    },
    template: template,
    components: {
        Wrapper,
        Addition,
        Detail
    }
}
