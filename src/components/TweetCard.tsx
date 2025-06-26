
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Dog } from 'lucide-react';

interface Tweet {
  id: string;
  content: string;
  timestamp: Date;
}

interface TweetCardProps {
  tweet: Tweet;
}

const TweetCard: React.FC<TweetCardProps> = ({ tweet }) => {
  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (minutes < 1) return 'עכשיו';
    if (minutes < 60) return `לפני ${minutes} דקות`;
    if (hours < 24) return `לפני ${hours} שעות`;
    return `לפני ${days} ימים`;
  };

  return (
    <Card className="mb-4 hover:shadow-md transition-shadow duration-200 border-amber-200">
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center">
            <Dog className="h-5 w-5 text-white" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="font-medium text-gray-900">חובב חיות</span>
              <span className="text-gray-500 text-sm">
                {formatTime(tweet.timestamp)}
              </span>
            </div>
            <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">
              {tweet.content}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TweetCard;
