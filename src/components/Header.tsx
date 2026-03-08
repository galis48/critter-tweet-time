import React from 'react';
import { PawPrint, LogOut, UserPen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import ThemeToggle from '@/components/ThemeToggle';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    toast({ title: 'להתראות! 🐾', description: 'התנתקת בהצלחה' });
  };

  const initials = user?.displayName
    ? user.displayName.slice(0, 2)
    : user?.email?.slice(0, 2)?.toUpperCase() || '??';

  return (
    <header className="bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 dark:from-orange-800 dark:via-amber-800 dark:to-orange-900 text-white shadow-xl">
      <div className="container mx-auto px-4 py-4 max-w-4xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-2">
              <PawPrint className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight">PetTweet</h1>
              <p className="text-orange-100 text-[10px]">הרשת לאוהבי חיות 🐾</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {user && (
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8 border-2 border-white/30">
                  <AvatarImage src={user.photoURL || undefined} />
                  <AvatarFallback className="bg-orange-700 text-white text-xs">{initials}</AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium hidden sm:inline">{user.displayName || user.email}</span>
                <Button variant="ghost" size="icon" onClick={handleLogout} className="text-white hover:bg-white/20 h-8 w-8">
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            )}
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
