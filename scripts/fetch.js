/**
 * 
 * @param {String} url 
 * @returns {Promise<Object>}
 */
async function fetchJson(url) {
    try {
        const response = await fetch(url)
        if (!response.ok)
            throw new Error(`${response.statusText} ${response.url}`);
        const data = await response.json()
        return data
    } catch (error) {
        throw error
    }
}

/**
 * create link a[_blank]
 * @param {String} href 
 * @param {String} text 
 * @returns 
 */
function createBlankA(
    href,
    text
) {
    const link = document.createElement('a')
    link.target = '_blank'
    link.href = href
    link.innerText = text
    return link
}

/**
 * create button[_blank]
 * @param {String} href 
 * @param {String} text 
 * @returns 
 */
function createBlankBtn(
    href,
    text
) {
    const btn = document.createElement('button')
    btn.onclick = () => {
        golink(href)
    }
    btn.innerText = text
    return btn
}

function createAboutBlock(block) {
    const el = document.createElement('ul')
    el.classList.add("list-container")
    el.classList.add("shadow")
    const name = document.createElement("span")
    name.innerHTML = `☰ ${block["name"]}`
    items = block["list"].map(item => {
        const li = document.createElement("li")
        li.innerText = "✎ "
        if (typeof item == "string") {
            li.innerText += item
        } else if ("href" in item) {
            li.appendChild(createBlankA(
                item["href"],
                item["name"]
            ))
        }
        else {
            const key = document.createElement("span")
            key.innerText = item["key"]
            let value
            if (typeof item["value"] == "string") {
                value = document.createElement("span")
                value.innerText = item["value"]
            } else {
                value = createBlankA(
                    item["value"]["href"],
                    item["value"]["name"]
                )
            }
            li.append(...[
                key,
                document.createTextNode(": "),
                value
            ])
        }
        return li
    })
    el.append(
        name,
        ...items
    )
    return el
}

function createPaperDescription(index, paper) {
    const el = document.createElement('li')
    el.classList.add("list-container")
    el.classList.add("shadow")
    const info = document.createElement('span')
    info.innerHTML = `<i style="font-size:1.5em;">${index + 1}.</i> ${paper["name"]}`
    info.append(...[
        document.createTextNode(", "),
        createBlankA(paper["paper_link"], "Paper"),
        document.createTextNode(", "),
        createBlankA(paper["code_link"], "Code"),
    ])
    const tags = document.createElement("span")
    tags.classList.add("tag-list")
    paper["tag_list"].forEach(tagname => {
        const tag = document.createElement('span')
        tag.classList.add("tag")
        tag.innerText = tagname
        tags.appendChild(tag)
    })
    el.append(...[
        info,
        tags,
    ])
    return el
}

function createFLink(flink) {
    const el = document.createElement('li')
    el.classList.add("shadow")
    const nickname = document.createElement("span")
    nickname.classList.add("nickname")
    nickname.innerText = flink["nickname"]
    const avatar = document.createElement("img")
    avatar.src = flink["avatar"]
    avatar.alt = "avatar"
    el.append(...[
        nickname,
        avatar,
        createBlankBtn(flink["home-page"], "Home Page")
    ])
    return el
}

(() => {
    // fetch about
    fetchJson('/data/about.json').then((blocks) => {
        const el = document.getElementById('about-list')
        el.innerHTML = ""
        blocks.forEach((block) => {
            el.appendChild(createAboutBlock(block))
        })
    }).catch((error) => {
        const el = document.getElementById('about-list')
        el.innerHTML = `${error}`
    })
    // fetch papers
    fetchJson('/data/papers.json').then((papers) => {
        const el = document.getElementById('paper-list')
        el.innerHTML = ""
        papers.forEach((paper, index) => {
            el.appendChild(createPaperDescription(index, paper))
        })
    }).catch((error) => {
        const el = document.getElementById('paper-list')
        el.innerHTML = `${error}`
    })
    // fetch flinks
    fetchJson('/data/flinks.json').then((flinks) => {
        const el = document.getElementById('flink-list')
        el.innerHTML = ""
        flinks.forEach((link) => {
            el.appendChild(createFLink(link))
        })
    }).catch((error) => {
        const el = document.getElementById('flink-list')
        el.innerHTML = `${error}`
    })
})()