export enum Code {
  Success = 200,
  BadRequest = 400,
  Unauthorized = 401,
  Forbidden = 403,
  NotFound = 404,
  MethodNotAllowed = 405,
  RequestTimeout = 408,
  Exception = 999,
  FailValidate = 422,
  ManyRequest = 429,
  InternalServerError = 500
}
