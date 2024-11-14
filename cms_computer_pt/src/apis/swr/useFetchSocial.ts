// import useSWR from "swr";

// import { urls } from "@/constants/urls";
// import { UserType } from "@/types/common/user";

// import { fetcher } from "./fetcher";

// export const useFetchUser = () => {
//   const { data, error, mutate } = useSWR<UserType[]>(
//     `${urls.USERS}?populate=*`,
//     fetcher
//   );

//   return {
//     data,
//     error,
//     mutate,
//   };
// };
