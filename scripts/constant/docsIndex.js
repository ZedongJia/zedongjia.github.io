let ARCHIEVE_TREE
let TOP_LIST

async function loadIndex() {
    let response = await fetch('/scripts/constant/docsIndex.json')
    let data = await response.json()
    ARCHIEVE_TREE = data['ARCHIEVE_TREE']
    TOP_LIST = data['TOP_LIST']
}

export { ARCHIEVE_TREE, TOP_LIST, loadIndex }
