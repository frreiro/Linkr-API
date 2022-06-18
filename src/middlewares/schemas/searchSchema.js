import joi from 'joi';

export const searchSchema = joi.object({
    question: joi.string().min(3).required()
});