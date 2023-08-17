const onLoadFuncList = []

const topics = Object.keys(doc)

// -------------------------components-------------------------
// ---Nav
function Logo() {
    return h('div', { class: 'logo' }, ['J'])
}

// menu prepared
const menuItems = [
    { hash: '#/', name: '主页' },
    { hash: '#/achieve', name: '归档' }
]

function MenuItem(hash, name) {
    return h('li', { class: 'menu-item' }, [h('a', { href: hash }, [name])])
}

function Menu() {
    return h(
        'ul',
        { class: 'menu' },
        menuItems.map((item) => MenuItem(item.hash, item.name))
    )
}

function Nav() {
    return h('div', { class: 'nav' }, [Logo(), Menu()])
}

onLoadFuncList.push(() => {
    const aList = document.querySelectorAll('.menu-item a')
    aList.forEach((el) => el.classList.remove('active'))
    for (let i = 0; i < aList.length; i++) {
        if (aList[i].href === window.location.href) {
            aList[i].classList.add('active')
            break
        }
    }
    window.addEventListener('hashchange', () => {
        const aList = document.querySelectorAll('.menu-item a')
        aList.forEach((el) => el.classList.remove('active'))
        for (let i = 0; i < aList.length; i++) {
            if (aList[i].href === window.location.href) {
                aList[i].classList.add('active')
                break
            }
        }
    })
})

// ---article

function switchArticle(e) {
    const { topic, index } = e.dataset
    const article = doc[topic][index]
    window.location.hash = '#/'
    setTimeout(() => {
        render([Article(article.title, article.time, article.content)], document.querySelector('.main'))
    }, 300)
}

function Article(title, time, content) {
    const article = h('div', { class: 'markdown-body' })
    article.innerHTML = content
    return h('div', { class: 'article' }, [
        h('h1', { class: 'title' }, [h('span', { class: 'icon' }, [h('ion-icon', { name: 'bookmark-outline' })]), title]),
        h('hr'),
        h('div', { class: 'time' }, [time]),
        h('div', { class: 'content' }, [article]),
        h('script', {}, [
            `
            if (MathJax !== undefined) {
                MathJax.Hub.Queue(["Typeset", MathJax.Hub])
            }
            `
        ])
    ])
}

// ---doclink
/**
 * @param {String} title
 * @param {[{title, topic, index}]} linkList
 */
function DocRecommend(title, linkList) {
    return h('div', { class: 'doc-recommend' }, [
        h('h3', {}, [h('span', { class: 'icon' }, [h('ion-icon', { name: 'pricetags-outline' })]), title]),
        h('hr'),
        h(
            'ul',
            {},
            linkList.map((link) =>
                h('li', { onclick: 'switchArticle(this)', 'data-topic': link.topic, 'data-index': link.index }, [
                    h('span', { class: 'title' }, [link.title]),
                    h('span', { class: 'topic' }, [link.topic])
                ])
            )
        )
    ])
}

// ---blockarea
function BlockArea() {
    /**
     * {
     *  title
     *  time
     *  abstract
     *  content
     * }
     */
    return h(
        'div',
        { class: 'blockarea' },
        topics.map((topic) =>
            h('div', { class: 'area' }, [
                h('h2', { class: 'topic' }, [h('span', { class: 'icon' }, [h('ion-icon', { name: 'ribbon-outline' })]), topic]),
                h('hr'),
                ...doc[topic].map((item, index) =>
                    h('div', { class: 'item', onclick: 'switchArticle(this)', 'data-topic': topic, 'data-index': index }, [
                        h('h4', { class: 'title' }, [
                            h('span', { class: 'icon' }, [h('ion-icon', { name: 'chevron-forward-outline' })]),
                            item.title,
                            h('span', { class: 'time' }, [item.time])
                        ]),
                        h('div', { class: 'abstract' }, [item.abstract])
                    ])
                )
            ])
        )
    )
}

// ---card
function Card(el) {
    return h('div', { class: 'card' }, [el])
}

// ---sidebar
function Sidebar() {
    let docList = []
    topics.forEach((topic) => {
        docList = docList.concat(
            doc[topic].map((item, index) => {
                return {
                    title: item.title,
                    topic: topic,
                    index: index
                }
            })
        )
    })
    return h('div', { class: 'sidebar' }, [
        Card(DocRecommend('近期更新', randomChoices(docList))),
        h('br'),
        Card(DocRecommend('推荐阅读', randomChoices(docList)))
    ])
}

// ---------------------------views----------------------------
// ---Home
function Home() {
    return h('div', { class: 'main' }, [Article('Hello World', '至未来的你', '<h3>你好，这里是J的个人博客, 希望你有所获，未来可期！</h3>')])
}

// ---Achieve
function Achieve() {
    return h('div', { class: 'main' }, [BlockArea()])
}

// ---Main
function Main(el) {
    return h('div', { class: 'frame' }, [Nav(), h('div', { class: 'layout' }, [el, Sidebar()])])
}

// --------------------------router----------------------------
const router = {
    '#/': Home,
    '#/achieve': Achieve
}

function push(hash) {
    window.location.hash = hash
}

function initialize() {
    const { host } = window.location
    if (!window.location.href.includes('#')) {
        if (host !== '') {
            window.location.href = '/#/'
        } else {
            window.location.hash = '#/'
        }
    }
    const { hash } = window.location
    render([Main(router[hash]())], document.querySelector('#web'))
}

function visit() {
    const { host } = window.location
    if (!window.location.href.includes('#')) {
        if (host !== '') {
            window.location.href = '/#/'
        } else {
            window.location.hash = '#/'
        }
    }
    const { hash } = window.location
    render([router[hash]()], document.querySelector('.layout'), 0)
}

// -------------------------control----------------------------
window.onload = () => {
    initialize()
    window.addEventListener('hashchange', visit)
    onLoadFuncList.forEach((f) => f())
}
