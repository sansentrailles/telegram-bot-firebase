const functions = require('firebase-functions');
const Telegraf = require('telegraf');
const Koa = require('koa');
const koaBody = require('koa-body');

const webhookUrl = 'https://us-central1-che-bot-60ec8.cloudfunctions.net/helloWorld';
const token = '588830759:AAHdILba3TKkOBWbqQPcHO55VVWeJ01fo3E';

console.log(' ================ START ================ ');

// https://api.telegram.org/bot588830759:AAHdILba3TKkOBWbqQPcHO55VVWeJ01fo3E/getWebhook
// "staging": "che-bot-1c4e8"

const app = new Koa();
const bot = new Telegraf(token);

bot.telegram.setWebhook(webhookUrl);
app.use(koaBody());
app.use((ctx, next) => ctx.method === 'POST' || ctx.url === '/helloWorld' ?
  bot.handleUpdate(ctx.request.body, ctx.response) :
  next()
);

app.listen(process.env.PORT || 5000);

bot.command('test', ctx => {
  ctx.reply('ok');
});

// const bot = new Telegraf(token)
// bot.start((ctx) => ctx.reply('Welcome'));
// bot.on('text', (ctx) => {
//     ctx.reply(ctx.update.message.text)
// //   let query = ctx.update.message.text;
// //   apixuClient.current(query).then((current) => {
// //     return ctx.reply(
// //       `The current weather in ${query} is C: ${current.current.temp_c} F:${current.current.temp_f}`);
// //   }).catch((err) => {
// //     return ctx.reply('This city is not exists', err);
// //   });
// });
// bot.launch();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.helloWorld = functions.https.onRequest((request, response) => {
 response.send("Hello from Firebase!");
});
