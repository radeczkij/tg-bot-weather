import TelegramBot from "node-telegram-bot-api";
import axios from "axios";

const token = "5414468954:AAH2iqtR0dXxTbqmv2nCZd5BsTVOUjqPlFw";
const bot = new TelegramBot(token, { polling: true });

const url =
  "https://api.openweathermap.org/data/2.5/forecast?lat=50.4333&lon=30.5167&lang=ru&units=metric&appid=8539d7cf991025fe6822aef580dbb964";

const getWeather = async () => {
  const {
    data: { list: weather },
  } = await axios.get(url);
  return weather;
};

const filterWeather = (rawWeather) => {
  const filtered = rawWeather.map((el) => {
    const weather = el.weather[0].description;
    return {
      weather,
      time: el.dt_txt,
    };
  });
  return filtered;
};

// bot.onText(async () => {
//   const rawWeather = await getWeather();
//   const result = filterWeather(rawWeather);

//   bot.sendMessage(msg.chat.id, toTextFormater(result));
// })();

const toTextFormater = (result) => {
  return result;
};

// (async () => {
//   const rawWeather = await getWeather();
//   const result = filterWeather(rawWeather);
// })();

bot.onText(/\/start/, (msg) => {
  bot.sendMessage(
    msg.chat.id,
    `Салют!\nНажми на /weather - получишь результат.`
  );
});

bot.onText(/\/weather/, (msg) => {
  bot.sendMessage(msg.chat.id, "Нажми на кнопку - получишь результат.", {
    reply_markup: {
      keyboard: [["Погода в Киеве", "Курс валют"]],
    },
  });
});

bot.on("message", (msg) => {
  if (msg.text == "Погода в Киеве") {
    bot.sendMessage(msg.chat.id, msg.text, {
      reply_markup: {
        inline_keyboard: [
          [{ text: "Погода в Киеве на 3 часа", callback_data: "3hours" }],
          [{ text: "Погода в Киеве на 6 часов", callback_data: "6hours" }],
        ],
      },
    });
  } else if (msg.text == "Курс валют") {
    bot.sendMessage(msg.chat.id, msg.text, {
      reply_markup: {
        inline_keyboard: [
          [{ text: "PrivatBank", callback_data: "privat" }],
          [{ text: "MonoBank", callback_data: "mono" }],
        ],
      },
    });
  }
});

// bot.onText(async (msg) => {
//   const rawWeather = await getWeather();
//   const result = filterWeather(rawWeather);
// });

// bot.on("message", async (msg, call) => {
//   const rawWeather = await getWeather();
//   const result = filterWeather(rawWeather);

//   if (msg.text === "Погода в Киеве на 3 часа") {
//     bot.sendMessage(msg.chat.id, result.join());
//     console.log(result);
//   }
// });

bot.on("callback_query", async (call) => {
  const rawWeather = await getWeather();
  const result = filterWeather(rawWeather);
  let id = call.message.chat.id;

  const toTextFormater = async (result) => {
    const elements = result.map((el) => {
      f
    })
  };

  switch (call.data) {
    case "3hours":
      bot.sendMessage(id, result.join());
      console.log(result);
      break;
    case "6hours":
      break;
    case "privat":
      privatExchange();
      break;
    case "mono":
      monoExchange();
      break;
  }
});
