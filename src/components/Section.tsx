import { LocationContext } from "@/context/location.context";
import { Fragment, JSX, memo, useContext } from "react";
import { RiErrorWarningLine } from "react-icons/ri";
import { CiLocationOn } from "react-icons/ci";
import Button from "./Button";

function FormSection({ heading, input }: { heading: string, input: JSX.Element[] }) {
    const locationCtx = useContext(LocationContext);

    return (
        <div className="flex flex-col justify-center items-start gap-1.5 w-full">
            {heading === "Location Information" ? (
                <div className="w-full flex justify-between items-center gap-4">
                    <h3 className="text-lg font-medium">{heading}</h3>
                    <Button
                        text={locationCtx?.location ? "Getting Location..." : "Get Location"}
                        textColor={locationCtx?.location ? "text-gray-500" : "text-black"}
                        textSize="text-sm"
                        fontWeignt="font-medium"
                        Vpad="py-1.5"
                        Hpad="px-3"
                        borderLine="border-1"
                        borderColor="border-[#00000031]"
                        backgroundColor="bg-white"
                        radius="rounded-md"
                        icon={<CiLocationOn className="text-xl" />}
                        className={`${!locationCtx?.location && 'hover:bg-[#6b26d9] hover:text-white hover:border-[#6b26d9] transition-all'}`}
                        onClick={() => locationCtx?.setLocation(true)}
                        disabled={locationCtx?.location}
                    />
                </div>
            ) : (
                <h3 className="text-lg font-medium">{heading}</h3>
            )}
            <div className="flex justify-start items-center flex-wrap gap-4 w-full border-t-1 border-t-[#00000031] py-4">
                {input.length > 0 && input.map((item, idx) => (
                    <Fragment key={idx}>
                        {item}
                        {heading === "System Information" &&
                            <p className="text-sm text-[#000000aa] bg-[#fbfbfc] shadow rounded-md p-2 flex justify-start items-start gap-2">
                                <RiErrorWarningLine className="text-3xl" />
                                Your browser information is automatically detected and used for security purposes. Location data helps us provide better services in your area.
                            </p>}
                    </Fragment>
                ))}
            </div>
        </div>
    )
}

export default memo(FormSection);