import { PaginationResponseType } from "../common/pagination";

export type BaseResponse<T> = {
  data: T;
  meta?: { pagination: PaginationResponseType };
};
