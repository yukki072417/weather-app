const rainImage = "./images/rain.png";
const snowImage = "./images/snow.png";
const sunnyImage = "./images/sunny.png";
const thunderImage = "./images/thunder.png";

window.onload = function () {
  const place = document.getElementById("place");
  place.innerHTML = "大阪/大阪市"; 
}
async function requestWeather() {
  let response = {};

  // This longitude and latitude are the location of Osaka.
  const longitude = 135.519318;
  const latitude =  34.687008; 
  let url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&timezone=Asia/Tokyo`;

  // Defining descriptions to respond to weather code.
  const weatherDescriptions = {
    0: "晴れ",
    1: "晴れ",
    2: "晴れ",
    3: "晴れ",
    51: "雨", //Drizzle rain so defined as rain
    53: "雨", //Drizzle rain so defined as rain
    55: "雨", //Drizzle rain so defined as rain
    56: "雨", //Drizzle rain so defined as rain
    57: "雨", //Drizzle rain so defined as rain
    58: "雨", //Drizzle rain so defined as rain
    59: "雨", //Drizzle rain so defined as rain
    61: "雨",
    63: "雨",
    65: "雨",
    71: "雪",
    73: "雪",
    75: "雪",
    95: "雷雨",
    96: "雷雨",
    99: "雷雨",
  };

  // Request to using XHLHttpRequst.
  const xhr = new XMLHttpRequest();

  // Setting request mode.
  xhr.open("GET", url, true);

  // Sending request.
  xhr.send();

  //Executing when return response.
  xhr.onload = async () => {
    const data = JSON.parse(xhr.responseText);
    // return current weather informations.
    return data;
  };

  const weatherData = await new Promise((resolve) => {
    // Returning value to weatherData when on loaded.
    xhr.onload = async () => {
      // Convert string to json.
      const data = JSON.parse(xhr.responseText);
      resolve(data);
    };
  });

  // Getting current weather informations.
  const weather = weatherData.current_weather;

  // Defining weather code.
  const weatherCode = weather.weathercode;

  // Defining current wind speed.
  const windSpeed = weather.windspeed;

  // Defining current temperature.
  const temp = weather.temperature;

  // Their variables defining response result from API.
  // current weather.
  response.weather = weatherDescriptions[weatherCode];

  //current temperature.
  response.temperature = temp;

  //current wind speed.
  response.windSpeed = windSpeed;

  return response;
}

async function init() {
  // Get API request.
  let result = await requestWeather();

  // Get element from html.
  const weatherText = document.getElementById("weather");
  const weatherImage = document.getElementById("weatherImage");
  const temperatureText = document.getElementById("temperature");
  const windSpeedText = document.getElementById("windSpeed");

  // Show API request result
  weatherText.textContent = result.weather;
  temperatureText.textContent = `気温: ${result.temperature}°C`;
  windSpeedText.textContent = `風速: ${result.windSpeed}m/s`;

  // Switch by API request result
  switch (result.weather) {
    case "晴れ":
      weatherImage.setAttribute("src", sunnyImage);
      break;
    case "雨":
      weatherImage.setAttribute("src", rainImage);
      break;
    case "雪":
      weatherImage.setAttribute("src", snowImage);
      break;
    case "雷雨":
      weatherImage.setAttribute("src", thunderImage);
      break;
  }

  // Error Handling
  weatherImage.onerror = () => {
    console.error("Faild loading image");
  };
}

init();
