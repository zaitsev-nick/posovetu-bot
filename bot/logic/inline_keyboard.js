const secondMenu = [
  [{ text: 'Случайный выбор 🎲', callback_data: 'bones' }],
  [{ text: 'Жанры 🎭', callback_data: 'ganre' }],
  [{ text: 'Актеры 🕵️‍♀️', callback_data: 'actor' }],
  [{ text: 'Экранизации 📚', callback_data: 'from_book' }], 
  [{ text: 'Основано на реальных событиях 📰', callback_data: 'real' }],
  [{ text: 'Фильм для ... 💬', callback_data: 'for' }],
  [{ text: 'Кино про ... 💬', callback_data: 'about' }],
  [{ text: 'Советское кино 📺', callback_data: 'ussr' }],
  [{ text: 'Аниме', callback_data: 'anime' }],
];

const testButtons = [
  [
    { text: 'Дон', callback_data: 'Дон Кихот' },
    { text: 'Дюма', callback_data: 'Дюма' },
    { text: 'Гюго', callback_data: 'Гюго' },
    { text: 'Роб', callback_data: 'Робеспьер' },
  ],
  [
    {
      text: 'text text text text ',
      callback_data: 'setTIM',
    },
  ],
  [
    {
      text: 'text text text text ',
      callback_data: 'setPI',
    },
  ],
  [
    {
      text: 'text text text text text',
      callback_data: 'about',
    },
  ],
  [{ text: 'Назад', callback_data: 'back' }],
];

const payments = JSON.stringify({
  inline_keyboard: [
    [{ text: 'Kuna CODE (-20%❤)=(4$)  ', callback_data: 'kuna' }],
    [{ text: 'BTC (5$)', callback_data: 'btc' }],
    [{ text: 'Global24 (5$)', callback_data: 'global' }],
  ],
});

const unlock = JSON.stringify({
  inline_keyboard: [[{ text: 'Unlock 🔓', callback_data: 'unlock' }]],
});

const verify = JSON.stringify({
  inline_keyboard: [
    [{ text: 'Verify my payment ✅', callback_data: 'verify' }],
  ],
});

const backButton = JSON.stringify({
  inline_keyboard: [[{ text: 'Назад 🔙', callback_data: 'back' }]],
});

export const InlineKeyboard = {
  secondMenu,
  payments,
  unlock,
  verify,
  testButtons,
};
