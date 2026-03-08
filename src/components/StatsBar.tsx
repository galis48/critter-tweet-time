import React from 'react';
import { Users, MessageCircle, Heart, PawPrint } from 'lucide-react';

interface StatsBarProps {
  tweetCount: number;
  totalLikes: number;
}

const StatsBar: React.FC<StatsBarProps> = ({ tweetCount, totalLikes }) => {
  const stats = [
    { icon: MessageCircle, label: 'ציוצים', value: tweetCount },
    { icon: Heart, label: 'לייקים', value: totalLikes },
    { icon: Users, label: 'חברי קהילה', value: 1247 },
    { icon: PawPrint, label: 'חיות מאושרות', value: 3891 },
  ];

  return (
    <div className="grid grid-cols-4 gap-3 mb-6">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="bg-card border border-border/60 dark:border-border/40 rounded-xl p-3 text-center hover:shadow-md transition-shadow"
        >
          <stat.icon className="h-5 w-5 mx-auto mb-1 text-orange-500" />
          <p className="text-lg font-bold text-foreground">{stat.value.toLocaleString()}</p>
          <p className="text-[10px] text-muted-foreground">{stat.label}</p>
        </div>
      ))}
    </div>
  );
};

export default StatsBar;
