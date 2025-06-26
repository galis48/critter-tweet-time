
import React from 'react';
import { Cat, Dog } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-center gap-3">
          <Cat className="h-8 w-8" />
          <h1 className="text-3xl font-bold">פט טוויטר</h1>
          <Dog className="h-8 w-8" />
        </div>
        <p className="text-center mt-2 text-orange-100">
          המקום לשתף את האהבה שלכם לחיות מחמד
        </p>
      </div>
    </header>
  );
};

export default Header;
