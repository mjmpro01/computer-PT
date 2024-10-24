import authApi from "@/api/authApi";
import images from "@/assets/images";
import InputComponent from "@/components/common/InputComponent";
import { formValidation } from "@/utils/constants/formValidation";
import paths from "@/utils/constants/paths";
import { Button } from "antd";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface RegisterProps {
  confirmPassword: string;
  email: string;
  password: string;
}
function Register() {
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterProps>({
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onChange",
  });
  const [password] = watch(["password"]);

  const onSubmit: SubmitHandler<RegisterProps> = async (data) => {
    const dataRegister = {
      email: data?.email,
      username: data?.email,
      password: data?.password,
    };
    await authApi
      .register(dataRegister)
      .then((res) => {
        if (res) {
          toast.success("Đăng ký tài khoản thành công");
          navigate(paths.LOGIN);
        }
      })
      .catch(() => toast.error("Có lỗi khi đăng ký"));
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
          name="email"
          control={control}
          label="Email"
          placeholder="Email"
          rules={formValidation.email}
          errors={errors.email}
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
        <InputComponent
          isRequired
          isPassword
          name="confirmPassword"
          control={control}
          label="Xác nhận mật khẩu"
          placeholder="Xác nhận mật khẩu"
          rules={formValidation.confirmPassword(password)}
          errors={errors.confirmPassword}
        />

        <Button className="h-[4rem] bg-[#1435C5] text-white" htmlType="submit">
          Đăng ký
        </Button>
        <div className="flex items-center gap-[0.8rem] justify-center">
          <p className="text-[1.6rem]">Đã có tài khoản ?</p>
          <button onClick={() => navigate(paths.LOGIN)}>
            <p className="text-[#1435C5] text-[1.6rem] font-semibold">
              Đăng nhập
            </p>
          </button>
        </div>
      </form>
    </div>
  );
}

export default Register;
