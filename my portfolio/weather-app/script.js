// API Key - Sign up at openweathermap.org to get your own free API key
const API_KEY = '0ef825c3b8d8c42cda9f8233ee5b4751';

// DOM Elements
const cityInput = document.getElementById('city-input');
const searchBtn = document.getElementById('search-btn');
const cityName = document.getElementById('city-name');
const dateElement = document.getElementById('date');
const weatherIcon = document.getElementById('weather-icon');
const tempElement = document.getElementById('temp');
const weatherDesc = document.getElementById('weather-desc');
const windElement = document.getElementById('wind');
const humidityElement = document.getElementById('humidity');

// Weather icons mapping
const iconMap = {
    '01d': 'sunny.png',
    '01n': 'clear-night.png',
    '02d': 'partly-cloudy.png',
    '02n': 'partly-cloudy-night.png',
    '03d': 'cloudy.png',
    '03n': 'cloudy.png',
    '04d': 'broken-clouds.png',
    '04n': 'broken-clouds.png',
    '09d': 'rain.png',
    '09n': 'rain.png',
    '10d': 'rain.png',
    '10n': 'rain.png',
    '11d': 'thunderstorm.png',
    '11n': 'thunderstorm.png',
    '13d': 'snow.png',
    '13n': 'snow.png',
    '50d': 'mist.png',
    '50n': 'mist.png'
};

// Initialize with default city
fetchWeather('Delhi');

// Event Listeners
searchBtn.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if (city) {
        fetchWeather(city);
    }
});

cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const city = cityInput.value.trim();
        if (city) {
            fetchWeather(city);
        }
    }
});

// Fetch weather data from API
async function fetchWeather(city) {
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
        );
        
        if (!response.ok) {
            throw new Error('City not found');
        }
        
        const data = await response.json();
        updateWeatherUI(data);
    } catch (error) {
        alert(error.message);
        console.error('Error fetching weather data:', error);
    }
}

// Update UI with weather data
function updateWeatherUI(data) {
    // Update city name
    cityName.textContent = `${data.name}, ${data.sys.country}`;
    
    // Update date
    const now = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    dateElement.textContent = now.toLocaleDateString('en-US', options);
    
    // Update temperature and weather description
    const temp = Math.round(data.main.temp);
    tempElement.textContent = `${temp}°C`;
    weatherDesc.textContent = data.weather[0].description;
    
    // Update wind and humidity
    windElement.textContent = `${data.wind.speed} km/h`;
    humidityElement.textContent = `${data.main.humidity}%`;
    
    // Update weather icon
    const iconCode = data.weather[0].icon;
    weatherIcon.src = `assets/weather-icons/${iconMap[iconCode]}`;
    weatherIcon.alt = data.weather[0].main;
    
    // For demo purposes - in a real app you would fetch forecast data too
    updateForecastUI();
}

// Update forecast (mock data for demo)
function updateForecastUI() {
    // In a real app, you would fetch this from the API
    const forecastItems = document.querySelectorAll('.forecast-item');
    
    forecastItems[0].querySelector('p:last-child').textContent = '34°C / 28°C';
    forecastItems[1].querySelector('p:last-child').textContent = '30°C / 26°C';
    forecastItems[2].querySelector('p:last-child').textContent = '32°C / 27°C';
}