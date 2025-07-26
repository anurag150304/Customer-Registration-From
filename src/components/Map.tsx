import { MapProps } from "@/types/common.types";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { CSSProperties, memo } from "react";

function Map({ userPosition }: MapProps) {
    // Loading the Google Maps JavaScript API using the API key from environment variables
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
    });

    // Defining the container style for the map
    const containerStyle: CSSProperties = {
        width: "100%",
        height: "100%",
        borderRadius: "0.5em"
    };

    // If the Google Maps API is not loaded, display a loading message
    if (!isLoaded) return <p>Loading map...</p>;

    return (
        <div className="w-full h-40 mb-3"> {/* Wrapper for the map with fixed height and margin */}
            <GoogleMap
                mapContainerStyle={containerStyle} // Applying the container style
                center={userPosition} // Centering the map on the user's position
                zoom={15} // Setting the zoom level of the map
            >
                {/* Adding a marker at the user's position */}
                <Marker position={userPosition} />
            </GoogleMap>
        </div>
    );
}
export default memo(Map);