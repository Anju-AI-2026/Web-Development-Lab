const form = document.getElementById("temperatureForm");
const temperatureInput = document.getElementById("temperatureInput");
const output = document.getElementById("output");

function convertToFahrenheit(celsius) {
    return (celsius * 9 / 5) + 32;
}

form.addEventListener("submit", function (event) {
    event.preventDefault();

    const celsius = Number(temperatureInput.value);
    const fahrenheit = convertToFahrenheit(celsius);

    output.textContent = `${celsius}°C is equal to ${fahrenheit}°F.`;
});