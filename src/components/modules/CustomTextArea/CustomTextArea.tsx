import React, { forwardRef } from 'react'

type CustomTextAreaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  rows?: number;
  placeholder?: string;
  className?: string;
  errorMessage?: string | null | string[] | undefined;
  labelClassName?: string;
  labelText?: string;
  requiredText?: boolean;
  optional?: boolean;
  index?: number;
  manualOnChange?: (value: string, index?: number) => void;
  onKeyDown?: (
    e: React.KeyboardEvent<HTMLTextAreaElement>,
    index?: number
  ) => void;
  manualValue?: string | number;
  maxLength?: number;
  name?: string;

}

const CustomTextArea = forwardRef<HTMLTextAreaElement, CustomTextAreaProps>(({ rows, placeholder, className, errorMessage, labelClassName, labelText, requiredText, optional, index, manualOnChange, onKeyDown, manualValue, maxLength, name, ...rest }, ref) => {
  const restProps = rest as React.TextareaHTMLAttributes<HTMLTextAreaElement>;

  const controlledValue =
    restProps.value !== undefined ? restProps.value : manualValue ?? "";

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (typeof restProps.onChange === "function") {
      restProps.onChange(e as React.ChangeEvent<HTMLTextAreaElement>);
    } else if (manualOnChange) {
      manualOnChange(e.target.value, index);
    }
  };
    return (
    <div className='col-span-full'>
    <label
      className={`block  text-dark font-estedad-lightbold ${
        errorMessage || errorMessage === null ? "mb-[3px]" : "mb-2"
      } ${labelClassName}`}
    >
    <span className="block mr-4 mb-2">{labelText}</span>
    <textarea
      ref={ref}
      rows={rows}

      placeholder={placeholder + (requiredText ? "*" : "" + (optional ? " (اختیاری)" : ""))}
      className={`w-full px-6 py-3 border-2 border-main-border-color rounded-lg focus:outline-none focus:border-[#00A6FB] placeholder:text-paragray placeholder:font-estedad-light resize-none ${className}`}
      value={controlledValue}
      onChange={handleChange}
      onKeyDown={(e) => onKeyDown?.(e, index)}
      maxLength={maxLength}
      name={name}
      {...restProps}
            />
    </label>
    {(errorMessage || errorMessage === null) && (
          <span className="block text-red-500 text-[10px] font-iran-sans-normal mr-4 mb-2 h-4">
            {errorMessage}
          </span>
        )}
        </div>
  );
});


export default CustomTextArea