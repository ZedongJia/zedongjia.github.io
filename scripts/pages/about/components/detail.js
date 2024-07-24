import { ref } from '../../../../plugins/vue3.4.33.js'
const template = `
<div class="detail">
    <span class="detail-topic">
        <ion-icon name="star-outline"></ion-icon>
        <span style="padding: 0 .25em"></span>
        {{topic}}
    </span>
    <span
        v-for="(item, index) in items"
        :class="{'detail-item': true, 'fold': !isFlattern[index]}"
        
    >
        <span
            :class="{'detail-item-title': true, 'flattern': isFlattern[index]}"
            @click="trigger(index)"
        >
            <ion-icon :name="isFlattern[index] ? 'caret-down-outline' : 'caret-forward-outline'"></ion-icon>
            {{item.title}}
        </span>
        <span v-if="isFlattern[index]" class="detail-item-desc">{{item.desc}}</span>
        <span v-if="isFlattern[index]" class="detail-item-action">
            <span
                class="button"
                @click="navigateToOuterHref(item.href)"
            >
                <ion-icon name="arrow-forward-circle-outline"></ion-icon>
                &nbsp;
                Navigate
            </span>
        </span>
    </span>
    <hr style="margin: 1em 0">
</div>
`

export default {
    props: {
        topic: String,
        items: Array
    },
    setup(props) {
        const { topic, items } = props
        const isFlattern = ref(items.map(() => false))
        const trigger = (index) => {
            isFlattern.value[index] = !isFlattern.value[index]
        }
        const navigateToOuterHref = (href) => {
            window.open(href)
        }
        return {
            topic,
            items,
            isFlattern,
            trigger,
            navigateToOuterHref
        }
    },
    template: template
}
