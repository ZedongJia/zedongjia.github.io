/**
 * @param {String} tag
 * @param {{}} attr
 * @param {[str|HTMLElement]} children
 */
function h(tag, attr = {}, children = []) {
    const node = document.createElement(tag)
    const keys = Object.keys(attr)
    for (let i = 0; i < keys.length; i++) {
        const key = keys[i]
        const value = attr[key]
        node.setAttribute(key, value)
    }
    node.append(...children)
    return node
}

/**
 * @param {HTMLElement} els --要替换元素
 * @param {HTMLElement} root --替换的父节点
 * @param {HTMLElement} index --替换的位置，默认为全部替换
 */
function render(els, root, index = -1) {
    if (Number(index) === -1) {
        root.replaceChildren(...els)
    } else {
        root.replaceChild(...els, root.childNodes.item(index))
    }
}

/**
 *
 * @param {Array} arr
 * @param {Number} k
 * @returns
 */
function randomChoices(arr, k = 5) {
    if (k >= arr.length) {
        return arr
    }
    const result = []
    const visited = []
    while (result.length < k) {
        const index = Math.floor(Math.random() * arr.length)
        if (index in visited) {
            continue
        }
        result.push(arr[index])
        visited.push(index)
    }
    return result
}

/**
 *
 * @param {Array} arr
 * @param {Number} k
 * @returns
 */
function selectedByTime(arr, k = 5) {
    if (k >= arr.length) {
        return arr
    }
    arr.sort((a, b) => {
        const aDate = new Date(a.time.replace(/[年月日]/g, '/')).getTime()
        const bDate = new Date(b.time.replace(/[年月日]/g, '/')).getTime()
        return bDate - aDate
    })
    return arr.slice(0, k)
}
