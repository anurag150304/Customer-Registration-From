import { useContext, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { ToastContext } from "@/context/toast.context";
import { MdErrorOutline } from "react-icons/md";
import { IoWarningOutline } from "react-icons/io5";
import { FaRegCheckCircle } from "react-icons/fa";

export default function Toast() {
    // Accessing the ToastContext to manage toast state
    const toastCtx = useContext(ToastContext);

    // Animation controls for managing toast animations
    const controls = useAnimation();

    useEffect(() => {
        if (toastCtx?.toast.init) {
            // Start animation to bring the toast into view
            controls.start({
                y: 0, x: 0,
                transition: { type: "spring", duration: 0.4 }
            });

            // Set a timer to hide the toast after 2 seconds
            const timer = setTimeout(() => {
                // Start animation to move the toast out of view
                controls.start({
                    x: 430,
                    transition: { duration: 0.5, ease: "easeInOut" }
                });

                // Reset the toast state after the animation completes
                setTimeout(() => {
                    toastCtx?.setToast({ init: false, heading: "", message: "", type: "success" });
                }, 1000);
            }, 2000);

            // Cleanup the timer when the component unmounts or dependencies change
            return () => clearTimeout(timer);
        }
    }, [toastCtx?.toast.init, controls, toastCtx]);

    // If the toast is not initialized, do not render anything
    if (!toastCtx?.toast.init) return null;

    return (
        <motion.div
            initial={{ y: 120, x: 0 }} // Initial position of the toast
            animate={controls} // Animation controls for managing toast movement
            className={`sm:w-[40%] md:w-[35%] max-sm:w-[65%] fixed right-5 bottom-5
        shadow-lg p-5 rounded-md flex justify-start items-start border-2
        gap-4 transition-all duration-300 z-40
        ${toastCtx.toast.type === "success"
                    ? "border-[#6b26d9] bg-[#f8f3ff]" // Styling for success toast
                    : toastCtx.toast.type === "error"
                        ? "border-red-400 bg-red-50" // Styling for error toast
                        : "border-yellow-400 bg-yellow-50" // Styling for warning toast
                }`}
        >
            {/* Render the appropriate icon based on the toast type */}
            {toastCtx.toast.type === "success" ? <FaRegCheckCircle className="text-2xl" /> :
                toastCtx.toast.type === "error" ? <MdErrorOutline className="text-2xl" /> :
                    <IoWarningOutline className="text-2xl" />}

            {/* Render the toast heading and message */}
            <div className="flex flex-col justify-center items-start gap-1">
                <h1 className="font-medium">{toastCtx?.toast.heading}</h1>
                <p className="text-[0.75rem]">{toastCtx?.toast.message}</p>
            </div>
        </motion.div>
    );
}