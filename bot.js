const mineflayer = require('mineflayer');

function createBot() {
  const bot = mineflayer.createBot({
    host: process.env.MC_HOST || 'emerald.magmanode.com',
    port: parseInt(process.env.MC_PORT) || 33815,
    username: process.env.MC_USER || 'AFK_Bot_7772'
  });

  bot.on('spawn', () => {
    console.log('✅ Bot joined the server');
    bot.chat('السلام عليكم! أنا بوت أفك شغال 24/7 🚀');

    // حركة بسيطة كل 60 ثانية حتى ما يُطرد
    setInterval(() => {
      bot.setControlState('jump', true);
      setTimeout(() => bot.setControlState('jump', false), 500);
    }, 60000); // كل دقيقة يقفز مرة
  });

  bot.on('end', () => {
    console.log('❌ Bot disconnected, reconnecting in 10 seconds...');
    setTimeout(createBot, 10000);
  });

  bot.on('kicked', reason => {
    console.log('⛔ Bot kicked:', reason);
  });

  bot.on('error', (err) => console.error('⚠️ Error:', err));
}

createBot();
