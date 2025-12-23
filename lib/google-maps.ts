export interface Place {
    place_id: string;
    name: string;
    rating: number;
    user_ratings_total?: number;
    vicinity?: string; // address
    geometry: {
        location: {
            lat: number;
            lng: number;
        };
    };
    photos?: {
        photo_reference: string;
        height: number;
        width: number;
    }[];
    reviews?: {
        author_name: string;
        rating: number;
        text: string;
        time: number;
    }[];
    opening_hours?: {
        open_now: boolean;
    };
}

export interface SearchResult {
    results: Place[];
    status: string;
}

// Mock Data for Fallback
const MOCK_PLACES: Place[] = [
    {
        place_id: 'mock-1',
        name: 'Shisha Cafe & Bar MOCK',
        rating: 4.8,
        user_ratings_total: 120,
        vicinity: 'Shibuya, Tokyo',
        geometry: { location: { lat: 35.658, lng: 139.701 } },
        opening_hours: { open_now: true },
        reviews: [
            {
                author_name: 'John Doe',
                rating: 5,
                text: 'Best shisha in Shibuya! The atmosphere is amazing.',
                time: 1630000000,
            },
        ],
    },
    {
        place_id: 'mock-2',
        name: 'Hookah Lounge MIST',
        rating: 4.5,
        user_ratings_total: 85,
        vicinity: 'Shinjuku, Tokyo',
        geometry: { location: { lat: 35.689, lng: 139.700 } },
        opening_hours: { open_now: true },
        reviews: [
            {
                author_name: 'Jane Smith',
                rating: 4,
                text: 'Great flavors and nice staff. A bit crowded though.',
                time: 1630000000,
            },
        ],
    },
    {
        place_id: 'mock-3',
        name: 'Desert Smoke',
        rating: 4.2,
        user_ratings_total: 50,
        vicinity: 'Roppongi, Tokyo',
        geometry: { location: { lat: 35.66, lng: 139.73 } },
        opening_hours: { open_now: false },
        reviews: [
            {
                author_name: 'Mike',
                rating: 5,
                text: 'Hidden gem. Very chill.',
                time: 1630000000,
            },
        ],
    },
];

const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

export async function searchNearbyPlaces(
    lat: number,
    lng: number,
    keyword: string = 'Shisha'
): Promise<Place[]> {
    if (!API_KEY || API_KEY === 'your_api_key_here') {
        console.warn('Google Maps API Key missing. Using Mock Data.');
        // Simulate delay
        await new Promise((resolve) => setTimeout(resolve, 1000));
        return MOCK_PLACES;
    }

    try {
        const radius = 3000; // 3km radius
        const encodedKeyword = encodeURIComponent(keyword);
        // Note: Text Search is good for "Shisha" keyword
        const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodedKeyword}&location=${lat},${lng}&radius=${radius}&key=${API_KEY}`;

        const response = await fetch(url);
        const data = (await response.json()) as SearchResult;

        if (data.status !== 'OK' && data.status !== 'ZERO_RESULTS') {
            throw new Error(`Google Maps API Error: ${data.status}`);
        }

        let results = data.results || [];

        // Filter by rating >= 3.5
        results = results.filter((place) => (place.rating || 0) >= 3.5);

        // Limit to 5
        results = results.slice(0, 5);

        // For each place, fetch details to get reviews (Text Search returns restricted details)
        const detailedPlaces = await Promise.all(
            results.map((place) => getPlaceDetails(place.place_id, place))
        );

        return detailedPlaces;
    } catch (error) {
        console.error('Failed to fetch places:', error);
        return MOCK_PLACES; // Fallback to mock on error
    }
}

async function getPlaceDetails(placeId: string, summaryPlace: Place): Promise<Place> {
    if (!API_KEY) return summaryPlace;

    try {
        // Fields: reviews, opening_hours
        const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,rating,reviews,opening_hours&key=${API_KEY}`;
        const response = await fetch(url);
        const data = await response.json();

        if (data.status === 'OK' && data.result) {
            return {
                ...summaryPlace, // Keep geometry/vicinity from search result
                reviews: data.result.reviews,
                opening_hours: data.result.opening_hours,
            };
        }
    } catch (e) {
        console.warn(`Failed to fetch details for ${placeId}, using summary.`);
    }
    return summaryPlace;
}
