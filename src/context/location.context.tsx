import { JSX, useContext, useEffect, useState } from "react";
import { createContext } from "react";
import { ToastContext } from "./toast.context";
import { LocationContextType } from "@/types/context.types";

export const LocationContext = createContext<LocationContextType | null>(null);
export default function LocationContextProvider({ children }: { children: JSX.Element }) {
    const [location, setLocation] = useState<boolean>(false);
    const [coords, setCoords] = useState<{ lat: number, lng: number }>({ lat: 0, lng: 0 });
    const toastCtx = useContext(ToastContext);

    useEffect(() => {
        if (!location) return;


        navigator.geolocation.getCurrentPosition((position) => {
            setCoords({ lat: position.coords.latitude, lng: position.coords.longitude });
            setLocation(false);
            toastCtx?.setToast({
                init: true,
                heading: "Location Found",
                message: "Location has been automatically filled In.",
                type: "success"
            });
        }, () => {
            toastCtx?.setToast({
                init: true,
                heading: "Location Not Found",
                message: "Location could not be found. Please try again.",
                type: "error"
            });
            setLocation(false);
        }, { enableHighAccuracy: true });

        return () => {
            setCoords({ lat: 0, lng: 0 });
        }

    }, [location, toastCtx]);

    return (
        <LocationContext.Provider value={{ location, coords, setLocation, setCoords }}>
            {children}
        </LocationContext.Provider>
    );
}