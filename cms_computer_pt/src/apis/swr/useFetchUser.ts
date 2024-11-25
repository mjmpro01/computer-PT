import useSWR from "swr";

import { fetcher } from "./fetcher";
import urls from "../../utils/constants/urls";

import { UserType } from "../../types/commom/user";

export const useFetchUser = () => {
  const { data, error, mutate } = useSWR<UserType[]>(
    `${urls.USERS}?populate=*&sort=id:DESC`,
    fetcher
  );

  return {
    data,
    error,
    mutate,
  };
};
