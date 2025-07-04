export default () => ({
  port: parseInt(process.env.PORT || "3000", 10),
  database: {
    url: process.env.DATABASE_URL,
  },
  telegram: {
    token: process.env.TELEGRAM_BOT_TOKEN,
  },
});
