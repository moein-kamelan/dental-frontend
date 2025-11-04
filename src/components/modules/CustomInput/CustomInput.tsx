import React, { forwardRef } from "react";

type CustomInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  inputType?: "text" | "phone" | "password" | "number";
  labelText?: string;
  placeholder?: string;
  manualValue?: string | number;
  className?: string;
  labelClassName?: string;
  isTextArea?: boolean;
  index?: number;
  maxLength?: number;
  errorMessage?: string | null;
  name?: string;
  manualOnChange?: (value: string, index?: number) => void;
  onKeyDown?: (
    e: React.KeyboardEvent<HTMLInputElement>,
    index?: number
  ) => void;
};
const CustomInput = forwardRef<HTMLInputElement, CustomInputProps>(
  (
    {
      inputType = "text",
      labelText = "",
      placeholder = "",
      manualValue = "",
      manualOnChange,
      onKeyDown,
      className = "",
      labelClassName = "",
      index,
      maxLength,
      errorMessage,
      ...rest
    },
    ref
  ) => {
    const restProps = rest as React.InputHTMLAttributes<HTMLInputElement>;

    const controlledValue =
      restProps.value !== undefined ? restProps.value : manualValue ?? "";

    const handleChange = (
      e: React.ChangeEvent<HTMLInputElement>
    ) => {
      if (typeof restProps.onChange === "function") {
        
        
        restProps.onChange(e as React.ChangeEvent<HTMLInputElement>);
      } else if (manualOnChange) {
        manualOnChange(e.target.value, index);
      }
    };
    
    return (
              <>
            <label
              className={`block mb-[3px] text-dark font-estedad-lightbold ${labelClassName}`}
            >
              <span className="block mr-4 mb-2">{labelText}</span>
              <input
                ref={ref}
                type={inputType}
                placeholder={placeholder}
                value={controlledValue}
                maxLength={maxLength}
                onChange={handleChange}
                onKeyDown={(e) => onKeyDown?.(e, index)}
                className={`w-full px-6 py-3 border-2 border-main-border-color rounded-full focus:outline-none focus:border-primary placeholder:text-paragray placeholder:font-estedad-light ${className}`}
                {...rest}
              />
            </label>
            <span className="block text-red-500 text-[10px] font-iran-sans-normal mr-4 mb-2 h-4">{errorMessage}</span>
          </>
    );
  }
);

export default CustomInput;
