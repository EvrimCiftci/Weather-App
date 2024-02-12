// Selecting DOM elements
const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");

// API key for OpenWeatherMap
const apiKey = "4913c10390b230f4c4bdffde2118faf8";

// Event listener for form submission
weatherForm.addEventListener("submit", async event => {
  event.preventDefault(); // Prevent default form submission behavior
  const city = cityInput.value; // Get the value entered in the city input field

  // Check if a city is entered
  if (city) {
    try {
      // Call the function to get weather data for the entered city
      const weatherData = await getWeatherData(city);
      // Display weather information on the card
      displayWeatherInfo(weatherData);
    }
    catch (error) {
      console.error(error);
      // Display error message if there is an error fetching weather data
      displayError(error);
    }
  }
  else {
    // Display error message if no city is entered
    displayError("please enter a city");
  }
});

// Function to fetch weather data from OpenWeatherMap API
async function getWeatherData(city) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

  // Fetch weather data from the API
  const response = await fetch(apiUrl);

  // Check if response is not successful
  if (!response.ok) {
    throw new Error("could not fetch weather data");
  }
  return await response.json(); // Return weather data in JSON format
}

// Function to display weather information on the card
function displayWeatherInfo(data) {
  // Destructure data object to extract relevant information
  const { name: city,
    main: { temp, humidity },
    weather: [{ description, id }] } = data;

  // Clear card content and display it as a flex container
  card.textContent = "";
  card.style.display = "flex";

  // Create elements to display weather information
  const cityDisplay = document.createElement("h1");
  const tempDisplay = document.createElement("p");
  const humidityDisplay = document.createElement("p");
  const descDisplay = document.createElement("p");
  const weatherEmoji = document.createElement("p");

  // Set text content for each element
  cityDisplay.textContent = city;
  tempDisplay.textContent = `${(temp -273.1).toFixed(1)}°`;
  humidityDisplay.textContent = `Humidity:${humidity}%`
  descDisplay.textContent = `Description: ${description}`;
  weatherEmoji.textContent = getWeatherEmoji(id);

  // Add CSS classes to each element
  cityDisplay.classList.add("cityDisplay");
  tempDisplay.classList.add("tempDisplay");
  humidityDisplay.classList.add("humidityDisplay");
  descDisplay.classList.add("descDisplay");
  weatherEmoji.classList.add("weatherEmoji");

  // Append elements to the card
  card.appendChild(cityDisplay);
  card.appendChild(tempDisplay);
  card.appendChild(humidityDisplay);
  card.appendChild(descDisplay);
  card.appendChild(weatherEmoji);
}

// Function to get weather emoji based on weather ID
function getWeatherEmoji(weatherId) {
  // Use switch statement to determine weather emoji based on weather ID
  switch (true) {
    case (weatherId >= 200 && weatherId < 300):
      return "🌩️"; // Thunderstorm
    case (weatherId >= 300 && weatherId < 400):
        return "🌧️"; // drizzle
    case (weatherId >= 500 && weatherId < 600):
      return "🌧️"; // rain
    case (weatherId >= 600 && weatherId < 700):
      return "❄️"; // snow
    case (weatherId >= 700 && weatherId < 800):
      return "🌁"; // foggy
    case (weatherId === 800):
      return "☀️"; // sunny
    case (weatherId >= 801 && weatherId < 810):
        return "☁️"; // cloudy
    default:
      return "🤷‍♀️";// unknown
  }
}

// Function to display error message on the card
function displayError(message){
  // Create error message element
  const errorDisplay = document.createElement("p");
  errorDisplay.textContent = message;
  errorDisplay.classList.add("errorDisplay");

  // Clear card content and display it as a flex container
  card.textContent = "";
  card.style.display = "flex";

  // Append error message element to the card
  card.appendChild(errorDisplay);
}
