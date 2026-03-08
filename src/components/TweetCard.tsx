import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Heart, MessageCircle, Share2, Dog, Cat, Bird, Fish, Turtle, PawPrint } from 'lucide-react';
import { Tweet, PET_CATEGORIES } from '@/lib/types';
import { cn } from '@/lib/utils';

interface TweetCardProps {
  tweet: Tweet;
  onLike: (id: string) => void;
}

const iconMap: Record<string, React.ElementType> = {
  Dog, Cat, Bird, Fish, Turtle, PawPrint,
};

const TweetCard: React.FC<TweetCardProps> = ({ tweet, onLike }) => {
  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (minutes < 1) return 'עכשיו';
    if (minutes < 60) return `לפני ${minutes} דק׳`;
    if (hours < 24) return `לפני ${hours} שע׳`;
    return `לפני ${days} ימים`;
  };

  const catInfo = PET_CATEGORIES.find(c => c.value === tweet.category);
  const CatIcon = catInfo ? iconMap[catInfo.icon] : PawPrint;

  return (
    <Card className="mb-3 hover:shadow-md transition-all duration-200 border-border/60 dark:border-border/40 group animate-fade-in">
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div className={cn(
            "w-11 h-11 rounded-full flex items-center justify-center shrink-0",
            "bg-gradient-to-br from-amber-400 to-orange-500 shadow-md shadow-orange-200/50 dark:shadow-orange-900/30"
          )}>
            {CatIcon && <CatIcon className="h-5 w-5 text-white" />}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="font-semibold text-foreground text-sm">{tweet.authorName}</span>
              {catInfo && (
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-orange-100 dark:bg-orange-900/40 text-orange-700 dark:text-orange-300 font-medium">
                  {catInfo.emoji} {catInfo.label}
                </span>
              )}
              <span className="text-muted-foreground text-xs mr-auto">
                {formatTime(tweet.timestamp)}
              </span>
            </div>
            <p className="text-foreground leading-relaxed whitespace-pre-wrap text-[15px] mb-3">
              {tweet.content}
            </p>
            <div className="flex items-center gap-6">
              <button
                onClick={() => onLike(tweet.id)}
                className={cn(
                  "flex items-center gap-1.5 text-xs transition-all duration-200 hover:scale-110",
                  tweet.liked
                    ? "text-red-500"
                    : "text-muted-foreground hover:text-red-500"
                )}
              >
                <Heart className={cn("h-4 w-4", tweet.liked && "fill-current")} />
                <span>{tweet.likes > 0 ? tweet.likes : ''}</span>
              </button>
              <button className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-blue-500 transition-colors">
                <MessageCircle className="h-4 w-4" />
              </button>
              <button className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-green-500 transition-colors">
                <Share2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TweetCard;
