import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
    HttpException,
    HttpStatus,
  } from '@nestjs/common';
  import { Observable, throwError } from 'rxjs';
  import { catchError, map } from 'rxjs/operators';
   
  export type Response<T> = {
    statusCode: number;
    message: string;
    data: T;
  };
   
  @Injectable()
  export class ResponseInterceptor<T> implements NestInterceptor<T, Response<T>> {
   
    intercept(
      context: ExecutionContext,
      next: CallHandler,
    ): Observable<Response<T>> {
      return next.handle().pipe(
        map((res: unknown) => this.responseHandler(res, context)),
        // catchError((err: HttpException) =>
        //   throwError(() => this.errorHandler(err, context)),
        // ),
      );
    }
   
    errorHandler(exception: HttpException, context: ExecutionContext) {
      const ctx = context.switchToHttp();
      const response = ctx.getResponse();
      const request = ctx.getRequest();
   
      const status =
        exception instanceof HttpException
          ? exception.getStatus()
          : HttpStatus.INTERNAL_SERVER_ERROR;
   
      response.status(status).json({
        statusCode: status,
        message: exception.message,
        result: exception,
      });
    }
   
    responseHandler(res: any, context: ExecutionContext) {
      const ctx = context.switchToHttp();
      const response = ctx.getResponse();
      const request = ctx.getRequest();
      const statusCode = response.statusCode;
   
   
      return {
        message: 'Success',
        statusCode,
        data: res,
      };
    }
  }