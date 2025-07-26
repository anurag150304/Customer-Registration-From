import { motion } from "framer-motion";

export default function CreatingLoader() {
    return (
        <div className="fixed h-full w-full flex justify-center items-start bg-[#00000031] z-50">
            <div className="flex flex-col items-center justify-center p-6 bg-white shadow-lg rounded-xl w-36 h-36 my-auto mx-auto">
                <motion.div
                    className="w-12 h-12 rounded-full border-4 border-indigo-500 border-t-transparent"
                    animate={{ rotate: 360 }}
                    transition={{
                        repeat: Infinity,
                        ease: "linear",
                        duration: 1
                    }}
                />
                <p className="mt-4 text-sm text-gray-600 font-medium">Creating...</p>
            </div>
        </div>
    );
}
