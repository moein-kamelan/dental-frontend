import React, { forwardRef, useState } from "react";

type CustomInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  inputType?: "text" | "phone" | "password" | "number" | "file" | "email";
  labelText?: string;
  requiredText?: boolean;
  placeholder?: string;
  manualValue?: string | number;
  className?: string;
  labelClassName?: string;
  index?: number;
  maxLength?: number;
  errorMessage?: string | null | string[] | undefined;
  optional?: boolean;
  name?: string;
  manualOnChange?: (value: string, index?: number) => void;
  onKeyDown?: (
    e: React.KeyboardEvent<HTMLInputElement>,
    index?: number
  ) => void;
  beforeIcon?: string;
  afterIcon?: string;
};
const CustomInput = forwardRef<HTMLInputElement, CustomInputProps>(
  (
    {
      inputType = "text",
      labelText = "",
      requiredText ,
      placeholder = "",
      manualValue = "",
      manualOnChange,
      onKeyDown,
      className = "",
      labelClassName = "",
      index,
      maxLength,
      errorMessage,
      optional,
      beforeIcon,
      afterIcon,
      ...rest
    },
    ref
  ) => {
    const restProps = rest as React.InputHTMLAttributes<HTMLInputElement>;
const [showPassword, setShowPassword] = useState(false);
    const controlledValue =
      restProps.value !== undefined ? restProps.value : manualValue ?? "";

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (typeof restProps.onChange === "function") {
        restProps.onChange(e as React.ChangeEvent<HTMLInputElement>);
      } else if (manualOnChange) {
        manualOnChange(e.target.value, index);
      }
    };
    
    // برای file input نباید value set کنیم
    const inputProps =
      inputType === "file"
        ? { ...rest, value: undefined }
        : { ...rest, value: controlledValue };

    return (
      <div>
        <label
          className={`block  text-dark font-estedad-lightbold ${
            errorMessage || errorMessage === null ? "mb-[3px]" : "mb-2"
          } ${labelClassName}`}
        >
  <span className="block mr-4 mb-2">{labelText}</span>
   <div className="relative">
    <div className="absolute left-4 top-0  bottom-0 my-auto h-full flex items-center justify-center">
      <i onClick={() => setShowPassword(!showPassword)} className={`fas ${inputType === "password" ? (showPassword ? "fa-eye-slash" : "fa-eye") : afterIcon ? afterIcon : ""}`}></i>
    </div>
    {beforeIcon && (
    <div className="absolute right-4 top-0 bottom-0 my-auto  h-full flex items-center justify-center">
      <i className={`fas ${beforeIcon}`}></i>
    </div>
    )}
   <input
            ref={ref}
            type={inputType === "password" ? (showPassword ? "text" : "password") : inputType}
            
            placeholder={placeholder + (requiredText ? "*" : "" + (optional ? " (اختیاری)" : ""))}
            maxLength={maxLength}
            onChange={handleChange}
            onKeyDown={(e) => onKeyDown?.(e, index)}
            className={`w-full  px-10 py-3 border-2 border-main-border-color rounded-full focus:outline-none focus:border-[#00A6FB] placeholder:text-paragray placeholder:font-estedad-light ${className}`}
            {...inputProps}
          />
   </div>
        </label>
        {(errorMessage || errorMessage === null) && (
          <span className="block text-red-500 text-[10px] font-iran-sans-normal mr-4 mb-2 h-4">
            {errorMessage}
          </span>
        )}
      </div>
    );
  }
);

export default CustomInput;
