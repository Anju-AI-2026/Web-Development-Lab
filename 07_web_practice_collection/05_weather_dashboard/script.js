// DOM Elements

const searchForm = document.getElementById("search-form");
const cityInput = document.getElementById("city-input");
const searchButton = document.getElementById("search-btn");
const errorMessage = document.getElementById("error-message");

const cityName = document.getElementById("city-name");
const currentDate = document.getElementById("current-date");
const weatherIcon = document.getElementById("weather-icon");
const temperature = document.getElementById("temperature");
const weatherDescription = document.getElementById("weather-description");
const feelsLike = document.getElementById("feels-like");
const humidity = document.getElementById("humidity");
const windSpeed = document.getElementById("wind-speed");
const detailFeelsLike = document.getElementById("detail-feels-like");

const forecastContainer = document.getElementById("forecast-container");


// Weather Condition Mapping

function getWeatherInfo(code, isDay = 1) {

    const weatherConditions = {
        0: ["Clear sky", isDay ? "☀️" : "🌙"],
        1: ["Mainly clear", isDay ? "🌤️" : "🌙"],
        2: ["Partly cloudy", "⛅"],
        3: ["Overcast", "☁️"],
        45: ["Foggy", "🌫️"],
        48: ["Depositing rime fog", "🌫️"],
        51: ["Light drizzle", "🌦️"],
        53: ["Moderate drizzle", "🌦️"],
        55: ["Dense drizzle", "🌧️"],
        56: ["Light freezing drizzle", "🌧️"],
        57: ["Dense freezing drizzle", "🌧️"],
        61: ["Slight rain", "🌦️"],
        63: ["Moderate rain", "🌧️"],
        65: ["Heavy rain", "🌧️"],
        66: ["Light freezing rain", "🌧️"],
        67: ["Heavy freezing rain", "🌧️"],
        71: ["Slight snowfall", "🌨️"],
        73: ["Moderate snowfall", "❄️"],
        75: ["Heavy snowfall", "❄️"],
        77: ["Snow grains", "❄️"],
        80: ["Slight rain showers", "🌦️"],
        81: ["Moderate rain showers", "🌧️"],
        82: ["Violent rain showers", "⛈️"],
        85: ["Slight snow showers", "🌨️"],
        86: ["Heavy snow showers", "❄️"],
        95: ["Thunderstorm", "⛈️"],
        96: ["Thunderstorm with hail", "⛈️"],
        99: ["Thunderstorm with heavy hail", "⛈️"]
    };

    return weatherConditions[code] || ["Unknown weather", "🌡️"];
}


// Format Date

function formatDate(dateString) {

    const date = new Date(dateString + "T12:00:00");

    return date.toLocaleDateString("en-US", {
        weekday: "long",
        day: "numeric",
        month: "long"
    });
}


// Get City Coordinates

async function getCityCoordinates(city) {

    const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`;

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error("Unable to search for the city.");
    }

    const data = await response.json();

    if (!data.results || data.results.length === 0) {
        throw new Error("City not found. Please check the spelling.");
    }

    return data.results[0];
}


// Get Weather Data

async function getWeatherData(latitude, longitude) {

    const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto&forecast_days=5`;

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error("Unable to fetch weather information.");
    }

    return await response.json();
}


// Display Current Weather

function displayCurrentWeather(city, data) {

    const current = data.current;

    const [description, icon] = getWeatherInfo(
        current.weather_code,
        current.is_day
    );

    cityName.textContent = `${city.name}, ${city.country}`;
    currentDate.textContent = formatDate(current.time.split("T")[0]);

    weatherIcon.textContent = icon;

    temperature.textContent = `${Math.round(current.temperature_2m)}°`;

    weatherDescription.textContent = description;

    feelsLike.textContent =
        `Feels like ${Math.round(current.apparent_temperature)}°`;

    humidity.textContent = `${current.relative_humidity_2m}%`;

    windSpeed.textContent = `${Math.round(current.wind_speed_10m)} km/h`;

    detailFeelsLike.textContent =
        `${Math.round(current.apparent_temperature)}°`;
}


// Display Five-Day Forecast

function displayForecast(data) {

    forecastContainer.innerHTML = "";

    const daily = data.daily;

    daily.time.forEach((date, index) => {

        const [description, icon] = getWeatherInfo(
            daily.weather_code[index]
        );

        const forecastCard = document.createElement("div");

        forecastCard.className = "forecast-card";

        forecastCard.innerHTML = `
            <h4>${formatDate(date).split(",")[0]}</h4>

            <div class="forecast-icon">${icon}</div>

            <p>${description}</p>

            <div class="forecast-temperatures">
                <strong>${Math.round(daily.temperature_2m_max[index])}°</strong>
                <span>${Math.round(daily.temperature_2m_min[index])}°</span>
            </div>
        `;

        forecastContainer.appendChild(forecastCard);

    });

}


// Search Weather

async function searchWeather(city) {

    errorMessage.textContent = "";

    searchButton.disabled = true;
    searchButton.textContent = "Searching...";

    try {

        const location = await getCityCoordinates(city);

        const weatherData = await getWeatherData(
            location.latitude,
            location.longitude
        );

        displayCurrentWeather(location, weatherData);

        displayForecast(weatherData);

    } catch (error) {

        errorMessage.textContent = error.message;

    } finally {

        searchButton.disabled = false;
        searchButton.textContent = "Search";

    }

}


// Form Submission

searchForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const city = cityInput.value.trim();

    if (city === "") {
        errorMessage.textContent = "Please enter a city name.";
        return;
    }

    searchWeather(city);

});


// Initial Weather

searchWeather("Hubli");