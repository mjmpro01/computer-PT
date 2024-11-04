interface AddressComponents {
  street: string;
  ward: string;
  district: string;
  province: string;
}

export function splitAddress(address: string | undefined): AddressComponents {
  if (!address) {
    // Return default empty components if address is undefined or empty
    return {
      street: "",
      ward: "",
      district: "",
      province: "",
    };
  }

  // Split the address and provide default values for each part
  const [street = "", ward = "", district = "", province = ""] = address
    .split(",")
    .map((part) => part.trim());

  return {
    street,
    ward,
    district,
    province,
  };
}
