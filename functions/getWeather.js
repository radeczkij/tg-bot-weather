import axios from "axios";

const weatherUrl =
  "https://api.openweathermap.org/data/2.5/forecast?lat=50.4333&lon=30.5167&lang=ru&units=metric&appid=8539d7cf991025fe6822aef580dbb964";

const getWeather = async () => {
  const {
    data: { list: weather },
  } = await axios.get(weatherUrl);
  return weather;
};

const filterWeather = (rawWeather) => {
  const filtered = rawWeather.map((el) => {
    const weather = el.weather[0].description;
    return {
      weather,
      time: el.dt_txt,
      temp: el.main.temp,
      feels_like: el.main.feels_like,
    };
  });
  return filtered;
};

const weatherThreeHours = async (msg) => {
  const rawWeather = await getWeather();
  const result = filterWeather(rawWeather);

  const resMap = result.map((el, index) => {
    const date = el.time.split(" ").slice(0, 1);
    const time = el.time.split(" ").slice(1);
    const weather = el.weather;
    const temp = el.temp;
    const feelsLike = el.feels_like;

    const data = time.map((el) => {
      const times = el.replace(":00:00", ":00");
      return times;
    });
    return `Дата: ${date} \nВремя: ${data} \nПогода: ${weather} \nТемпература: ${Math.round(
      temp
    )}°C, Ощущается как: ${Math.round(feelsLike)}°C \n`;
  });
  const data = resMap.join("\n");

  return data;
};

const weatherSixHours = async (msg) => {
  const rawWeather = await getWeather();
  const result = filterWeather(rawWeather);

  const resMap = result.map((el, index) => {
    const date = el.time.split(" ").slice(0, 1);
    const time = el.time.split(" ").slice(1);
    const weather = el.weather;
    const temp = el.temp;
    const feelsLike = el.feels_like;

    const times = time.map((el) => {
      const times = el.replace(":00:00", ":00");
      return times;
    });

    const data = times.map((el) => {
      if (
        el === "00:00" ||
        el === "06:00" ||
        el === "12:00" ||
        el === "18:00"
      ) {
        return `Дата: ${date} \nВремя: ${times} \nПогода: ${weather} \nТемпература: ${Math.round(
          temp
        )}°C, Ощущается как: ${Math.round(feelsLike)}°C \n`;
      }
    });
    return data;
  });
  const data = resMap.join("\n");

  return data;
};

export { weatherThreeHours, weatherSixHours };
