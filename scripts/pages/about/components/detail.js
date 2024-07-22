const template = `
<div class="detail">
    <span class="detail-topic">
        <ion-icon name="star-outline"></ion-icon>
        {{topic}}
    </span>
    <span v-for="item in items" class="detail-item" @click="navigateToOuterHref(item.href)">{{item.title}}</span>
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
        const navigateToOuterHref = (href) => {
            window.location.replace(href)
        }
        return {
            topic,
            items,
            navigateToOuterHref
        }
    },
    template: template
}
