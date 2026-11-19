export class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode || 500;
    this.status = this.statusCode.toString().startsWith("4") ? "fail" : "error";
    this.isOpertional = true;
    Error.captureStackTrace(this, this.constructor);
  }
}
export function catchAsync(fn) {
  return function (req, res, next) {
    return fn(req, res, next).catch(next);
  };
}

export function globalErrorHandler(err, req, res, next) {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  console.log(err);
  res.status(err.statusCode).json({ error: err });
}
