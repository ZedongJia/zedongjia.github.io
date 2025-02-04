const navHeight = document.querySelector("#nav").offsetHeight + 32

function goto(node) {
    let dataset = node.dataset
    let id = dataset["id"]
    let targetNode = document.querySelector(id)
    let scrollHeigth = targetNode.offsetTop - navHeight
    if (scrollHeigth < 0)
        scrollHeigth = 0
    window.scrollTo({
        "top": scrollHeigth,
        "behavior": "smooth"
    })
}

function golink(href) {
    window.open(href)
}

function typing() {
    const el = document.getElementById("name")
    const str = "Zedong Jia"
    let subLength = 0
    let sleep_itv = 1000

    function inc() {
        subLength++
        el.innerText = str.substring(0, subLength) + "_"
        if (subLength > str.length)
            setTimeout(dec, sleep_itv)
        else
            setTimeout(inc, Math.random() * 450 + 50)
    }
    function dec() {
        subLength--
        el.innerText = str.substring(0, subLength) + "_"
        if (subLength < 1)
            setTimeout(inc, sleep_itv)
        else
            setTimeout(dec, 50)
    }
    inc()
}

(() => {
    typing()
})()