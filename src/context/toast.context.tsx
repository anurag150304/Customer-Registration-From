import { ToastContextType, ToastType } from "@/types/context.types";
import { createContext, JSX, useState } from "react";

export const ToastContext = createContext<ToastContextType | null>(null);
export default function ToastContextProvider({ children }: { children: JSX.Element }) {
    const [toast, setToast] = useState<ToastType>({ init: false, heading: "", message: "", type: "success" });
    return (
        <ToastContext.Provider value={{ toast, setToast }}>
            {children}
        </ToastContext.Provider>
    );
}