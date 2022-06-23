import joi from "joi"

const pageSchema = joi.number().integer().required();
export default pageSchema