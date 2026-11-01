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

// Common alternative spellings and local names
const cityAliases = {
    banglore: "Bengaluru",
    bangalore: "Bengaluru",
    bengaluru: "Bengaluru",
    hubli: "Hubballi",
    hubballi: "Hubballi",
    mysor: "Mysuru",
    mysore: "Mysuru",
    mysuru: "Mysuru",
    mangalore: "Mangaluru",
    mangaluru: "Mangaluru"
};

// Create the suggestions dropdown
const suggestionBox = document.createElement("div");
suggestionBox.className = "suggestions-box";
suggestionBox.id = "suggestions-box";
searchForm.appendChild(suggestionBox);

let searchTimeout;
let activeSuggestions = [];
let selectedLocation = null;

// Weather condition information
function getWeatherInfo(code) {
    const weatherTypes = {
        0: ["Clear sky", "☀️"],
        1: ["Mainly clear", "🌤️"],
        2: ["Partly cloudy", "⛅"],
        3: ["Overcast", "☁️"],
        45: ["Foggy", "🌫️"],
        48: ["Foggy", "🌫️"],
        51: ["Light drizzle", "🌦️"],
        53: ["Drizzle", "🌦️"],
        55: ["Heavy drizzle", "🌧️"],
        56: ["Freezing drizzle", "🌧️"],
        57: ["Heavy freezing drizzle", "🌧️"],
        61: ["Light rain", "🌦️"],
        63: ["Moderate rain", "🌧️"],
        65: ["Heavy rain", "🌧️"],
        66: ["Freezing rain", "🌧️"],
        67: ["Heavy freezing rain", "🌧️"],
        71: ["Light snowfall", "🌨️"],
        73: ["Snowfall", "❄️"],
        75: ["Heavy snowfall", "❄️"],
        77: ["Snow grains", "🌨️"],
        80: ["Rain showers", "🌦️"],
        81: ["Moderate showers", "🌧️"],
        82: ["Heavy showers", "⛈️"],
        85: ["Snow showers", "🌨️"],
        86: ["Heavy snow showers", "❄️"],
        95: ["Thunderstorm", "⛈️"],
        96: ["Thunderstorm with hail", "⛈️"],
        99: ["Heavy thunderstorm", "⛈️"]
    };

    return weatherTypes[code] || ["Weather unavailable", "🌤️"];
}

// Show error messages
function showError(message) {
    errorMessage.textContent = message;
    errorMessage.style.display = "block";
}

// Clear error messages
function clearError() {
    errorMessage.textContent = "";
    errorMessage.style.display = "none";
}

// Show or hide suggestions
function hideSuggestions() {
    suggestionBox.innerHTML = "";
    suggestionBox.style.display = "none";
    activeSuggestions = [];
}

// Search for matching locations
async function searchLocations(query) {
    const cleanedQuery = query.trim();

    if (cleanedQuery.length < 2) {
        hideSuggestions();
        return;
    }

    const correctedQuery =
        cityAliases[cleanedQuery.toLowerCase()] || cleanedQuery;

    try {
        const url =
            `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(correctedQuery)}&count=10&language=en&format=json`;

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("Location search failed.");
        }

        const data = await response.json();

        // Ignore an older response if the user has typed again
        if (cityInput.value.trim() !== query.trim()) {
            return;
        }

        activeSuggestions = data.results || [];
        displaySuggestions(activeSuggestions);

    } catch (error) {
        hideSuggestions();
        showError("Unable to search locations. Please check your internet connection.");
    }
}

// Display location suggestions
function displaySuggestions(locations) {
    suggestionBox.innerHTML = "";

    if (locations.length === 0) {
        suggestionBox.innerHTML =
            `<p class="no-suggestions">No matching places found. Try another spelling.</p>`;

        suggestionBox.style.display = "block";
        return;
    }

    locations.forEach((location) => {
        const suggestion = document.createElement("button");

        suggestion.type = "button";
        suggestion.className = "suggestion-item";

        const place = document.createElement("span");
        place.className = "suggestion-city";
        place.textContent = location.name;

        const details = document.createElement("span");
        details.className = "suggestion-details";

        details.textContent = [
            location.admin1,
            location.country
        ].filter(Boolean).join(", ");

        suggestion.appendChild(place);
        suggestion.appendChild(details);

        suggestion.addEventListener("click", () => {
            selectedLocation = location;
            cityInput.value = location.name;
            hideSuggestions();
            getWeather(location);
        });

        suggestionBox.appendChild(suggestion);
    });

    suggestionBox.style.display = "block";
}

// Get weather for the selected location
async function getWeather(location) {
    clearError();

    searchButton.disabled = true;
    searchButton.textContent = "Loading...";

    try {
        const url =
            `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto&forecast_days=5`;

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("Weather information could not be loaded.");
        }

        const data = await response.json();

        displayCurrentWeather(location, data);
        displayForecast(data);

    } catch (error) {
        showError("Couldn't load weather information. Please try again.");
    } finally {
        searchButton.disabled = false;
        searchButton.textContent = "Explore ✨";
    }
}

// Display current weather
function displayCurrentWeather(location, data) {
    const current = data.current;
    const [description, icon] = getWeatherInfo(current.weather_code);

    cityName.textContent = location.name;

    const locationDetails = [
        location.admin1,
        location.country
    ].filter(Boolean).join(", ");

    if (locationDetails) {
        cityName.textContent += `, ${locationDetails}`;
    }

    currentDate.textContent = new Date().toLocaleDateString("en-IN", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric"
    });

    weatherIcon.textContent = icon;
    temperature.textContent = `${Math.round(current.temperature_2m)}°C`;
    weatherDescription.textContent = description;

    feelsLike.textContent =
        `${Math.round(current.apparent_temperature)}°C`;

    detailFeelsLike.textContent =
        `${Math.round(current.apparent_temperature)}°C`;

    humidity.textContent =
        `${current.relative_humidity_2m}%`;

    windSpeed.textContent =
        `${current.wind_speed_10m} km/h`;
}

// Display five-day forecast
function displayForecast(data) {
    forecastContainer.innerHTML = "";

    const daily = data.daily;

    daily.time.forEach((date, index) => {
        const [description, icon] =
            getWeatherInfo(daily.weather_code[index]);

        const forecastCard = document.createElement("div");
        forecastCard.className = "forecast-card";

        const dayName = new Date(`${date}T00:00:00`)
            .toLocaleDateString("en-IN", {
                weekday: "short"
            });

        forecastCard.innerHTML = `
            <h4>${index === 0 ? "Today" : dayName}</h4>
            <div class="forecast-icon">${icon}</div>
            <div>
                <p>${description}</p>
                <div class="forecast-temperatures">
                    <span>${Math.round(daily.temperature_2m_max[index])}°</span>
                    <span>${Math.round(daily.temperature_2m_min[index])}°</span>
                </div>
            </div>
        `;

        forecastContainer.appendChild(forecastCard);
    });
}

// Search when the form is submitted
searchForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const query = cityInput.value.trim();

    if (!query) {
        showError("Please enter a city name first.");
        return;
    }

    const matchingLocation = activeSuggestions.find(
        location =>
            location.name.toLowerCase() === query.toLowerCase()
    );

    if (selectedLocation && selectedLocation.name.toLowerCase() === query.toLowerCase()) {
        getWeather(selectedLocation);
    } else if (matchingLocation) {
        selectedLocation = matchingLocation;
        hideSuggestions();
        getWeather(matchingLocation);
    } else {
        searchLocations(query);
        showError("Please choose a location from the suggestions.");
    }
});

// Show suggestions while typing
cityInput.addEventListener("input", () => {
    clearTimeout(searchTimeout);
    clearError();
    selectedLocation = null;

    const query = cityInput.value.trim();

    if (query.length < 2) {
        hideSuggestions();
        return;
    }

    searchTimeout = setTimeout(() => {
        searchLocations(query);
    }, 350);
});

// Hide suggestions when clicking outside
document.addEventListener("click", (event) => {
    if (
        !searchForm.contains(event.target) &&
        !suggestionBox.contains(event.target)
    ) {
        hideSuggestions();
    }
});

// Load a default location when the website opens
getWeather({
    name: "Hubballi",
    admin1: "Karnataka",
    country: "India",
    latitude: 15.4589,
    longitude: 75.0078
});