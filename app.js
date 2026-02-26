const API_KEY = "f18ea8a59fc8749d5dce59a1a838ff57";
const API_URL = 'https://api.openweathermap.org/data/2.5/weather';

// Function to fetch weather data
async function getWeather(city) {
    showLoading();

    // Disable search button while loading
    searchBtn.disabled = true;
    searchBtn.textContent = 'Searching...';

    const url = `${API_URL}?q=${city}&appid=${API_KEY}&units=metric`;

    try {
        const response = await axios.get(url);
        displayWeather(response.data);

    } catch (error) {
        console.error('Error:', error);

        if (error.response && error.response.status === 404) {
            showError('City not found. Please check the spelling and try again.');
        } else {
            showError('Something went wrong. Please try again later.');
        }

    } finally {
        // Re-enable button after request finishes
        searchBtn.disabled = false;
        searchBtn.textContent = 'Search';
    }
}

// Function to display weather data
function displayWeather(data) {
    // Extract the data we need
    const cityName = data.name;
    const temperature = Math.round(data.main.temp);
    const description = data.weather[0].description;
    const icon = data.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;
    
    // Create HTML to display
    const weatherHTML = `
        <div class="weather-info">
            <h2 class="city-name">${cityName}</h2>
            <img src="${iconUrl}" alt="${description}" class="weather-icon">
            <div class="temperature">${temperature}°C</div>
            <p class="description">${description}</p>
        </div>
    `;
    
    // Put it on the page
    document.getElementById('weather-display').innerHTML = weatherHTML;
    cityInput.focus();
}

// Call the function when page loads
 document.getElementById('weather-display').innerHTML = `
    <div class="welcome-message">
        Enter a city name!
    </div>
`;// You can change this to any city you like
// Get references to HTML elements
const searchBtn = document.getElementById('search-btn');
const cityInput = document.getElementById('city-input');

// Add click event listener to search button
searchBtn.addEventListener('click', function() {
    const city = cityInput.value.trim();
    if (city) {
        getWeather(city);
    } else {
        alert('Please enter a city name.');
    }
});
function handleSearch() {
const city = cityInput.value.trim();

if (!city) {
showError('Please enter a city name.');
cityInput.focus();
return;
}

if (city.length < 2) {
showError('City name too short.');
cityInput.focus();
return;
}

getWeather(city);
cityInput.value = '';
}
// BONUS: Add enter key support
cityInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        const city = cityInput.value.trim();
        if (city) {
            getWeather(city);
        } else {
            alert('Please enter a city name.');
        }
    }
});
// Create showLoading function
function showLoading() {
    // Create loading HTML
    const loadingHTML = `
        <div class="loading-message">
            <div class="spinner"></div>
            <span>Loading weather data...</span>
        </div>
    `;

    // Display in #weather-display div
    document.getElementById('weather-display').innerHTML = loadingHTML;
}