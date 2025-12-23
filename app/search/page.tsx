'use client';

import { useEffect, useState } from 'react';
import { useGeolocation } from '@/lib/hooks/useGeolocation';
import { Place } from '@/lib/google-maps';
import { ShopCard } from '@/components/ShopCard';
import { LoadingSmoke } from '@/components/LoadingSmoke';
import { AlertCircle, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function SearchPage() {
    const { location, error: geoError, loading: geoLoading, getCurrentLocation } = useGeolocation();
    const [places, setPlaces] = useState<Place[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // Start geolocation immediately on mount
        getCurrentLocation();
    }, []);

    useEffect(() => {
        if (location) {
            fetchPlaces(location.lat, location.lng);
        }
    }, [location]);

    const fetchPlaces = async (lat: number, lng: number) => {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch(`/api/places?lat=${lat}&lng=${lng}`);
            if (!res.ok) throw new Error('Failed to fetch hotels');
            const data = await res.json();
            if (data.places) {
                setPlaces(data.places);
            } else {
                setPlaces([]);
            }
        } catch (err) {
            console.error(err);

            setError('Failed to load nearby places. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const isLoading = geoLoading || loading;

    return (
        <div className="min-h-screen pb-20 p-4 max-w-xl mx-auto">
            <div className="flex items-center mb-6 pt-4">
                <Link href="/" className="mr-4 p-2 rounded-full hover:bg-white/10 transition-colors">
                    <ArrowLeft className="w-6 h-6 text-amber-500" />
                </Link>
                <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-200 to-amber-500">
                    Nearby Shisha
                </h1>
            </div>

            {geoError && !location && (
                <div className="p-4 rounded-lg bg-red-900/20 border border-red-500/50 text-red-200 flex items-center gap-3">
                    <AlertCircle className="w-5 h-5 flex-shrink-0" />
                    <p className="text-sm">{geoError.message || 'Location access denied.'}</p>
                </div>
            )}

            {isLoading ? (
                <LoadingSmoke />
            ) : (
                <div className="space-y-4">
                    {places.length === 0 && !error && location && (
                        <div className="text-center py-10 text-muted-foreground">
                            <p>No high-rated shisha places found nearby.</p>
                        </div>
                    )}

                    {places.map((place) => (
                        <ShopCard key={place.place_id} place={place} />
                    ))}
                </div>
            )}

            {error && (
                <div className="text-center py-8 text-red-400">
                    <p>{error}</p>
                    <button onClick={() => location && fetchPlaces(location.lat, location.lng)} className="mt-4 text-primary underline">Retry</button>
                </div>
            )}
        </div>
    );
}
