import { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';

interface ErrorResponse {
  campo: string;
  mensagem: string;
}

function errorHandler(error: any, req: Request, res: Response, next: NextFunction) {
  if (error instanceof ZodError) {
    const erros: ErrorResponse[] = error.issues.map((issue) => {
      const formattedPath = issue.path
        .map((segment) => (typeof segment === 'string' ? segment : `[${segment}]`))
        .join('');
      return {
        campo: formattedPath,
        mensagem: issue.message,
      };
    });

    return res.status(400).json({ erros });
  }

  // Outros tipos de erros
  res.status(500).json({ error: error.message });
}

export default errorHandler;
