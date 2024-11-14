import { PaginationResponseType } from "../commom/pagination";

export type BaseResponse<T> = {
  data: T;
  meta?: { pagination: PaginationResponseType };
};
