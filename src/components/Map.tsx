import { MapProps } from "@/types/common.types";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { CSSProperties, memo } from "react";

function Map({ userPosition }: MapProps) {
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
    });
    const containerStyle: CSSProperties = {
        width: "100%",
        height: "100%",
        borderRadius: "0.5em"
    };

    if (!isLoaded) return <p>Loading map...</p>;

    return (
        <div className="w-full h-40 mb-3">
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={userPosition}
                zoom={15}
            >
                <Marker position={userPosition} />
            </GoogleMap>
        </div>
    );
}

export default memo(Map);