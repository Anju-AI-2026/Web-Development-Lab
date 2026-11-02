
const generateBtn = document.getElementById("generateBtn");
const colorBoxes = document.querySelectorAll(".color-box");
const colorCodes = document.querySelectorAll(".color-card p");

function generateColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";

    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }

    return color;
}

generateBtn.addEventListener("click", function () {

    colorBoxes.forEach(function (box, index) {
        const newColor = generateColor();

        box.style.backgroundColor = newColor;
        colorCodes[index].textContent = newColor;
    });

});
