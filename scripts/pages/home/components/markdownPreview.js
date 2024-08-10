import { computed, watchEffect } from '../../../../plugins/vue3.4.33.js'
import Addition from '../../../components/addition.js'
import { PROTOCAL, IP } from '../../../constant/baseUrl.js'
/**
 * Outer script start---
 */
const initOutline = () => {
    const headingElements = []
    Array.from(document.getElementById('preview-content').children).forEach((item) => {
        if (item.tagName.length === 2 && item.tagName !== 'HR' && item.tagName.indexOf('H') === 0) {
            headingElements.push(item)
        }
    })
    let toc = []
    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY
        toc = []
        headingElements.forEach((item) => {
            toc.push({
                id: item.id,
                offsetTop: item.offsetTop
            })
        })

        const currentElement = document.querySelector('.vditor-outline__item--current')
        for (let i = 0, iMax = toc.length; i < iMax; i++) {
            if (scrollTop < toc[i].offsetTop - 30) {
                if (currentElement) {
                    currentElement.classList.remove('vditor-outline__item--current')
                }
                let index = i > 0 ? i - 1 : 0
                document.querySelector('span[data-target-id="' + toc[index].id + '"]').classList.add('vditor-outline__item--current')
                break
            }
        }
    })
}

async function markdownRender(filepath) {
    let response = await fetch(filepath)
    if (response.status == 404) throw Error('File not found!')
    let text = await response.text()

    Vditor.preview(document.getElementById('preview-content'), text, {
        speech: {
            enable: true
        },
        anchor: 1,
        after() {
            const outlineElement = document.getElementById('outline')

            Vditor.outlineRender(document.getElementById('preview-content'), outlineElement)
            if (outlineElement.innerText.trim() !== '') {
                outlineElement.style.display = 'block'
                initOutline()
            }
        }
    })
}

/**
 * Component start--
 */
const template = `
<div id="preview">
    <div id="preview-title">
        <span>
            <ion-icon name="paw-outline"></ion-icon>
            &nbsp;
            <h1>{{file.name}}</h1>
        </span>
        <Addition icon="pencil-outline" name="Author" description="ZD-J"></Addition>
        &nbsp;
        <Addition icon="time-outline" name="Time" :description="file.time"></Addition>
    </div>
    <div id="preview-content"></div>
    <hr>
    <div id="footer">
        <span class="button" @click="copyLinkToClipboard()">
            <ion-icon name="clipboard-outline"></ion-icon>
            &nbsp;
            article link
        </span>
    </div>
</div>
`

export default {
    props: {
        file: Object
    },
    setup(props, { emit }) {
        const file = computed(() => props.file)
        watchEffect(() => {
            markdownRender(file.value.href).catch(() => {
                emit('onErrorLoadFile')
            })
        }, file)
        const copyLinkToClipboard = () => {
            navigator.clipboard
                .writeText(`${PROTOCAL}://${IP}/#/home?file=` + encodeURIComponent(JSON.stringify(file.value)))
                .then(() => {
                    console.log('Successful copied to clipboard')
                })
                .catch((error) => {
                    console.error(error)
                })
        }
        return {
            file,
            copyLinkToClipboard
        }
    },
    template: template,
    components: {
        Addition
    }
}
