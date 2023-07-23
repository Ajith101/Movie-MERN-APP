import React from "react";
import { MdDone } from "react-icons/md";

export const CheckBox = ({ handleCheckBox, value, onBlur, title, checked }) => {
  return (
    <>
      <div className="flex items-center justify-center gap-[10px]">
        <label
          htmlFor={value}
          className="relative flex cursor-pointer items-center transition-all duration-500 ease-in-out"
        >
          <input
            id={value}
            type="checkbox"
            value={value}
            name="genre"
            onBlur={onBlur}
            onChange={handleCheckBox}
            checked={checked}
          />
          <MdDone
            size={"25px"}
            className="check-1 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform font-[700] text-white opacity-0 transition-all duration-700 ease-in-out"
          />
        </label>
        <p>{title}</p>
      </div>
    </>
  );
};

const InputForm = ({
  name,
  value,
  type,
  title,
  handleChange,
  handleBlur,
  errors,
  touched,
}) => {
  return (
    <div className="">
      <label htmlFor="" className="py-[5px] font-font-2 text-[16px] font-[600]">
        {title}
      </label>
      {errors[name] && touched[name] ? (
        <p className="text-[14px] text-red-600">{errors[name]}</p>
      ) : null}
      <input
        placeholder={title.toLowerCase()}
        onChange={handleChange}
        onBlur={handleBlur}
        type={type ? type : "text"}
        name={name}
        value={value}
        className="w-full rounded-[4px] border-[1px] bg-blue-50 p-[10px] outline-none"
      />
    </div>
  );
};

export default InputForm;
