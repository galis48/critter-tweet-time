import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Send, Dog, Cat, Bird, Fish, Turtle, PawPrint } from 'lucide-react';
import { PetCategory, PET_CATEGORIES } from '@/lib/types';
import { cn } from '@/lib/utils';

interface TweetComposerProps {
  onTweet: (content: string, category: PetCategory) => void;
}

const iconMap: Record<string, React.ElementType> = {
  Dog, Cat, Bird, Fish, Turtle, PawPrint,
};

const TweetComposer: React.FC<TweetComposerProps> = ({ onTweet }) => {
  const [content, setContent] = useState('');
  const [category, setCategory] = useState<PetCategory>('dogs');

  const handleSubmit = () => {
    if (content.trim()) {
      onTweet(content, category);
      setContent('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      handleSubmit();
    }
  };

  const charPercent = (content.length / 280) * 100;

  return (
    <Card className="mb-6 border-orange-200/50 dark:border-orange-800/50 shadow-lg shadow-orange-100/50 dark:shadow-orange-900/20 overflow-hidden">
      <div className="h-1 bg-gradient-to-r from-orange-400 via-amber-400 to-orange-500" />
      <CardContent className="p-5">
        <Textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="מה קורה עם החיות שלכם היום? 🐾"
          className="mb-4 min-h-[90px] border-orange-200/60 dark:border-orange-800/60 focus:border-orange-400 dark:focus:border-orange-500 resize-none text-base bg-transparent"
          maxLength={280}
        />

        <div className="flex flex-wrap gap-1.5 mb-4">
          {PET_CATEGORIES.map((cat) => {
            const Icon = iconMap[cat.icon];
            return (
              <button
                key={cat.value}
                onClick={() => setCategory(cat.value)}
                className={cn(
                  "px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-150",
                  "border hover:scale-105",
                  category === cat.value
                    ? "bg-orange-500 dark:bg-orange-600 text-white border-orange-500 dark:border-orange-600"
                    : "bg-muted/50 text-muted-foreground border-border hover:border-orange-300 dark:hover:border-orange-700"
                )}
              >
                <span className="flex items-center gap-1">
                  {Icon && <Icon className="h-3 w-3" />}
                  {cat.label}
                </span>
              </button>
            );
          })}
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="relative h-6 w-6">
              <svg className="h-6 w-6 -rotate-90" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" fill="none" strokeWidth="2" className="stroke-muted" />
                <circle
                  cx="12" cy="12" r="10" fill="none" strokeWidth="2"
                  strokeDasharray={`${charPercent * 0.628} 62.8`}
                  className={cn(
                    "transition-all duration-200",
                    charPercent > 90 ? "stroke-destructive" : charPercent > 70 ? "stroke-orange-400" : "stroke-orange-500"
                  )}
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <span className="text-xs text-muted-foreground">{content.length}/280</span>
          </div>
          <Button
            onClick={handleSubmit}
            disabled={!content.trim()}
            className="bg-orange-500 hover:bg-orange-600 dark:bg-orange-600 dark:hover:bg-orange-700 text-white rounded-full px-6 gap-2"
          >
            <Send className="h-4 w-4" />
            ציוץ
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default TweetComposer;
