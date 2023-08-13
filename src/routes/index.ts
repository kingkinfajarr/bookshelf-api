import { Application, Router } from "express";
import { BooksRoute } from "../modules/books/book.route";

const ver1: string = "/api/v1";

const _routes: Array<[string, Router]> = [[ver1, BooksRoute]];

export const routes = (app: Application) => {
  _routes.forEach((route) => {
    const [url, router] = route;
    app.use(url, router);
  });
};
