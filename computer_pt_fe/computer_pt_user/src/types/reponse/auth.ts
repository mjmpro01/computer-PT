import { UserType } from "../common/user";

export type LoginResponseType = {
  jwt: string;
  user: UserType;
};
