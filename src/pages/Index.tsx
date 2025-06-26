
import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import TweetComposer from '@/components/TweetComposer';
import TweetCard from '@/components/TweetCard';

interface Tweet {
  id: string;
  content: string;
  timestamp: Date;
}

const Index = () => {
  const [tweets, setTweets] = useState<Tweet[]>([]);

  // Load tweets from localStorage on component mount
  useEffect(() => {
    const savedTweets = localStorage.getItem('petTweets');
    if (savedTweets) {
      const parsedTweets = JSON.parse(savedTweets).map((tweet: any) => ({
        ...tweet,
        timestamp: new Date(tweet.timestamp)
      }));
      setTweets(parsedTweets);
    } else {
      // Add some sample tweets if no saved tweets exist
      const sampleTweets: Tweet[] = [
        {
          id: '1',
          content: 'הכלב שלי גילה היום שהוא יכול לתפוס את הזנב שלו... הוא לא מפסיק לרוץ במעגלים! 🐕',
          timestamp: new Date(Date.now() - 60000)
        },
        {
          id: '2',
          content: 'החתולה שלי החליטה שהמקלדת שלי היא המקום הכי נוח בבית. איך אני אמור לעבוד ככה? 😸',
          timestamp: new Date(Date.now() - 120000)
        },
        {
          id: '3',
          content: 'טיפ: אם אתם רוצים שהחיות שלכם יהיו בריאות, תזכרו לתת להן מים נקיים כל יום! 💧',
          timestamp: new Date(Date.now() - 180000)
        }
      ];
      setTweets(sampleTweets);
    }
  }, []);

  // Save tweets to localStorage whenever tweets change
  useEffect(() => {
    localStorage.setItem('petTweets', JSON.stringify(tweets));
  }, [tweets]);

  const addTweet = (content: string) => {
    const newTweet: Tweet = {
      id: Date.now().toString(),
      content,
      timestamp: new Date()
    };
    setTweets(prevTweets => [newTweet, ...prevTweets]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50">
      <Header />
      <main className="container mx-auto px-4 py-8 max-w-2xl">
        <TweetComposer onTweet={addTweet} />
        
        <div className="space-y-0">
          {tweets.length === 0 ? (
            <div className="text-center py-12">
              <Cat className="h-16 w-16 mx-auto text-gray-400 mb-4" />
              <p className="text-gray-500 text-lg">עדיין אין ציוצים</p>
              <p className="text-gray-400">היו הראשונים לשתף!</p>
            </div>
          ) : (
            tweets.map(tweet => (
              <TweetCard key={tweet.id} tweet={tweet} />
            ))
          )}
        </div>
      </main>
      
      <footer className="bg-orange-100 text-center py-6 mt-12">
        <p className="text-orange-800">
          נבנה באהבה לחיות המחמד 🐾
        </p>
      </footer>
    </div>
  );
};

export default Index;
