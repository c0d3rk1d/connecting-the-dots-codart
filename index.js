document.addEventListener("DOMContentLoaded", () => {
    const svgElement = document.getElementById("codart");
    svgElement.addEventListener("click", (event) => {
        svgElement.setAttribute("xmlns", "http://www.w3.org/2000/svg");
        const svgData = svgElement.outerHTML;
        const preface = '<?xml version="1.0" standalone="no"?>\r\n';
        const svgBlob = new Blob([preface, svgData], { type: "image/svg+xml;charset=utf-8" });
        const svgUrl = URL.createObjectURL(svgBlob);
        const downloadLink = document.createElement("a");
        downloadLink.href = svgUrl;
        downloadLink.download = `connecting-the-dots-codart-${new Date().toISOString().replace(/[:.]/g, "-")}.svg`;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    });
    const roughCanvas = rough.svg(svgElement);
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
                    color: colors[Math.floor(Math.random() * colors.length)],
                    roughness: Math.random() + 0.25,
                    link: []
                }
                if (isValidDot(dot)) {
                    dots.push(dot);
                }
            }
        }
    }
    for (let dot1 = 0; dot1 < dots.length; dot1++) {
        let minDistance = Infinity;
        let dotIndex = -1;
        for (let dot2 = dot1 + 1; dot2 < dots.length; dot2++) {
            if (
                !(dots[dot1].link || []).includes(dot2)
                && !(dots[dot2].link || []).includes(dot1)
            ) {
                const dist = dotDistance(dots[dot1], dots[dot2]);
                if (dist < minDistance) {
                    minDistance = dist;
                    dotIndex = dot2;
                }
            }
        }
        if (dotIndex !== -1) {
            dots[dot1].link = [...dots[dot1].link, dotIndex];
            dots[dotIndex].link = [...dots[dotIndex].link, dot1];
            lines.push([
                dots[dot1],
                dots[dotIndex],
                Math.random() + 0.25,
            ]);
        }
    }
    function draw() {
        const canvasElement = document.getElementById("codart");
        for (const line of lines) {
            const roughLine = roughCanvas.line(line[0].x, line[0].y, line[1].x, line[1].y, {
                roughness: line[2],
                stroke: "black",
                strokeWidth: 3
            });
            canvasElement.appendChild(roughLine);
        }
        for (const dot of dots) {
            const roughCircle = roughCanvas.circle(dot.x, dot.y, dot.r, {
                roughness: dot.roughness,
                fill: dot.color,
                fillStyle: "solid",
                stroke: "black",
                strokeWidth: 3
            });
            canvasElement.appendChild(roughCircle);
        }
    }
    function resizeCanvas() {
        svgElement.width = window.innerWidth;
        svgElement.height = window.innerHeight;
        draw();
    }
    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();
});