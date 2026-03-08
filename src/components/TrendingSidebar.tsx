import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, Hash } from 'lucide-react';

const trends = [
  { tag: 'כלבים_חמודים', count: 2843 },
  { tag: 'חתולי_רחוב', count: 1256 },
  { tag: 'אימוץ_חיות', count: 987 },
  { tag: 'טיפים_לבעלי_חיות', count: 654 },
  { tag: 'ציפורים_בישראל', count: 432 },
];

const TrendingSidebar: React.FC = () => {
  return (
    <Card className="border-border/60 dark:border-border/40">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-semibold flex items-center gap-2 text-foreground">
          <TrendingUp className="h-4 w-4 text-orange-500" />
          טרנדים
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-3">
          {trends.map((trend) => (
            <div key={trend.tag} className="group cursor-pointer">
              <div className="flex items-center gap-1.5">
                <Hash className="h-3 w-3 text-orange-400" />
                <span className="text-sm font-medium text-foreground group-hover:text-orange-500 transition-colors">
                  {trend.tag}
                </span>
              </div>
              <p className="text-[11px] text-muted-foreground mr-[18px]">
                {trend.count.toLocaleString()} ציוצים
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TrendingSidebar;
