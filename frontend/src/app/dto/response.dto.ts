export interface ResponseDto<T> {
    data: T,
    message: String,
    success: boolean
  }