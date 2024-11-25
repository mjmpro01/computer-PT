import useSWR from "swr";

import { fetcher } from "./fetcher";
import urls from "../../utils/constants/urls";
import { BaseData } from "../../types/base/baseData";
import { BaseResponse } from "../../types/base/baseResponse";
import { FeedbackType } from "../../types/commom/feedback";

export const useFetchFeedBacks = () => {
  const { data, error, mutate } = useSWR<
    BaseResponse<BaseData<FeedbackType>[]>
  >(`${urls.FEEDBACKS}?populate=*&sort=id:DESC`, fetcher);

  return {
    data,
    error,
    mutate,
  };
};
