import React from 'react';
import { PawPrint } from 'lucide-react';
import ThemeToggle from '@/components/ThemeToggle';

const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 dark:from-orange-800 dark:via-amber-800 dark:to-orange-900 text-white shadow-xl">
      <div className="container mx-auto px-4 py-5 max-w-2xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-2">
              <PawPrint className="h-7 w-7" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">PetTweet</h1>
              <p className="text-orange-100 text-xs">הרשת החברתית לאוהבי חיות 🐾</p>
            </div>
          </div>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};

export default Header;
