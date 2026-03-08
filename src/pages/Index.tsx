import React, { useState, useEffect } from 'react';
import { PawPrint } from 'lucide-react';
import Header from '@/components/Header';
import TweetComposer from '@/components/TweetComposer';
import TweetCard from '@/components/TweetCard';
import CategoryFilter from '@/components/CategoryFilter';
import StatsBar from '@/components/StatsBar';
import TrendingSidebar from '@/components/TrendingSidebar';
import { Tweet, PetCategory, AUTHOR_NAMES } from '@/lib/types';

const Index = () => {
  const [tweets, setTweets] = useState<Tweet[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<PetCategory | 'all'>('all');

  useEffect(() => {
    const savedTweets = localStorage.getItem('petTweets_v2');
    if (savedTweets) {
      const parsedTweets = JSON.parse(savedTweets).map((tweet: any) => ({
        ...tweet,
        timestamp: new Date(tweet.timestamp),
      }));
      setTweets(parsedTweets);
    } else {
      const sampleTweets: Tweet[] = [
        {
          id: '1',
          content: 'הכלב שלי גילה היום שהוא יכול לתפוס את הזנב שלו... הוא לא מפסיק לרוץ במעגלים! 🐕😂',
          timestamp: new Date(Date.now() - 60000),
          category: 'dogs',
          likes: 12,
          liked: false,
          authorName: 'אוהב כלבים',
        },
        {
          id: '2',
          content: 'החתולה שלי החליטה שהמקלדת שלי היא המקום הכי נוח בבית. איך אני אמור לעבוד ככה? 😸💻',
          timestamp: new Date(Date.now() - 120000),
          category: 'cats',
          likes: 24,
          liked: true,
          authorName: 'חובבת חתולים',
        },
        {
          id: '3',
          content: 'טיפ: אם אתם רוצים שהחיות שלכם יהיו בריאות, תזכרו לתת להן מים נקיים כל יום! 💧🐾',
          timestamp: new Date(Date.now() - 180000),
          category: 'other',
          likes: 45,
          liked: false,
          authorName: 'רופא וטרינר',
        },
        {
          id: '4',
          content: 'הציפור שלי למדה לחקות את צליל האזעקה של הבית. עכשיו אף אחד לא יודע מתי יש אזעקה אמיתית 🐦🔔',
          timestamp: new Date(Date.now() - 300000),
          category: 'birds',
          likes: 8,
          liked: false,
          authorName: 'מאלף ציפורים',
        },
        {
          id: '5',
          content: 'הדג הזהב שלי כבר חמש שנים איתי! מי אמר שדגים לא חיים הרבה? 🐠✨',
          timestamp: new Date(Date.now() - 500000),
          category: 'fish',
          likes: 17,
          liked: false,
          authorName: 'שומר הדגים',
        },
      ];
      setTweets(sampleTweets);
    }
  }, []);

  useEffect(() => {
    if (tweets.length > 0) {
      localStorage.setItem('petTweets_v2', JSON.stringify(tweets));
    }
  }, [tweets]);

  const addTweet = (content: string, category: PetCategory) => {
    const randomName = AUTHOR_NAMES[Math.floor(Math.random() * AUTHOR_NAMES.length)];
    const newTweet: Tweet = {
      id: Date.now().toString(),
      content,
      timestamp: new Date(),
      category,
      likes: 0,
      liked: false,
      authorName: randomName,
    };
    setTweets((prev) => [newTweet, ...prev]);
  };

  const handleLike = (id: string) => {
    setTweets((prev) =>
      prev.map((t) =>
        t.id === id
          ? { ...t, liked: !t.liked, likes: t.liked ? t.likes - 1 : t.likes + 1 }
          : t
      )
    );
  };

  const filteredTweets =
    selectedCategory === 'all'
      ? tweets
      : tweets.filter((t) => t.category === selectedCategory);

  const totalLikes = tweets.reduce((sum, t) => sum + t.likes, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50/50 to-orange-50 dark:from-background dark:via-background dark:to-background">
      <Header />
      <main className="container mx-auto px-4 py-6 max-w-4xl">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_260px] gap-6">
          <div>
            <StatsBar tweetCount={tweets.length} totalLikes={totalLikes} />
            <TweetComposer onTweet={addTweet} />
            <CategoryFilter selected={selectedCategory} onSelect={setSelectedCategory} />

            <div className="space-y-0">
              {filteredTweets.length === 0 ? (
                <div className="text-center py-16">
                  <PawPrint className="h-16 w-16 mx-auto text-muted-foreground/40 mb-4" />
                  <p className="text-muted-foreground text-lg font-medium">אין ציוצים בקטגוריה הזו</p>
                  <p className="text-muted-foreground/60 text-sm">היו הראשונים לשתף!</p>
                </div>
              ) : (
                filteredTweets.map((tweet) => (
                  <TweetCard key={tweet.id} tweet={tweet} onLike={handleLike} />
                ))
              )}
            </div>
          </div>

          <aside className="hidden lg:block sticky top-6 self-start">
            <TrendingSidebar />
          </aside>
        </div>
      </main>

      <footer className="bg-orange-100 dark:bg-orange-950/50 text-center py-6 mt-12 border-t border-orange-200/50 dark:border-orange-900/30">
        <p className="text-orange-800 dark:text-orange-300 text-sm">
          נבנה באהבה לחיות המחמד 🐾
        </p>
      </footer>
    </div>
  );
};

export default Index;
