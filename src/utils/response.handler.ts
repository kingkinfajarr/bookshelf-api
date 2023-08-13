import { Response } from "express";
import * as http from "http";

interface ApiResponse<T> {
  data?: T;
  error?: any;
  code?: number;
  status?: string;
  message?: string;
}

export class ResponseHandler {
  static sendSuccess<T>(
    res: Response,
    data?: T,
    code: number = 200,
    message?: string
  ) {
    const response: ApiResponse<T> = {
      code: code,
      status: http.STATUS_CODES[code ?? "OK"],
    };

    if (data !== null && data !== undefined) {
      response.data = data;
    }

    if (message !== undefined) {
      response.message = message;
    }
    res.status(code).json(response);
  }

  static sendError(res: Response, error: any, code: number = 500) {
    const response: ApiResponse<null> = {
      code: code,
      status: http.STATUS_CODES[code ?? "ERROR"],
      error: {
        message: error,
      },
    };
    res.status(code).json(response);
  }
}
