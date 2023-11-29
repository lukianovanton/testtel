const TelegramBot = require('node-telegram-bot-api');

const token = '6549115067:AAGt-KBHXD-fyfFZsn4km6-rx2vg6Z_sYWc';
const bot = new TelegramBot(token, { polling: true });

// Объект для хранения длины карандаша каждого участника
let pencilLengths = {};

bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  const userId = msg.from.id;
  const userName = msg.from.username || msg.from.first_name;
  const text = msg.text.toLowerCase();

  if (text.includes('привіт')) {
    // Уменьшаем длину карандаша на 2
    if (!pencilLengths[userId]) {
        pencilLengths[userId] = { length: 14, name: userName };
    } else {
        pencilLengths[userId].length -= 1;
    }
    // Выводим индивидуальную статистику
    if (pencilLengths[userId].length === 12) {
      bot.sendMessage(chatId, `Привіт, @${userName}! \nДовжину вашого пенсила зменшено на 1 см. \nЗараз його довжина: ${pencilLengths[userId].length} см \nЦе хороший пенсил, але не відмінний. Ви можете зробити краще!`);  
    }
    else if (pencilLengths[userId].length === 9) {
      bot.sendMessage(chatId, `Привіт, @${userName}! \nДовжину вашого пенсила зменшено на 1 см. \nЗараз його довжина: ${pencilLengths[userId].length} см \nЦе середній пенсил, але не поганий. Ви можете використовувати його для роботи в шахті.`);  
    }
    else if (pencilLengths[userId].length === 6) {
      bot.sendMessage(chatId, `Привіт, @${userName}! \nДовжину вашого пенсила зменшено на 1 см. \nЗараз його довжина: ${pencilLengths[userId].length} см \nЦе малий пенсил, але не безглуздий. Ви можете використовувати його для виготовлення зубної пасти.`);  
    }
    else if (pencilLengths[userId].length === 3) {
      bot.sendMessage(chatId, `Привіт, @${userName}! \nДовжину вашого пенсила зменшено на 1 см. \nЗараз його довжина: ${pencilLengths[userId].length} см \nЦе дуже малий пенсил, але не мікроскопічний. Ви можете використовувати його для постачання зброї в Ірак.`);  
    }
    else if (pencilLengths[userId].length < -1) {
      bot.sendMessage(chatId, `Привіт, @${userName}! \nДовжину вашого пенсила зменшено на 1 см. \nЗараз його довжина: ${pencilLengths[userId].length} см \nВаш пенсил на від'ємному етапі. Тепер вас звуть Маргарита.`);  
    }
    else if (pencilLengths[userId].length > 0) {
      bot.sendMessage(chatId, `Привіт, @${userName}! \nДовжину вашого пенсила зменшено на 1 см. \nЗараз його довжина: ${pencilLengths[userId].length} см \nВітаю!`);  
    }
    else {
      bot.sendMessage(chatId, `Привіт, @${userName}! \nДовжину вашого пенсила зменшено на 1 см. \nЗараз його довжина: ${pencilLengths[userId].length} см \nЦе не пенсил, це пил! Ви його втратили чи з'їли?`);  
    }
  }
  if (text.includes('милупа')) {
    // Выводим общую статистику для всех участников
    console.log(pencilLengths)
    const summary = Object.entries(pencilLengths)
      .map(([id, object]) => `@${id === bot.options.username ? 'Bot' : object.length < -1 ? 'Маргарита' : object.name}: ${object.length} см`)
      .join('\n');

    bot.sendMessage(chatId, `Довжина пенселів учасників:\n\n${summary}`);
  }
});
