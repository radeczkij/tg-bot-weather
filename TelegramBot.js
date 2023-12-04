import dotenv from "dotenv";
import TelegramBot from "node-telegram-bot-api";
import { weatherThreeHours, weatherSixHours } from "./functions/getWeather.js";
import { getExchange } from "./functions/getCurrency.js";
dotenv.config();

const token = process.env.TOKEN;
const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, "Нажми на кнопку - получишь результат.", {
    reply_markup: {
      keyboard: [["Погода", "Курс валют"]],
    },
  });
});

// bot.onText(/\Меню/, (msg) => {
//   bot.sendMessage(msg.chat.id, "Нажми на кнопку - получишь результат.", {
//     reply_markup: {
//       keyboard: [["Погода", "Курс валют"]],
//     },
//   });
// });

bot.onText(/\Погода/, (msg) => {
  bot.sendMessage(msg.chat.id, "Нажми на кнопку - получишь результат.", {
    reply_markup: {
      keyboard: [["Каждые 3 часа"], ["Каждые 6 часов"], ["Меню"]],
    },
  });
});

bot.onText(/\Курс валют/, (msg) => {
  bot.sendMessage(msg.chat.id, "Нажми на кнопку - получишь результат.", {
    reply_markup: {
      keyboard: [["USD", "EUR"], ["Меню"]],
    },
  });
});

bot.on("message", async (msg) => {
  let id = msg.chat.id;
  switch (msg.text) {
    case "Каждые 3 часа":
      bot.sendMessage(id, await weatherThreeHours());
      break;
    case "Каждые 6 часов":
      bot.sendMessage(id, await weatherSixHours());
      break;
    case "USD":
      bot.sendMessage(id, await getExchange("USD"));
      break;
    case "EUR":
      bot.sendMessage(id, await getExchange("EUR"));
      break;
    case "Меню":
      bot.sendMessage(msg.chat.id, "Нажми на кнопку - получишь результат.", {
        reply_markup: {
          keyboard: [["Погода", "Курс валют"]],
        },
      });
  }
});
