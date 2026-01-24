"use client"; // Client component

import { useEffect } from "react";
import { Map, Marker } from "@maptiler/sdk";
import "@maptiler/sdk/dist/maptiler-sdk.css";


const MapLibreMap = () => {
    useEffect(() => {
        const map = new Map({
            container: "map",
            apiKey: process.env.NEXT_PUBLIC_MAPTILER_API_KEY!,
            style: "streets-v2",
            center: [69.214229, 41.346035],
            zoom: 15,
        });

        new Marker()
            .setLngLat([69.214229, 41.346035])
            .addTo(map);

        return () => map.remove();
    }, []);

    return (
        <div id="map" className="w-full h-125"></div>
    );
}

export default MapLibreMap