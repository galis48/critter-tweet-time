import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PawPrint, Mail, Lock, User, Eye, EyeOff } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { signUp, signIn, signInWithGoogle } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isSignUp) {
        if (!displayName.trim()) {
          toast({ title: 'שגיאה', description: 'נא להזין שם תצוגה', variant: 'destructive' });
          setLoading(false);
          return;
        }
        await signUp(email, password, displayName);
        toast({ title: 'ברוכים הבאים! 🐾', description: 'ההרשמה הצליחה' });
      } else {
        await signIn(email, password);
        toast({ title: 'שלום שוב! 🐾', description: 'התחברת בהצלחה' });
      }
      navigate('/');
    } catch (error: any) {
      const msg = error?.code === 'auth/email-already-in-use'
        ? 'האימייל כבר רשום'
        : error?.code === 'auth/wrong-password' || error?.code === 'auth/user-not-found'
          ? 'אימייל או סיסמה שגויים'
          : error?.code === 'auth/weak-password'
            ? 'הסיסמה חלשה מדי (מינימום 6 תווים)'
            : 'אירעה שגיאה, נסה שוב';
      toast({ title: 'שגיאה', description: msg, variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    try {
      await signInWithGoogle();
      toast({ title: 'שלום! 🐾', description: 'התחברת עם Google' });
      navigate('/');
    } catch (error: any) {
      if (error?.code !== 'auth/popup-closed-by-user') {
        toast({ title: 'שגיאה', description: 'ההתחברות עם Google נכשלה', variant: 'destructive' });
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50/50 to-orange-50 dark:from-background dark:via-background dark:to-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md border-orange-200/50 dark:border-orange-800/50 shadow-xl">
        <div className="h-1.5 bg-gradient-to-r from-orange-400 via-amber-400 to-orange-500 rounded-t-lg" />
        <CardHeader className="text-center pb-2">
          <div className="mx-auto bg-gradient-to-br from-orange-400 to-amber-500 rounded-2xl p-3 w-fit mb-3">
            <PawPrint className="h-8 w-8 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold text-foreground">
            {isSignUp ? 'הצטרפו ל-PetTweet' : 'ברוכים השבים'}
          </CardTitle>
          <p className="text-sm text-muted-foreground mt-1">
            {isSignUp ? 'צרו חשבון ושתפו את האהבה לחיות' : 'התחברו כדי להמשיך לצייץ'}
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button
            type="button"
            variant="outline"
            className="w-full gap-2 h-11"
            onClick={handleGoogle}
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            המשך עם Google
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">או</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
            {isSignUp && (
              <div className="relative">
                <User className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="שם תצוגה"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className="pr-10 h-11"
                  dir="rtl"
                />
              </div>
            )}
            <div className="relative">
              <Mail className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                type="email"
                placeholder="אימייל"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="pr-10 h-11"
                dir="rtl"
              />
            </div>
            <div className="relative">
              <Lock className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                type={showPassword ? 'text' : 'password'}
                placeholder="סיסמה"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="pr-10 pl-10 h-11"
                dir="rtl"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute left-3 top-3 text-muted-foreground hover:text-foreground"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-orange-500 hover:bg-orange-600 dark:bg-orange-600 dark:hover:bg-orange-700 text-white h-11"
            >
              {loading ? '...' : isSignUp ? 'הרשמה' : 'התחברות'}
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground">
            {isSignUp ? 'כבר יש לך חשבון?' : 'אין לך חשבון?'}{' '}
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-orange-500 hover:text-orange-600 font-medium underline-offset-4 hover:underline"
            >
              {isSignUp ? 'התחבר' : 'הירשם'}
            </button>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;
