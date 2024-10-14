import { UserType } from "@/types/common/user";
import variables from "../constants/variables";

const getUserProfile = () => {
  const dataProfile =
    sessionStorage.getItem(variables.PROFILE) ||
    localStorage.getItem(variables.PROFILE);
  const profile: UserType = dataProfile ? JSON.parse(dataProfile) : {};

  return profile;
};

const getAccessToken = () =>
  sessionStorage.getItem(variables.ACCESS_TOKEN) ||
  localStorage.getItem(variables.ACCESS_TOKEN);

const getUserRole = () =>
  sessionStorage.getItem(variables.ROLE) ||
  localStorage.getItem(variables.ROLE);

export { getUserProfile, getAccessToken, getUserRole };
