import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Cat } from 'lucide-react';

interface TweetComposerProps {
  onTweet: (content: string) => void;
}

const TweetComposer: React.FC<TweetComposerProps> = ({ onTweet }) => {
  const [content, setContent] = useState('');

  const handleSubmit = () => {
    if (content.trim()) {
      onTweet(content);
      setContent('');
    }
  };

  return (
    <Card className="mb-6 bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-950 dark:to-amber-950 border-orange-200 dark:border-orange-800">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-orange-800 dark:text-orange-300">
          <Cat className="h-5 w-5" />
          מה עובר לך בראש על חיות המחמד?
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="שתף את המחשבות שלך על חיות מחמד..."
          className="mb-4 min-h-[100px] border-orange-200 dark:border-orange-800 focus:border-orange-400"
          maxLength={280}
        />
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">
            {content.length}/280
          </span>
          <Button 
            onClick={handleSubmit}
            disabled={!content.trim()}
            className="bg-orange-500 hover:bg-orange-600 dark:bg-orange-600 dark:hover:bg-orange-700 text-white"
          >
            פרסם ציוץ
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default TweetComposer;
