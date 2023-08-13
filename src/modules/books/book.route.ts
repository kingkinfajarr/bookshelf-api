import { Router } from "express";
import {
  createBook,
  deleteBook,
  getBook,
  getBooks,
  updateBook,
} from "./book.controller";

export const BooksRoute: Router = Router();

BooksRoute.get("/books", getBooks);

BooksRoute.get("/books/:id", getBook);

BooksRoute.post("/books", createBook);

BooksRoute.put("/books/:id", updateBook);

BooksRoute.delete("/books/:id", deleteBook);
