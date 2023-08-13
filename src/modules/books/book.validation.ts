import Joi from "joi";
import BookType from "./book.types";

export const createBookValidation = (payload: BookType) => {
  const schema = Joi.object({
    title: Joi.string().required(),
    author: Joi.string().required(),
    summary: Joi.string().required(),
    pageCount: Joi.number().required(),
    readPage: Joi.number().allow(0, null),
    reading: Joi.boolean().allow(false, null),
    finished: Joi.boolean().allow(false, null),
  });

  return schema.validate(payload);
};

export const updateBookValidation = (payload: BookType) => {
  const schema = Joi.object({
    title: Joi.string().required(),
    author: Joi.string().required(),
    summary: Joi.string().required(),
    pageCount: Joi.number().required(),
    readPage: Joi.number().max(payload.pageCount).allow(0, null),
    reading: Joi.boolean().allow(false, null),
    finished: Joi.boolean().allow(false, null),
  });

  return schema.validate(payload);
};
