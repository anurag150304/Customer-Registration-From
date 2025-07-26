import { JSX, useContext, useEffect, useState } from "react";
import { createContext } from "react";
import { ToastContext } from "./toast.context";
import { LocationContextType } from "@/types/context.types";

export const LocationContext = createContext<LocationContextType | null>(null);
export default function LocationContextProvider({ children }: { children: JSX.Element }) {
    // State to track whether location fetching is in progress
    const [location, setLocation] = useState<boolean>(false);

    // State to store the latitude and longitude coordinates
    const [coords, setCoords] = useState<{ lat: number, lng: number }>({ lat: 0, lng: 0 });

    // Accessing the ToastContext to display notifications
    const toastCtx = useContext(ToastContext);

    useEffect(() => {
        // If location fetching is not initiated, exit early
        if (!location) return;

        // Use the Geolocation API to get the user's current position
        navigator.geolocation.getCurrentPosition((position) => {
            // Update coordinates with the fetched latitude and longitude
            setCoords({ lat: position.coords.latitude, lng: position.coords.longitude });

            // Reset the location fetching state
            setLocation(false);

            // Display a success toast notification
            toastCtx?.setToast({
                init: true,
                heading: "Location Found",
                message: "Location has been automatically filled In.",
                type: "success"
            });
        }, () => {
            // Display an error toast notification if location fetching fails
            toastCtx?.setToast({
                init: true,
                heading: "Location Not Found",
                message: "Location could not be found. Please try again.",
                type: "error"
            });

            // Reset the location fetching state
            setLocation(false);
        }, { enableHighAccuracy: true }); // Enable high accuracy for location fetching

        // Cleanup function to reset coordinates when the component unmounts or dependencies change
        return () => {
            setCoords({ lat: 0, lng: 0 });
        };

    }, [location, toastCtx]); // Dependencies: location state and toast context

    return (
        // Providing location-related state and actions to child components
        <LocationContext.Provider value={{ location, coords, setLocation, setCoords }}>
            {children}
        </LocationContext.Provider>
    );
}