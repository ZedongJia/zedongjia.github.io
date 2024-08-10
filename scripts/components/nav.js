const template = `
<div id="nav">
    <ul class="menu">
        <li v-for="menuItem in leftMenuItems" class="menu-item">
            <span
                :class="isActive(menuItem.name)? 'active':'deactive'"
                @click="handleOnClickItem(menuItem)"
            >
                <ion-icon
                    :name="menuItem.icon"
                >
                </ion-icon>
                <span>&nbsp;{{menuItem.name}}</span>
            </span>
        </li>
    </ul>
</div>
`

export default {
    props: {
        currentPage: String
    },
    setup(props) {
        // property
        const leftMenuItems = [
            {
                icon: 'home-outline',
                name: 'Home',
                hashpath: '/home'
            },
            {
                icon: 'library-outline',
                name: 'Archieve',
                hashpath: '/archieve'
            },
            {
                icon: 'document-outline',
                name: 'About',
                hashpath: '/about'
            },
            {
                icon: 'link-outline',
                name: 'Link',
                hashpath: '/link'
            },
            {
                icon: 'logo-github',
                name: 'Github',
                href: 'https://github.com/ZedongJia'
            }
        ]
        // method
        const isActive = (name) => {
            return props.currentPage == name
        }
        const handleOnClickItem = (item) => {
            if ('href' in item) {
                window.open(item.href)
            } else {
                window.location.hash = item.hashpath
            }
        }

        return {
            // property
            leftMenuItems,
            // method
            isActive,
            handleOnClickItem
        }
    },
    template: template
}
