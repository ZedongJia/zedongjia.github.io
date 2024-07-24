const template = `
<div class="link-block">
    <span class="link-block-title">
        <ion-icon :name="icon"></ion-icon>
        <span style="padding: 0 .25em"></span>
        {{title}}
    </span>
    <div
        v-for="link in links"
        class="link-item"
    >
        <span
            class="left"
            :style="'background-color:' + link.backgroundColor + ';color:' + link.color"
        >
            <img class="avator" :src="link.src">
            <span class="name">{{link.name}}</span>
        </span>
        <span class="right">
            <span class="intro">{{link.intro}}</span>
            <span style="flex-grow: 1"></span>
            <span class="button" @click="navigateTo(link.href)">
                <ion-icon name="navigate-outline"></ion-icon>
                &nbsp;
                Visit
            </span>
        </span>
    </div>
</div>
`

export default {
    props: {
        title: String,
        icon: String,
        links: Array
    },
    setup(props) {
        const { title, icon, links } = props
        const navigateTo = (href) => {
            window.open(href)
        }
        return {
            title,
            icon,
            links,
            navigateTo
        }
    },
    template: template
}
