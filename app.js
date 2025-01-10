const rainImage = "./images/rain.png";
const snowImage = "./images/snow.png";
const sunnyImage = "./images/sunny.png";
const thunderImage = "./images/thunder.png";

window.onload = function () {
  const place = document.getElementById("place");
  //Mission1. 大阪府の天気を調べていることをサイト上で表示しよう
  
  
}
async function requestWeather() {
  let response = {};
  //Mission2. 経度と緯度で、大阪府の天気情報を指定しよう
  

  // APIリクエストURL
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&timezone=Asia/Tokyo`;

  // 天気コードに対応する天気の日本語表記
  const weatherDescriptions = {
    0: "晴れ",
    1: "晴れ",
    2: "晴れ",
    3: "晴れ",
    51: "雨", //霧雨は雨として定義
    53: "雨", //霧雨は雨として定義
    55: "雨", //霧雨は雨として定義
    56: "雨", //霧雨は雨として定義
    57: "雨", //霧雨は雨として定義
    58: "雨", //霧雨は雨として定義
    59: "雨", //霧雨は雨として定義
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

  // XMLHTTPリクエストの作成
  const xhr = new XMLHttpRequest();

  // リクエストの初期化
  xhr.open("GET", url, true);

  // Mission4. サーバーから情報を貰おう
  

  // リクエストのロードが完了したときの処理
  xhr.onload = async () => {
    const data = JSON.parse(xhr.responseText);
    // 今の天気情報を返す
    return data;
  };

  const weatherData = await new Promise((resolve) => {
    // 読み込まれた時に実行される処理
    xhr.onload = async () => {
      const data = JSON.parse(xhr.responseText);
      resolve(data);
    };
  });

  // 今の天気
  const weather = weatherData.current_weather;
  // 天気コード
  const weatherCode = weather.weathercode;
  // 風速
  const windSpeed = weather.windspeed;
  // 気温
  const temp = weather.temperature;

  //今の天気を天気コードから日本語に変換
  response.weather = weatherDescriptions[weatherCode];
  //今の気温
  response.temperature = temp;
  //今の風速
  response.windSpeed = windSpeed;

  return response;
}

async function init() {
  // APIリクエストを取得
  let result = await requestWeather();

  // HTML要素の取得
  const weatherText = document.getElementById("weather");
  const weatherImage = document.getElementById("weatherImage");
  const temperatureText = document.getElementById("temperature");
  const windSpeedText = document.getElementById("windSpeed");

  // APIリクエスト結果をHTMLに反映
  weatherText.textContent = result.weather;
  temperatureText.textContent = `気温: ${result.temperature}°C`;
  windSpeedText.textContent = `風速: ${result.windSpeed}m/s`;

  // Misson3. 天気によって表示する画像を変えよう
  switch (result.weather) {
    case "晴れ":
      weatherImage.setAttribute("src", );
      break;
    case "雨":
      weatherImage.setAttribute("src", );
      break;
    case "雪":
      weatherImage.setAttribute("src", );
      break;
    case "雷雨":
      weatherImage.setAttribute("src", );
      break;
  }

  // エラーハンドリング
  weatherImage.onerror = () => {
    console.error("Faild loading image");
  };
}

init();
