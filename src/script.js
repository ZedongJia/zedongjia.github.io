window.onload = () => {
	$fun$0(),
	$fun$1(),
	$fun$2()
}
$fun$0 = () => {
    if (document.body.clientWidth < 758) {
        let list = document.querySelector('.list')
        if (list == undefined) {
            return
        }
        list.style.display = 'none'
        list.style.opacity = 0
        list.style.transform = 'translate(-100%, 0)'
        let button = document.querySelector('.list-button')
        button.setAttribute('onclick', 'handleListOpen(this)')
        button.classList.add('list-button-active')
        button.appendChild(document.createTextNode('menu'))
        document.querySelector('.blog-main').setAttribute('onclick', 'handleListClose()')
    }
}
function handleListOpen(e) {
    let list = document.querySelector('.list')
    list.style.display = 'block'
    setTimeout(() => {
        list.style.opacity = 1
        list.style.transform = 'translate(0, 0)'
    }, 100)
    if(e && e.stopPropagation){
        e.stopPropagation();
    }else{
        window.event.cancelBubble = true;
    }
}

function handleListClose() {
    let list = document.querySelector('.list')
    list.style.opacity = 0
    list.style.transform = 'translate(-100%, 0)'
    setTimeout(() => {
        list.style.display = 'none'
    }, 500)
}
// list
$fun$1 = () => {
    // default open
    list = document.querySelector('.list')
    if (list != undefined) {
        let href = window.location.href
        href = decodeURI(href)
        let search_dir = 'post/'
        let start = href.indexOf(search_dir)
        if (start == -1) {
            return
        }
        start = start + search_dir.length
        end = href.indexOf('/', start)
        if (end == -1) {
            topic = ''
        } else {
            topic = href.substring(start, end)
            // 解决中文乱码问题
        }
        spans = list.querySelectorAll('.list-topic')
        for (let i = 0; i < spans.length; i++) {
            text = spans[i].querySelector('.list-title').innerHTML
            text = text.substring(0, text.length - 1).trim()
            if (text == topic) {
                handleSubitems(spans[i])
                break;
            }
            if (topic == '') {
                handleSubitems(spans[i])
                break; 
            }
        }
    }
}


function handleSubitems(e) {
    let a = e.querySelectorAll('a')
    let len = a.length
    for (let i = 0; i < len; i++) {
        display = a[i].style.display
        if (display == 'none' || display == '') {
            e.style.height = 48 * (len + 1) + 'px'
            setTimeout(() => {
                a[i].style.display = 'inline-block'
            }, 500)
        } else {
            a[i].style.opacity = 0
            setTimeout(() => {
                a[i].style.display = 'none'
            }, 100)
            setTimeout(() => {
                e.style.height = 48 * (1) + 'px'
            }, 100)
        }
    }
}
$fun$2 = () => {
  preTop = 10
  setInterval(() => {
    let top = document.querySelector('html').scrollTop
    if (preTop - top == 0) {
      return
    }
    let nav = document.querySelector('.nav')
    let a = document.querySelectorAll('.nav-menu-item>a')
    if (top > 10) {
      nav.style.backgroundColor = 'black'
      for (let i = 0; i < a.length; i++) {
        a[i].style.color = 'rgb(212, 212, 212)'
        a[i].querySelector('.tip').style.backgroundColor = 'rgb(212, 212, 212)'
      }
      let list_button = document.querySelector('.list-button-active')
      if (list_button != undefined) {
        list_button.style.backgroundColor = 'white'
        list_button.style.color = 'black'
      }
    } else {
      nav.style.backgroundColor = 'rgba(215, 215, 215, 0.3)'
      for (let i = 0; i < a.length; i++) {
        a[i].style.color = 'black'
        a[i].querySelector('.tip').style.backgroundColor = 'black'
      }
      let list_button = document.querySelector('.list-button-active')
      if (list_button != undefined) {
        list_button.style.backgroundColor = 'black'
        list_button.style.color = 'white'
      }
    }
    preTop = top
  }, 20)
}
