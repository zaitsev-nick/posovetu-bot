import { State } from './../controllers/memoryState.js';
import { InlineKeyboard } from './logic/inline_keyboard.js';
import { Keyboard } from './logic/keyboard.js';
import { Messages } from './logic/messages.js';
//import { Movie } from './../models/movie.js';

/**
 * @param {Tgfancy} bot Object
 */
const runBot = (bot) => {
  try {
    /**
     * Ping bot when starting
     *
     */
    bot.getMe().then((me) => {
      console.log(`** Bot Is Running => ${me.username}(id: ${me.id})`);
    });

    /**
     * /START
     *
     */
    bot.onText(/^[\/!#]start$/i, async (message) => {
      const {
        chat: { id },
      } = message;
      const name = message.from.first_name || message.from.username;
      await bot.sendMessage(
        id,
        `(<a href="tg://user?id=${message.from.id}">${name}</a>) Привет! \nЖелаете найти что посмотреть сегодня?`,
        {
          parse_mode: 'HTML',
          reply_markup: {
            keyboard: Keyboard.home,
            resize_keyboard: true,
            one_time_keyboard: true,
          },
        }
      );
    });

    /**
     * Что посмотреть
     *
     */
    bot.onText(/Что мне посмотреть/i, async (message) => {
      const { message_id } = message;
      const { text } = message;
      const {
        chat: { id },
      } = message;
      await bot.deleteMessage(id, message_id);
      await bot.sendMessage(id, Messages.secondMenu, {
        parse_mode: 'HTML',
        reply_markup: {
          inline_keyboard: InlineKeyboard.secondMenu,
        },
      });
    });

    /**
     * Я рекомендую
     *
     */
    bot.onText(/Я советую/i, async (message) => {
      const {
        chat: { id },
      } = message;
      await bot.sendMessage(id, `Я советую:`, {
        parse_mode: 'HTML',
        reply_markup: {
          inline_keyboard: InlineKeyboard.testButtons,
        },
      });
    });

    /**
     * callbackQuery - represents an incoming callback query
     * from a callback button in an inline keyboard
     *
     */
    bot.on('callback_query', async (callbackQuery) => {
      console.log('callback_query', callbackQuery.data);
      const {
        message: { chat, message_id, text },
      } = callbackQuery;
      // Handle buttons clicks / commands
      switch (callbackQuery.data) {
        case '/options':
          await bot.sendMessage(
            chat.id,
            `No incoming payments yet. Please, try again in about 2min...`
          );
          break;
        case 'unlock':
          await bot.sendMessage(chat.id, `Select a payment method:`, {
            reply_markup: InlineKeyboard.payments,
          });
          break;
        case 'kuna':
          await bot.sendMessage(
            chat.id,
            `Create and post to the Bot your Kuna CODE.\nCode should look like: <code>857ny-XXXXX-XXXXX-XXXXX-XXXXX-XXXXX-XXXXX-XXXXX-XXXXX-KUN-KCode</code>\n➖➖➖➖➖➖➖➖➖➖➖➖➖➖\nBot will automatically redeem your code`,
            { parse_mode: 'HTML' }
          );
          break;
        case 'btc':
          await bot.sendMessage(
            chat.id,
            `BTC wallet: <code>38CMtBqiJ7BNVMYxf4qmNQfhexoW3v1TXE</code>\n➖➖➖➖➖➖➖➖➖➖➖➖➖➖\nAfter replenishing the wallet, click on the <b>Verify</b> button`,
            { reply_markup: InlineKeyboard.verify, parse_mode: 'HTML' }
          );
          break;
        case 'global':
          await bot.sendMessage(
            chat.id,
            `Global24 wallet: <code>5120326148651</code>\n➖➖➖➖➖➖➖➖➖➖➖➖➖➖\nAfter replenishing the wallet, click on the <b>Verify</b> button`,
            { reply_markup: InlineKeyboard.verify, parse_mode: 'HTML' }
          );
          break;
        case 'random':
          await bot.deleteMessage(chat.id, message_id);
          await bot.sendPhoto(chat.id, 'https://i.ibb.co/864Mgfd/bw.jpg', {
            reply_markup: JSON.stringify({
              inline_keyboard: [
                [
                  {
                    text: `Random picture 🎲 (${State.count} FREE attempts left)`,
                    callback_data: 'random',
                  },
                ],
                [
                  {
                    text: 'Unlock all the pictures 🔓',
                    callback_data: 'unlock',
                  },
                ],
              ],
            }),
          });
          break;
        default:
        //await bot.deleteMessage(chat.id, message_id);
        //await bot.sendMessage(chat.id, `Command has not been recognized.`, { reply_markup: InlineKeyboard.unlock })
      }
      // Answer on each incoming callback
      await bot.answerCallbackQuery(callbackQuery.id, {});
    });
  } catch (error) {
    console.log(error);
  }
};

const stateCleanup = () => {
  State.count = 0;
};

export { runBot };
