import { NextFunction, Request, Response } from 'express';

const useErrorHandler = (error: TypeError, request: Request, response: Response, next: NextFunction) => {
    console.log('useErrorHandler: ' + error)
    
    const status = 500;
    const message = error.message;
    response
      .status(status)
      .send({
        status,
        message,
      })
}

export default useErrorHandler;