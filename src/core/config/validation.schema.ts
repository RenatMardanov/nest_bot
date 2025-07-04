import * as Joi from "joi";

export const validationSchema = Joi.object({
  PORT: Joi.number().default(3000),
  NODE_ENV: Joi.string()
    .valid("development", "production", "test")
    .default("development"),
  DATABASE_URL: Joi.string().required(),
  TELEGRAM_BOT_TOKEN: Joi.string().required(),
});
