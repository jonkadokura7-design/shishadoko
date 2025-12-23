import { NextRequest, NextResponse } from 'next/server';
import { searchNearbyPlaces } from '@/lib/google-maps';

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const latParam = searchParams.get('lat');
    const lngParam = searchParams.get('lng');

    if (!latParam || !lngParam) {
        return NextResponse.json(
            { error: 'Latitude and Longitude are required' },
            { status: 400 }
        );
    }

    const lat = parseFloat(latParam);
    const lng = parseFloat(lngParam);

    try {
        // Fetch places
        const places = await searchNearbyPlaces(lat, lng);
        return NextResponse.json({ places });
    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
