document.addEventListener("DOMContentLoaded", () => {
    const canvasElement = document.getElementById("codart");
    const canvasContext = canvasElement.getContext("2d");
    const roughCanvas = rough.canvas(canvasElement);
    const colors = ["#ff4d4d", "#ff944d", "#ffe24d", "#c3ff4d", "#4dff88", "#4dffff", "#4da6ff", "#b84dff", "#ff4df2"];
    const dotSizeMin = 15;
    const dotSizeMax = 35;
    const dotDistanceMin = 5;
    const blockDotCount = 4;
    const blockSize = (dotSizeMax + dotDistanceMin) * (blockDotCount / 2);
    const blockRows = Math.ceil(window.innerHeight / blockSize);
    const blockCols = Math.ceil(window.innerWidth / blockSize);
    const dots = [];
    const lines = [];

    function dotDistance(dot1, dot2) {
        return Math.floor(Math.max(0, Math.hypot(dot2.x - dot1.x, dot2.y - dot1.y) - (dot1.r + dot2.r)));
    }

    function isValidDot(dot) {
        return dots.every(element => dotDistance(element, dot) >= dotDistanceMin);
    }

    function randomBetween(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    }

    for (let row = 0; row <= blockRows; row++) {
        for (let column = 0; column <= blockCols; column++) {
            for (let count = 0; count < blockDotCount; count++) {
                const dot = {
                    x: randomBetween(column * blockSize, (column + 1) * blockSize - dotSizeMax),
                    y: randomBetween(row * blockSize, (row + 1) * blockSize - dotSizeMax),
                    r: randomBetween(dotSizeMin, dotSizeMax),
                    color: colors[Math.floor(Math.random() * colors.length)]
                }
                if (isValidDot(dot)) {
                    dots.push(dot);
                }
            }
        }
    }

    for (let i = 0; i < dots.length; i++) {
        let closestDot = null;
        let minDistance = Infinity;
        for (let j = 0; j < dots.length; j++) {
            if (dots[j].y > dots[i].y || dots[j].x > dots[i].x) {
                const dist = dotDistance(dots[i], dots[j]);
                if (dist < minDistance) {
                    minDistance = dist;
                    closestDot = dots[j];
                }
            }
        }
        if (closestDot) {
            lines.push({
                from: dots[i],
                to: closestDot
            });
        }
    }

    function draw() {
        for (const line of lines) {
            roughCanvas.line(line.from.x, line.from.y, line.to.x, line.to.y, {
                roughness: Math.random() + 0.25,
                stroke: "black",
                strokeWidth: 3
            });
        }
        for (const dot of dots) {
            roughCanvas.circle(dot.x, dot.y, dot.r, {
                roughness: Math.random(),
                fill: dot.color,
                fillStyle: "solid",
                stroke: "black",
                strokeWidth: 3
            });
        }
    }
    function resizeCanvas() {
        canvasElement.width = window.innerWidth;
        canvasElement.height = window.innerHeight;
        canvasContext.clearRect(0, 0, canvasElement.width, canvasElement.height);
        draw();
    }
    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();
});