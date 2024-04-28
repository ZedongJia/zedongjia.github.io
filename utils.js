function mount(id, position, name) {
    requestFile(COMPONENTS[name]).then((text) => {
        // parse html
        let component = parseDom(text, name)
        document.getElementById(id).insertAdjacentElement(position, component)
        executeScript([component])
    })
}

async function requestFile(filepath) {
    let response = await fetch(filepath)
    return response.text()
}

function parseDom(text, name) {
    let parser = new DOMParser()
    let component = parser.parseFromString(text, 'text/html').querySelector(name)
    return component
}

function parseAllDom(text) {
    let parser = new DOMParser()
    let components = parser.parseFromString(text, 'text/html').querySelector('body').childNodes
    return components
}

function executeScript(domList) {
    domList.forEach((el) => {
        // execute script
        el.querySelectorAll('.onload').forEach((script) => {
            eval(script.innerHTML)
        })
    })
}

function replace(text, replacer) {
    let start = 0
    let end = 0
    let newText = ''
    while (start < text.length) {
        start = text.indexOf('{{', end)
        if (start == -1) {
            break
        }
        newText += text.substring(end, start)
        end = text.indexOf('}}', start + 1)
        let name = text.substring(start + 2, end)
        newText += replacer[name]
        end += 2
    }
    newText += text.substring(end, text.length)
    return newText
}

// common components
const COMPONENTS = {
    '#nav': '/pages/components/nav.html'
}
