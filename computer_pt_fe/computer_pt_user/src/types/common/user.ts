// import { BaseData } from '../base/baseData';

// import { AddressType } from './address';
// import { ImageType } from './image';
// import { ProductType } from './product';
// import { RoleType } from './role';

export type UserType = {
  id: number;
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  createdAt: string;
  updatedAt: string;
  fullName: string;
  phone: string;
  address: string;
  birthday: string;
  //   mainAddress: AddressType;
  point: number;
  userChanel: string;
  isPotential: boolean;
  activity: string;
  note: string;
  totalRevenue: string;
  first_name: string;
  gender: string;
  last_name: string;
  size: string;
  type: string;
  //   role: RoleType;
  //   avatar: { data: BaseData<ImageType> };
  //   products: { data: BaseData<ProductType>[] };
};
