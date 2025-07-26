import { useContext, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { ToastContext } from "@/context/toast.context";
import { MdErrorOutline } from "react-icons/md";
import { IoWarningOutline } from "react-icons/io5";
import { FaRegCheckCircle } from "react-icons/fa";

export default function Toast() {
    const toastCtx = useContext(ToastContext);
    const controls = useAnimation();

    useEffect(() => {
        if (toastCtx?.toast.init) {
            controls.start({
                y: 0, x: 0,
                transition: { type: "spring", duration: 0.4 }
            });

            const timer = setTimeout(() => {
                controls.start({
                    x: 430,
                    transition: { duration: 0.5, ease: "easeInOut" }
                });

                setTimeout(() => {
                    toastCtx?.setToast({ init: false, heading: "", message: "", type: "success" });
                }, 1000);
            }, 2000);

            return () => clearTimeout(timer);
        }
    }, [toastCtx?.toast.init, controls, toastCtx]);

    if (!toastCtx?.toast.init) return null;

    return (
        <motion.div
            initial={{ y: 120, x: 0 }}
            animate={controls}
            className={`sm:w-[40%] md:w-[35%] max-sm:w-[65%] fixed right-5 bottom-5
        shadow-lg p-5 rounded-md flex justify-start items-center border-2
        gap-4 transition-all duration-300
        ${toastCtx.toast.type === "success"
                    ? "border-[#6b26d9] bg-[#f8f3ff]"
                    : toastCtx.toast.type === "error"
                        ? "border-red-400 bg-red-50"
                        : "border-yellow-400 bg-yellow-50"
                }`}
        >
            {toastCtx.toast.type === "success" ? <FaRegCheckCircle className="text-2xl" /> :
                toastCtx.toast.type === "error" ? <MdErrorOutline className="text-2xl" /> :
                    <IoWarningOutline className="text-2xl" />}
            <div className="flex flex-col justify-center items-start gap-1">
                <h1 className="font-medium">{toastCtx?.toast.heading}</h1>
                <p className="text-sm">{toastCtx?.toast.message}</p>
            </div>
        </motion.div>
    );
}