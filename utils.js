function mount(id, position, name) {
    fetch(COMPONENTS[name])
        .then((response) => response.text())
        .then((text) => {
            // parse html
            let parser = new DOMParser()
            let component = parser.parseFromString(text, 'text/html').getElementById(name)
            document.getElementById(id).insertAdjacentElement(position, component)
            
            // execute script
            let script = component.querySelector('#onload').innerHTML
            eval(script)
        })
}

// common components
const COMPONENTS = {
    nav: '/pages/components/nav.html'
}

// docs (required modify)
const NOTES = ['/docs/test/Helloworld.md']
