import { v4 as uuid } from "uuid";
import { Request, Response } from "express";
import { prisma } from "../../utils/prisma.service";
import { createBookValidation, updateBookValidation } from "./book.validation";
import { ResponseHandler } from "../../utils/response.handler";

export const getBooks = async (req: Request, res: Response) => {
  const books = await prisma.book.findMany();
  const result = books.map((book) => ({
    id: book.id,
    title: book.title,
    author: book.author,
  }));

  switch (Boolean(books)) {
    case true:
      ResponseHandler.sendSuccess(res, result, 200);
      break;
    case false:
      ResponseHandler.sendError(res, "Book not found", 404);
      break;
    default:
      ResponseHandler.sendError(res, "Internal Server Error", 500);
      break;
  }
};

export const getBook = async (req: Request, res: Response) => {
  const bookId = req.params.id;
  const book = await prisma.book.findUnique({
    where: { id: bookId },
  });

  switch (Boolean(book)) {
    case true:
      ResponseHandler.sendSuccess(res, book, 200);
      break;
    case false:
      ResponseHandler.sendError(res, "Book not found", 404);
      break;
    default:
      ResponseHandler.sendError(res, "Internal Server Error", 500);
      break;
  }
};

export const createBook = async (req: Request, res: Response) => {
  const { error, value } = createBookValidation(req.body);
  const id = uuid();

  if (error) {
    ResponseHandler.sendError(res, error.details[0].message, 422);
  }

  const isReading = value.readPage > 0;
  const isFinished = value.pageCount === value.readPage;

  const book = await prisma.book.create({
    data: {
      id: id,
      title: value.title,
      author: value.author,
      summary: value.summary,
      pageCount: value.pageCount,
      readPage: value.readPage,
      reading: isReading ? true : false,
      finished: isFinished ? true : false,
    },
  });

  switch (Boolean(book)) {
    case true:
      ResponseHandler.sendSuccess(res, book, 201);
      break;
    case false:
      ResponseHandler.sendError(res, error?.details[0].message, 422);
      break;
    default:
      ResponseHandler.sendError(res, "Internal Server Error", 500);
      break;
  }
};

export const updateBook = async (req: Request, res: Response) => {
  const bookId = req.params.id;
  const { error, value } = updateBookValidation(req.body);

  if (error) {
    ResponseHandler.sendError(res, error.details[0].message, 422);
  }

  const isReading = value.readPage > 0;
  const isFinished = value.pageCount === value.readPage;

  const updateBook = await prisma.book.update({
    where: {
      id: bookId,
    },
    data: {
      title: value.title,
      author: value.author,
      summary: value.summary,
      pageCount: value.pageCount,
      readPage: value.readPage,
      reading: isReading ? true : false,
      finished: isFinished ? true : false,
    },
  });

  switch (Boolean(updateBook)) {
    case true:
      ResponseHandler.sendSuccess(res, null, 200, "Update Book Success");
      break;
    case false:
      ResponseHandler.sendError(res, error?.details[0].message, 422);
      break;
    default:
      ResponseHandler.sendError(res, "Internal Server Error", 500);
      break;
  }
};

export const deleteBook = async (req: Request, res: Response) => {
  const bookId = req.params.id;

  const book = await prisma.book.delete({
    where: { id: bookId },
  });

  switch (Boolean(book)) {
    case true:
      ResponseHandler.sendSuccess(res, null, 200, "Delete Book Success");
      break;
    case false:
      ResponseHandler.sendError(res, "Cannot Delete Book", 422);
      break;
    default:
      ResponseHandler.sendError(res, "Internal Server Error", 500);
      break;
  }
};
