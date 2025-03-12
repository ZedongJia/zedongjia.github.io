/**
 * goto this label
 */
function goto() {
    const target = document.querySelector(this.dataset['id']);
    const offset = document.querySelector('#nav').offsetHeight + 32;
    let top = target.offsetTop - offset;
    if (top < 0) top = 0;
    window.scrollTo({
        top: top,
        behavior: 'smooth'
    });
}

/**
 * change theme
 */
function changeTheme() {
    let body = document.querySelector('body');
    if (body.id === 'light') {
        body.id = 'dark';
        this.innerHTML = '&#x2600';
    } else {
        body.id = 'light';
        this.innerHTML = '&#x263d';
    }
}

/**
 * typing animation
 * @param {HTMLElement} el
 */
function typing(el) {
    const str = 'Zedong Jia';
    let subLength = 0;
    let sleep_itv = 1000;

    function inc() {
        subLength++;
        el.innerText = str.substring(0, subLength) + '_';
        if (subLength > str.length) setTimeout(dec, sleep_itv);
        else setTimeout(inc, Math.random() * 450 + 50);
    }
    function dec() {
        subLength--;
        el.innerText = str.substring(0, subLength) + '_';
        if (subLength < 1) setTimeout(inc, sleep_itv);
        else setTimeout(dec, 50);
    }
    inc();
}

export { goto, changeTheme, typing };
