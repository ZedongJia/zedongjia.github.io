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
                :type="detail.type"
                :items="detail.items"
            >
            </Detail>
        </div>
        <div id="right">
            <img id="avator" src="/images/avator.jpg">
            <div
                class="kv-collection"
                v-for="addition in additions"
            >
                <span class="key">
                    <ion-icon :name="addition.icon"></ion-icon>
                    &nbsp;
                    {{addition.key}}
                </span>
                <span
                    class="value"
                    v-for="val in addition.value"
                >
                {{val}}
                </span>
            </div>
        </div>
    </div>
</Wrapper>
`

export default {
    setup() {
        const additions = ref([])
        const details = ref([])
        fetch('/scripts/constant/personInfo.json').then((response) => {
            response.json().then((kvs) => {
                additions.value = kvs
            })
        })
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
