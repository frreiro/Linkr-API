import joi from 'joi';

export const signupSchema = joi.object({
  email: joi
    .string()
    .pattern(
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
    )
    .required(),
  username: joi.string().min(1).required(),
  password: joi.string().min(1).required(),
  image: joi
    .string()
    .pattern(/(https?:\/\/.*\.(?:png|jpg|gif|jpeg))/i)
    .required(),
});
