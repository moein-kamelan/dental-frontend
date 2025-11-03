import React from "react";

type CustomInputProps = {
    inputType? : "text" | "phone" | "password" | "number" ;
    labelText? : string ;
    placeholder? : string ;
    value? : string | number ;
    className? : string;
    labelClassName? : string;
    isTextArea? : boolean;
    rows?: number;
    onChange: (value : string ) => void

}


function CustomInput({ inputType="text", labelText="", placeholder="", value="", onChange , className="", labelClassName="" , isTextArea=false , rows=4 , ...rest } : CustomInputProps) {
  return (

<>
    {isTextArea ? (
         <label className={` text-dark font-estedad-lightbold  mb-2 ${labelClassName}`}>
      <span className="block   mr-4 mb-2">{labelText}</span>
      <textarea
      rows={rows}
        placeholder={placeholder}
        value={value}
        
        onChange={(e) => onChange(e.target.value)}
        className={`w-full px-6 py-3 border-2 border-main-border-color rounded-full focus:outline-none focus:border-primary placeholder:text-paragray placeholder:font-estedad-light   ${className}`}
        {...rest}
      />
    </label>
    ) : (
 <label className={`block mb-2 text-dark font-estedad-lightbold    ${labelClassName}`}>
      <span className="block   mr-4 mb-2">{labelText}</span>
      <input
        type={inputType}
        placeholder={placeholder}
        value={value}
        
        onChange={(e) => onChange(e.target.value)}
        className={`w-full px-6 py-3 border-2 border-main-border-color rounded-full focus:outline-none focus:border-primary placeholder:text-paragray placeholder:font-estedad-light   ${className}`}
        {...rest}
      />
    </label>
    )}
</>

   
  );
}

export default CustomInput;
