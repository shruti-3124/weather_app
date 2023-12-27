const apiKey = '4e9acb57da757587adbea7dcb14ab543';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

let tempinfo = document.querySelector('.Temperature');
let locationinfo = document.querySelector('.location');
let humidityinfo = document.querySelector('.Humidity');
let searchbtn = document.querySelector('#searchtemp');
let search = document.querySelector('.form-control');
let windinfo=document.querySelector('.Wind');
let liketempinfo=document.querySelector('.Temperature_feel');
let Pressure=document.querySelector('.pressure');
let Visibility=document.querySelector('.visibility');;

// Function to convert Kelvin to Celsius
function kelvinToCelsius(kelvin) {
  return kelvin - 273.15;
}

// Function to get weather data
async function getWeather(city) {
  try {
    const response = await fetch(`${apiUrl}?q=${city}&appid=${apiKey}`);
    const data = await response.json();

    // Check if the API request was successful
    if (response.ok) {
      // Extract and use the relevant weather information from the 'data' object
      const temperatureKelvin = data.main.temp;
      const temperatureCelsius = kelvinToCelsius(temperatureKelvin);
      // Update your app's UI with the weather information
      tempinfo.innerText = `${temperatureCelsius.toFixed(2)}°C`;
      locationinfo.innerText = data.name;
      humidityinfo.innerText = ` ${data.main.humidity}%`;
      windinfo.innerText=data.wind.speed;
      liketempinfo.innerText=`${kelvinToCelsius(data.main.feels_like).toFixed(2)}°C`;
     Pressure.innerText=data.main.pressure;
     Visibility.innerText=` ${data.visibility}%`;



    } else {
      // Handle API error
      console.error(`Error: ${data.message}`);
    }
  } catch (error) {
    // Handle general errors (e.g., network issues)
    console.error('Error:', error.message);
  }
}

// Change the event listener to call getWeather when the button is clicked
searchbtn.addEventListener("click", () => {
  event.preventDefault(); // Prevents the default form submission behavior
  if (search.value !== '') {
    getWeather(search.value);
  } else {
      locationinfo.innerText = 'Please enter a city ';
  }
}
);
