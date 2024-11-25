import useSWR from "swr";

import { fetcher } from "./fetcher";
import urls from "../../utils/constants/urls";
import { BaseData } from "../../types/base/baseData";
import { BaseResponse } from "../../types/base/baseResponse";
import { CategorySelectionsType } from "../../types/commom/categorySelections";

export const useFetchCategoriesSelections = () => {
  const { data, error, mutate } = useSWR<
    BaseResponse<BaseData<CategorySelectionsType>[]>
  >(`${urls.CATEGORY_SELECTIONS}?populate=*&sort=id:DESC`, fetcher);

  return {
    data,
    error,
    mutate,
  };
};
