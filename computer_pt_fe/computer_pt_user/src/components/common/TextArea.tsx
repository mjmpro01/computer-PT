import { TextAreaProps } from "antd/es/input";
import TextArea from "antd/es/input/TextArea";
import clsx from "clsx";
import { Controller, FieldError, RegisterOptions } from "react-hook-form";

interface ITextAreaComponentProps extends TextAreaProps {
  name: string;
  rules?: RegisterOptions;
  errors?: FieldError;
  helptext?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control?: any;
  containerClasName?: string;
  className?: string;
  labelClassName?: string;
  label?: string;
  isRequired?: boolean;
}

const TextAreaComponent = (props: ITextAreaComponentProps) => {
  const {
    name,
    rules,
    errors,
    helptext,
    control,
    containerClasName,
    className,
    labelClassName,
    label,
    isRequired,
    ...rest
  } = props;

  return (
    <div className={clsx("flex w-auto flex-col gap-[6px]", containerClasName)}>
      {/* Label Section */}
      {!!label && (
        <div className="flex items-center gap-[8px]">
          <label
            className={clsx(
              "text-[14px] font-[500] leading-[20px] text-[#484848]",
              labelClassName
            )}
          >
            {label}
          </label>
          <div
            className={clsx(
              "flex items-center justify-center",
              isRequired ? "visible" : "invisible"
            )}
          >
            <span className="text-[16px] font-bold text-[red]">*</span>
          </div>
        </div>
      )}

      {/* TextArea Section with Controller */}
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field: { onChange, onBlur, value, ref } }) => (
          <TextArea
            className={clsx(
              "min-h-[40px] text-[14px] font-[500] leading-[20px] placeholder:text-[#ccc] focus-within:!border focus-within:!bg-[white] hover:!border hover:!bg-[white]",
              "text-[black]",
              "bg-[white]",
              className
            )}
            rows={4}
            onChange={onChange}
            onBlur={onBlur}
            value={value}
            ref={ref}
            {...rest}
          />
        )}
      />

      {/* Helper Text */}
      {helptext && (
        <p className="text-[14px] font-[500] leading-[20px] text-[#667085]">
          {helptext}
        </p>
      )}

      {/* Error Message */}
      {errors && (
        <p className="text-left text-[14px] font-[500] leading-[20px] text-red-500">
          {errors.message}
        </p>
      )}
    </div>
  );
};

export default TextAreaComponent;
