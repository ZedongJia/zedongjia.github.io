const bgStr = `#include &lt;stdio.h&gt;\nint main()\n{\n\tprintf("Hello world!")\n}`;

function createBg() {
    const bg = document.createElement('pre');
    bg.id = 'bg';
    bg.innerHTML = bgStr;
    return bg;
}

export default createBg;
