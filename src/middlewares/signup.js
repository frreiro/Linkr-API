import { signupSchema } from './schemas/signup.js';

export const signupValidation = (req, res, next) => {
  let body = req.body;
  let { error } = signupSchema.validate(body);
  if (error) {
    res.status(422).send(error);
  } else {
    next();
  }
};
