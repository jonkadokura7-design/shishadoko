import { Star, StarHalf } from 'lucide-react';

interface StarRatingProps {
    rating: number;
}

export function StarRating({ rating }: StarRatingProps) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    return (
        <div className="flex items-center text-amber-400">
            {[...Array(fullStars)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
            ))}
            {hasHalfStar && <StarHalf className="w-4 h-4 fill-current" />}
            <span className="ml-1 text-sm font-medium text-amber-200">{rating}</span>
        </div>
    );
}
