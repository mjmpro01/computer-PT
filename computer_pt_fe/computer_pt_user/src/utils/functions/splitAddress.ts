interface AddressComponents {
  street: string;
  ward: string;
  district: string;
  province: string;
}

export function splitAddress(address: string): AddressComponents {
  const [street, ward, district, province] = address
    .split(",")
    .map((part) => part.trim());

  return {
    street,
    ward,
    district,
    province,
  };
}
