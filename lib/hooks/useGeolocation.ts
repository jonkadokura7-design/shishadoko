import { useState, useEffect } from 'react';

export interface Location {
    lat: number;
    lng: number;
}

export interface GeolocationError {
    code: number;
    message: string;
}

export function useGeolocation() {
    const [location, setLocation] = useState<Location | null>(null);
    const [error, setError] = useState<GeolocationError | null>(null);
    const [loading, setLoading] = useState(false);

    const getCurrentLocation = () => {
        setLoading(true);
        setError(null);

        if (!navigator.geolocation) {
            setError({
                code: 0,
                message: 'Geolocation is not supported by your browser.',
            });
            setLoading(false);
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                setLocation({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                });
                setLoading(false);
            },
            (error) => {
                setError({
                    code: error.code,
                    message: error.message,
                });
                setLoading(false);
            },
            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 0,
            }
        );
    };

    return { location, error, loading, getCurrentLocation };
}
