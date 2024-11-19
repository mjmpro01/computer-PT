export default ({ env }) => ({
  vnp_TmnCode: env("VNP_TMN_CODE"),
  vnp_HashSecret: env("VNP_HASH_SECRET"),
  vnp_Url: env("VNP_URL"),
  vnp_ReturnUrl: env("VNP_RETURN_URL"),
  success_page: env("SUCCESS_PAGE"),
  fail_page: env("FAIL_PAGE"),
  ip_address: env("IP_ADDRESS"),
  bullConfig: {
    redis: {
      host: env("REDIS_HOST", "localhost"),
      port: env.int("REDIS_PORT", 6379),
    },
  },
  AWS_REGION: env("AWS_REGION"),
  AWS_ACCESS_KEY_ID: env("AWS_ACCESS_KEY_ID"),
  AWS_SECRET_ACCESS_KEY: env("AWS_ACCESS_SECRET"),
  AWS_S3_BUCKET: env("AWS_BUCKET"),
  GHN_URL: env("GHN_URL"),
  GHN_TOKEN: env("GHN_TOKEN"),
  GHN_SHOP_ID: env("GHN_SHOP_ID"),
  SHIPPING_FEE: env("SHIPPING_FEE"),
});
