import authApi from "@/api/authApi";
import images from "@/assets/images";
import InputComponent from "@/components/common/InputComponent";
import { LoginType } from "@/types/request/auth";
import { formValidation } from "@/utils/constants/formValidation";
import paths from "@/utils/constants/paths";
import variables from "@/utils/constants/variables";
import { Button } from "antd";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

function Login() {
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginType>();

  const onSubmit: SubmitHandler<LoginType> = async (data) => {
    const dataRegister = {
      identifier: data?.identifier,
      password: data?.password,
    };
    await authApi
      .login(dataRegister)
      .then((res) => {
        if (res) {
          localStorage.setItem(variables.ACCESS_TOKEN, res?.jwt);
          localStorage.setItem(variables.PROFILE, JSON.stringify(res?.user));
          console.log(res?.user);
          toast.success("Đăng nhập thành công");
          navigate(paths.HOME);
        }
      })
      .catch(() => toast.error("Có lỗi khi đăng nhập"));
  };

  return (
    <div className="flex items-center justify-center my-[5%]">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-[40rem] bg-white p-[2rem] rounded-[0.4rem] flex flex-col gap-[2.4rem]"
      >
        <div className="flex items-center justify-center">
          <img src={images.logo} alt="logo" className="size-[7rem]" />
          <h2 className="text-[1.6rem] font-medium">Computer P&T</h2>
        </div>
        <InputComponent
          isRequired
          name="identifier"
          control={control}
          label="Email"
          placeholder="Email"
          rules={formValidation.email}
          errors={errors.identifier}
        />
        <InputComponent
          isRequired
          isPassword
          name="password"
          control={control}
          label="Mật khẩu"
          placeholder="Mật khẩu"
          rules={formValidation.password}
          errors={errors.password}
        />

        <Button className="h-[4rem] bg-[#1435C5] text-white" htmlType="submit">
          Đăng nhập
        </Button>
        <div className="flex items-center gap-[0.8rem] justify-center">
          <p className="text-[1.6rem]">Chưa có tài khoản ?</p>
          <button onClick={() => navigate(paths.REGISTER)}>
            <p className="text-[#1435C5] text-[1.6rem] font-semibold">
              Đăng ký
            </p>
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
