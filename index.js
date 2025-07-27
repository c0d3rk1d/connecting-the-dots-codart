
document.addEventListener("DOMContentLoaded", () => {
    const canvasElement = document.getElementById("codart");
    const roughCanvas = rough.canvas(canvasElement);
    const canvasContext = canvasElement.getContext("2d");
    const colors = ['#ff4d4d', '#ff944d', '#ffe24d', '#c3ff4d', '#4dff88', '#4dffff', '#4da6ff', '#b84dff', '#ff4df2'];
    const dotCount = 100;
    const dotSizeMin = 20;
    const dotSizeMax = 25;
    const dotDistanceMin = 50;
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    const MIN_DISTANCE = dotDistanceMin;
    const blockSize = dotSizeMax * 2 + dotDistanceMin * 2
    const rows = Math.ceil(screenHeight / blockSize);
    const cols = Math.ceil(screenWidth / blockSize);
    const grid = Array.from({ length: rows }, () => Array(cols).fill(null));
    console.log(`Screen size: ${screenWidth} x ${screenHeight}`);
    console.log(`Block size: ${blockSize}`);
    console.log(`Rows: ${rows}, Cols: ${cols}`);

    const dots = [];

    function distance(x1, y1, x2, y2) {
        return Math.hypot(x2 - x1, y2 - y1);
    }

    function isValidDot(x, y) {
        return dots.every(dot => distance(dot.x, dot.y, x, y) >= MIN_DISTANCE);
    }

    function drawDots() {

    }

    function resizeCanvas() {
        canvasElement.width = window.innerWidth;
        canvasElement.height = window.innerHeight;
        canvasContext.clearRect(0, 0, canvasElement.width, canvasElement.height);
        drawDots();
    }
    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();
});