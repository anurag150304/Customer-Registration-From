
"use client";
import { ButtonType } from "@/types/common.types";
import { useRouter } from "next/navigation";

export default function Button(props: Partial<ButtonType>) {
    const router = useRouter();
    const performTask = () => {
        if (props.task) return router.push(props.task);
    }
    return (
        <button
            type={props.type}
            disabled={props.disabled}
            className={`
                ${props.textColor}
                ${props.textSize}
                ${props.fontWeignt}
                ${props.Hpad} ${props.Vpad}
                ${props.borderLine}
                ${props.borderColor}
                ${props.backgroundColor}
                ${props.radius}
                ${props.className}
                cursor-pointer
                flex justify-center items-center gap-2`}
            onClick={props.onClick ?? performTask}>
            {props.icon}
            {props.text}
        </button>
    )
}
