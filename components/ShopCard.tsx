import { MapPin, MessageSquare, Clock } from 'lucide-react';
import { Place } from '@/lib/google-maps';
import { StarRating } from './StarRating';

interface ShopCardProps {
    place: Place;
}

export function ShopCard({ place }: ShopCardProps) {
    // Get top review
    const topReview = place.reviews?.[0];

    return (
        <div className="glass-card rounded-xl p-6 mb-4 transform transition-all hover:scale-[1.02] hover:bg-white/5 border border-white/10 group">
            <div className="flex justify-between items-start mb-2">
                <h3 className="flex-1 min-w-0 break-words text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-100 to-amber-400 group-hover:from-amber-200 group-hover:to-amber-500 pr-2">
                    {place.name}
                </h3>
                {place.opening_hours?.open_now !== undefined && (
                    <span className={`text-xs px-2 py-1 rounded-full border flex-shrink-0 ${place.opening_hours.open_now ? 'border-green-500/50 text-green-400 bg-green-900/20' : 'border-red-500/50 text-red-400 bg-red-900/20'}`}>
                        {place.opening_hours.open_now ? 'OPEN' : 'CLOSED'}
                    </span>
                )}
            </div>

            <div className="flex items-center gap-2 mb-3">
                <StarRating rating={place.rating} />
                <span className="text-xs text-muted-foreground">({place.user_ratings_total})</span>
            </div>

            <div className="flex items-start gap-2 text-sm text-gray-300 mb-4">
                <MapPin className="w-4 h-4 mt-0.5 text-primary flex-shrink-0" />
                <span className="line-clamp-2">{place.vicinity}</span>
            </div>

            {topReview && (
                <div className="bg-black/20 rounded-lg p-3 text-sm italic text-gray-400 border-l-2 border-primary">
                    <MessageSquare className="w-3 h-3 inline mr-2 text-primary/70" />
                    "{topReview.text.length > 80 ? topReview.text.substring(0, 80) + '...' : topReview.text}"
                </div>
            )}
        </div>
    );
}
