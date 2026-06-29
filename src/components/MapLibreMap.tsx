"use client";

import { useEffect, useRef } from "react";
import { Map, Marker, type StyleSpecification } from "maplibre-gl";

const location: [number, number] = [69.214229, 41.346035];

const openStreetMapStyle: StyleSpecification = {
    version: 8,
    sources: {
        osm: {
            type: "raster",
            tiles: ["https://tile.openstreetmap.org/{z}/{x}/{y}.png"],
            tileSize: 256,
            attribution: "&copy; OpenStreetMap contributors",
        },
    },
    layers: [
        {
            id: "osm",
            type: "raster",
            source: "osm",
        },
    ],
};

const MapLibreMap = () => {
    const mapContainerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (!mapContainerRef.current) return;

        const map = new Map({
            container: mapContainerRef.current,
            style: openStreetMapStyle,
            center: location,
            zoom: 15,
        });

        new Marker()
            .setLngLat(location)
            .addTo(map);

        return () => map.remove();
    }, []);

    return (
        <div ref={mapContainerRef} className="w-full h-120 rounded-2xl"></div>
    );
}

export default MapLibreMap
