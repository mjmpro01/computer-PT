import { Button } from "antd";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { LoginRequestType } from "../../types/request/login";
import images from "../../assets/images";
import InputCustomComponent from "../../components/common/InputCustomComponent";
import { authApi } from "../../apis/axios/auth";
import { toast } from "sonner";
import variables from "../../utils/constants/variables";

function Login() {
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginRequestType>({
    defaultValues: {
      identifier: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<LoginRequestType> = async (formData) => {
    console.log(formData);
    await authApi
      .login(formData)
      .then((res) => {
        if (res) {
          toast.success("Đăng nhập thành công");
          localStorage.setItem(
            variables.PROFILE,
            JSON.stringify(res?.data?.user)
          );
          localStorage.setItem(variables.ACCESS_TOKEN, res?.data?.jwt);
          navigate("/");
        }
      })
      .catch(() => toast.error("Đăng nhập thất bại"));
  };

  return (
    <div className="h-svh flex flex-col justify-center items-center">
      <div className="w-full p-[24px] max-w-[600px]">
        <div className="w-full flex justify-center items-center mb-[2.4rem] md:pr-[1.6rem]">
          <div className="w-[6rem] md:w-[8rem]">
            <img src={images.logo} className="w-full h-full object-cover" />
          </div>
          <span className="text-[24px] md:text-[32px] font-bold text-[#B562A3]">
            Computer P&T
          </span>
        </div>
        <div className="w-full flex flex-col gap-[24px] shadow-md p-[24px] border rounded-[10px]">
          <h2 className="text-center text-[20px] font-bold">Đăng nhập</h2>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-[24px]"
          >
            <InputCustomComponent
              control={control}
              label="Tài khoản"
              placeholder="Nhập tài khoản"
              name="identifier"
              errors={errors.identifier}
            />

            <InputCustomComponent
              control={control}
              label="Mật khẩu"
              placeholder="Nhập mật khẩu"
              name="password"
              errors={errors.password}
              isPassword
            />
            <Button
              type="primary"
              className="h-[40px] bg-[#B562A3] hover:!bg-[#B562A3] w-full"
              htmlType="submit"
            >
              <p className="text-[16px] font-medium leading-normal">
                Đăng nhập
              </p>
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
