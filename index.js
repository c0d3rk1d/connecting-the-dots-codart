
document.addEventListener("DOMContentLoaded", () => {
    const canvasElement = document.getElementById("codart");
    const canvasContext = canvasElement.getContext("2d");
    const roughCanvas = rough.canvas(canvasElement);
    const colors = ['#ff4d4d', '#ff944d', '#ffe24d', '#c3ff4d', '#4dff88', '#4dffff', '#4da6ff', '#b84dff', '#ff4df2'];
    const dotCount = 100;
    const dotSizeMin = 20;
    const dotSizeMax = 25;
    const dotDistanceMin = 50;
    const blockDotCount = 4;
    const blockSize = (dotSizeMax + dotDistanceMin) * (blockDotCount / 2);
    const blockRows = Math.ceil(window.innerHeight / blockSize);
    const blockCols = Math.ceil(window.innerWidth / blockSize);
    console.log(`Rows: ${blockRows}, Cols: ${blockCols}`);
    console.log(`Block size: ${blockSize}`);

    const dots = [];

    function dotDistance(dot1, dot2) {
        return Math.max(0, Math.hypot(dot2.x - dot1.x, dot2.y - dot1.y) - (dot1.r + dot2.r));
    }

    function isValidDot(x, y) {
        return dots.every(dot => dotDistance(dot.x, dot.y, x, y) >= MIN_DISTANCE);
    }

    for (let row = 0; row < blockRows; row++) {
        for (let column = 0; column < blockCols; column++) {
            for (let count = 0; count < blockDotCount; i++) {

        }
    }
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