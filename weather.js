const apiKey = 'YOUR_API_KEY_HERE';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

let tempinfo = document.querySelector('.Temperature');
let locationinfo = document.querySelector('.location');
let humidityinfo = document.querySelector('.Humidity');
let searchBtn = document.querySelector('#searchBtn');
let cityInput = document.querySelector('#cityInput');
let windinfo = document.querySelector('.Wind');
let liketempinfo = document.querySelector('.Temperature_feel');
let pressure = document.querySelector('.pressure');
let visibility = document.querySelector('.visibility');
let sunriseInfo = document.querySelector('.sunrise');
let sunsetInfo = document.querySelector('.sunset');
let description= document.querySelector('#description');
let windDirectionInfo = document.querySelector('.wind-direction');
let maxTempInfo = document.querySelector('.max-temp');
let minTempInfo = document.querySelector('.min-temp');
let weatherImg1 = document.getElementById('weatherImg1');
let weatherImg2 = document.getElementById('weatherImg2');
let weatherImg3 = document.getElementById('weatherImg3');

// Function to convert Kelvin to Celsius
function kelvinToCelsius(kelvin) {
  return kelvin - 273.15;
}

// Function to convert Unix timestamp to HH:MM format
function unixTimestampToTime(timestamp) {
  const date = new Date(timestamp * 1000);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  return `${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
}

// Function to get weather data
async function getWeather(city) {
  try {
    const response = await fetch(`${apiUrl}?q=${city}&appid=${apiKey}`);
    const data = await response.json();
    console.log(data);
    // Check if the API request was successful
    if (response.ok) {
      // Extract and use the relevant weather information from the 'data' object
      const temperatureKelvin = data.main.temp;
      const temperatureCelsius = kelvinToCelsius(temperatureKelvin);

      // Update UI with weather information
      tempinfo.innerText = `${temperatureCelsius.toFixed(2)}°C`;
      locationinfo.innerText = `${data.name}, ${data.sys.country}`;
      humidityinfo.innerText = `Humidity: ${data.main.humidity}%`;
      windinfo.innerText = `Wind Speed: ${data.wind.speed} m/s`;
      liketempinfo.innerText = `Feels Like: ${kelvinToCelsius(data.main.feels_like).toFixed(2)}°C`;
      pressure.innerText = `Pressure: ${data.main.pressure} hPa`;
      visibility.innerText = `Visibility: ${data.visibility} meters`;
      sunriseInfo.innerText = `Sunrise: ${unixTimestampToTime(data.sys.sunrise)}`;
      sunsetInfo.innerText = `Sunset: ${unixTimestampToTime(data.sys.sunset)}`;
      windDirectionInfo.innerText = `Wind Direction: ${data.wind.deg}°`; // You can convert this to a more readable format if needed
      maxTempInfo.innerText = `Max Temp: ${kelvinToCelsius(data.main.temp_max).toFixed(2)}°C`;
      minTempInfo.innerText = `Min Temp: ${kelvinToCelsius(data.main.temp_min).toFixed(2)}°C`;
      description.innerText=data.weather[0].main;
      // Update weather images based on weather condition
      updateWeatherImages(data.weather[0].main);

    } else {
      // Handle API error
      description.innerText=data.message 
      console.error(`Error: ${data.message}`);
    }
  } catch (error) {
    // Handle general errors (e.g., network issues)
    console.error('Error:', error.message);
  }
}

// Function to update weather images based on weather condition
function updateWeatherImages(weatherCondition) {
  switch (weatherCondition.toLowerCase()) {
    case 'clouds':
      weatherImg1.src = 'https://tse2.mm.bing.net/th?id=OIP.8NkW_L1ZjAXhrzLHIq7NqwHaEo&pid=Api&P=0&h=180'; // Replace with appropriate image URL
      weatherImg2.src = 'https://tse1.explicit.bing.net/th?id=OIP.1ujbDCgXhuukmIzFYeQxXwHaFj&pid=Api&P=0&w=300&h=300';
    
      break;
    case 'rain':
      weatherImg1.src = 'https://tse3.explicit.bing.net/th?id=OIP.V5Wl7SWAjejL2j1VxjVs-gHaE7&pid=Api&P=0&h=180'; // Replace with appropriate image URL
      weatherImg2.src = 'https://tse1.mm.bing.net/th?id=OIP.a6NJ8XKZ4PxKeAPOZ7Ps5wHaE8&pid=Api&P=0&h=180';
      // weatherImg3.src = 'https://example.com/rain.jpg';
      break;
    case 'mist':
      weatherImg1.src = 'https://tse1.mm.bing.net/th?id=OIP.S_e3lhqk9TeBqxC8rU9pswHaFG&pid=Api&P=0&h=180'; // Replace with appropriate image URL
      weatherImg2.src = 'https://tse1.mm.bing.net/th?id=OIP.9-7BoEXYOXWM_NIF_ELWlQHaFj&pid=Api&P=0&h=180';
      // weatherImg3.src = 'https://example.com/clouds.jpg';
      break;
    // Add more cases as needed for other weather conditions
    default:
      weatherImg1.src = 'https://tse1.mm.bing.net/th?id=OIP.S_e3lhqk9TeBqxC8rU9pswHaFG&pid=Api&P=0&h=180'; // Replace with appropriate image URL
      weatherImg2.src = 'http://images.unsplash.com/photo-1616249807402-9dae436108cf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMjA3fDB8MXxzZWFyY2h8M3x8Y2xlYXIlMjB3ZWF0aGVyfHwwfHx8fDE2Mjg5MzA4NTE&ixlib=rb-1.2.1&q=80&w=1080';
      weatherImg3.src = 'https://tse1.mm.bing.net/th?id=OIP.Wi99qJxw4ziLm4KP9o8jXwHaE0&pid=Api&P=0&h=180';
      break;
  }
}

// Event listener for search button
searchBtn.addEventListener('click', (event) => {
  event.preventDefault(); // Prevent form submission
  const city = cityInput.value.trim();
  if (city !== '') {
    getWeather(city);
  } else {
    locationinfo.innerText = 'Please enter a city';
  }
});
