import React from "react";

const FormLayoutOne = () => {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="shadows w-[420px] rounded-[10px] bg-white p-[25px] lg:w-[525px]">
        <form onSubmit={handleSubmit} className="flex flex-col gap-[25px]">
          <h1 className="py-[25px] text-center text-[24px] font-[700]">
            Login
          </h1>
          {inputFormData.map((item, id) => {
            return (
              <InputForm
                key={id}
                title={item.title}
                name={item.name}
                type={item.type}
                value={item.value}
                handleChange={handleChange}
                handleBlur={handleBlur}
                errors={errors}
                touched={touched}
              />
            );
          })}
          <p
            onClick={() => navigate("/user/forgot-password")}
            className="cursor-pointer text-right text-[14px] font-[500] text-red-500"
          >
            Forgot password ?
          </p>
          <div className="w-full">
            <button
              type="submit"
              className="w-full rounded-[4px] bg-[#002979] py-[15px] text-center text-[18px] font-semibold text-white"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormLayoutOne;
