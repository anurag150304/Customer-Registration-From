import { Customer } from "@/validations/customer.validation";
import { JSX } from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";

export interface ButtonType {
    type: "submit" | "reset" | "button";
    text: string;
    textColor: string;
    textSize: string;
    fontWeignt: string;
    Vpad: string;
    Hpad: string;
    borderLine: string;
    borderColor: string;
    backgroundColor: string;
    radius: string;
    className: string;
    icon: JSX.Element;
    task: string;
    disabled?: boolean;
    onClick?: () => void;
}

export interface InputProps {
    label: string;
    type: string;
    placeholder?: string;
    register: UseFormRegister<Customer>;
    registerType: keyof Customer;
    errors: FieldErrors<Customer>;
}

export interface MapProps {
    userPosition: { lat: number, lng: number };
}