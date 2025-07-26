import { Dispatch, SetStateAction } from "react";

export interface LocationContextType {
    location: boolean;
    coords: { lat: number, lng: number };
    setLocation: Dispatch<SetStateAction<boolean>>;
    setCoords: Dispatch<SetStateAction<{ lat: number; lng: number; }>>
}

export interface ToastContextType {
    toast: ToastType;
    setToast: Dispatch<SetStateAction<ToastType>>;
}

export interface ToastType {
    init: boolean;
    heading: string;
    message: string;
    type: "success" | "error" | "warning";
}