import axios from "axios";

export async function getAddressFromCoords(lat: number, lng: number) {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`;

    try {
        const response = await axios.get(url);
        const { data } = response;
        return data.results[0]?.formatted_address ?? { error: "Address not found" };
    } catch (err) {
        console.error("Failed to fetch address", err);
        return { error: "Failed to fetch address" };
    }
}