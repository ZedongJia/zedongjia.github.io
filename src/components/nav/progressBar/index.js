const PIX_WIDTH = 64;
const PIX_HEIGHT = 64;
const CENTER_X = PIX_WIDTH / 2;
const CENTER_Y = PIX_HEIGHT / 2;
const RADUIS = 28;
const LINE_WIDTH = 8;

/**
 * @param {HTMLCanvasElement} canvas
 */
function clearProgress(canvas) {
    const ctx = canvas.getContext('2d');
    // 清除画布
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

/**
 * @param {HTMLCanvasElement} canvas
 * @param {number} percent
 */
function drawProgress(canvas, percent) {
    const style = window.getComputedStyle(document.querySelector('body'));
    const ctx = canvas.getContext('2d');

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.beginPath();
    const startAngle = -Math.PI / 2;
    const endAngle = startAngle + (percent / 100) * 2 * Math.PI;
    ctx.arc(CENTER_X, CENTER_Y, RADUIS, startAngle, endAngle);
    ctx.strokeStyle = style.getPropertyValue('--nav-hover-color');
    ctx.lineWidth = LINE_WIDTH;
    ctx.stroke();

    ctx.font = '1em Comic Sans MS';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = style.getPropertyValue('--nav-font-color');
    ctx.fillText(`${Math.round(percent)}%`, CENTER_X, CENTER_Y);
}

function updateProgress(canvas) {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const percent = scrollHeight ? (scrollTop / scrollHeight) * 100 : 0;

    if (percent == 0) clearProgress(canvas);
    else drawProgress(canvas, percent);
}

// 监听滚动事件

// 初始更新

function createProgressBar() {
    const progressBar = document.createElement('canvas');
    progressBar.width = PIX_WIDTH;
    progressBar.height = PIX_HEIGHT;
    progressBar.id = 'progress-bar';
    window.addEventListener('scroll', () => {
        updateProgress(progressBar);
    });
    return progressBar;
}

export default createProgressBar;
