import React from "react";

interface RatingProps {
    rating: number;
    reviewCount: number;
}

const Rating: React.FC<RatingProps> = ({ rating, reviewCount }) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    return (
        <div className="flex items-center gap-1.5" title={`${rating.toFixed(1)} stars from ${reviewCount} reviews`}>
            <div className="flex">
                {[...Array(5)].map((_, i) => {
                    if (i < fullStars) {
                        return (
                            <span key={i} className="text-amber-400 text-sm">
                                ★
                            </span>
                        );
                    } else if (i === fullStars && hasHalfStar) {
                        return (
                            <span key={i} className="text-amber-400 text-sm relative">
                                <span className="absolute overflow-hidden w-1/2">★</span>
                                <span className="text-slate-300">★</span>
                            </span>
                        );
                    } else {
                        return (
                            <span key={i} className="text-slate-300 text-sm">
                                ★
                            </span>
                        );
                    }
                })}
            </div>
            <span className="text-xs font-medium text-slate-500">
                ({reviewCount})
            </span>
        </div>
    );
};

export default Rating;
