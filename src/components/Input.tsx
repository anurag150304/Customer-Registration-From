
import { InputProps } from "@/types/common.types";
import { memo } from "react";

function Input({ label, type, placeholder, register, registerType, errors }: InputProps) {

    return (
        <div className={`flex flex-col justify-center items-start gap-1 ${label === "Browser Information" || label === "Address" ?
            "w-full" :
            "max-[501px]:w-full min-[501px]:w-[48%] min-lg:w-[48%]"}`}>
            <label htmlFor={registerType} className="text-sm font-medium w-full">{label}</label>
            {type === "select" ? (
                <select
                    id={registerType}
                    {...register(registerType)}
                    className={`w-full border-1 border-[#00000031] rounded-md py-2.5 px-3
                        text-sm text-[#000000d9] hover:border-[#6b26d9] focus:outline-none focus:ring-2 focus:ring-[#6b26d9e3]
                        transition-all ${errors[registerType] && 'border-red-400'}`}
                >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                </select>
            ) : type === "textarea" ? (
                <textarea
                    id={registerType}
                    placeholder={placeholder}
                    {...register(registerType)}
                    className={`w-full border-1 border-[#00000031] rounded-md py-2.5 px-3
                        text-sm text-[#000000d9] hover:border-[#6b26d9] focus:outline-none focus:ring-2 focus:ring-[#6b26d9e3]
                        transition-all ${errors[registerType] && 'border-red-400'}`}
                />
            ) : (
                <input
                    type={type}
                    id={registerType}
                    placeholder={placeholder}
                    readOnly={["Browser Information", "Latitude", "Longitude"].includes(label)}
                    {...register(registerType)}
                    className={`w-full border-1 border-[#00000031] rounded-md py-2.5 px-3
                    text-sm text-[#000000d9] hover:border-[#6b26d9] focus:outline-none focus:ring-2 focus:ring-[#6b26d9e3]
                    transition-all ${errors[registerType] && 'border-red-400'}
                    ${(["Browser Information", "Latitude", "Longitude"].includes(label)) && "cursor-not-allowed bg-gray-50"}`}
                />
            )}
            <span className="text-sm text-red-400 mt-0.5">{errors[registerType]?.message}</span>

        </div>
    )
}

export default memo(Input);