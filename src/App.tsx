import { Route, Switch } from 'wouter';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { FilterProvider } from '@/contexts/FilterContext';
import { FavoritesProvider } from '@/contexts/FavoritesContext';
import { Home } from '@/pages/Home';
import { PatternDetail } from '@/pages/PatternDetail';
import { Architectures } from '@/pages/Architectures';
import { Languages } from '@/pages/Languages';
import { Favorites } from '@/pages/Favorites';
import { FirebaseAdmin } from '@/pages/FirebaseAdmin';
import { useEffect } from 'react';
import { ToastProvider } from './contexts/ToastContext';

function App() {
  useEffect(() => {
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
    const handleErrorEvent = (event: ErrorEvent) => {
      const umami = (
        window as Window & {
          umami?: {
            track: (event: string, data?: Record<string, unknown>) => void;
          };
        }
      ).umami;
      if (umami) {
        umami.track('Unhandled Error', {
          message: event.message,
          stack: event.error?.stack,
        });
      }
    };
    const handleRejection = (event: PromiseRejectionEvent) => {
      const umami = (
        window as Window & {
          umami?: {
            track: (event: string, data?: Record<string, unknown>) => void;
          };
        }
      ).umami;
      if (umami) {
        umami.track('Unhandled Rejection', { reason: event.reason });
      }
    };
    window.addEventListener('error', handleErrorEvent);
    window.addEventListener('unhandledrejection', handleRejection);
    return () => {
      window.removeEventListener('error', handleErrorEvent);
      window.removeEventListener('unhandledrejection', handleRejection);
    };
  }, []);

  return (
    <ThemeProvider>
      <ToastProvider>
        <FilterProvider>
          <FavoritesProvider>
            <TooltipProvider>
              <Toaster />

              <Switch>
                <Route path="/" component={Home} />
                <Route path="/pattern/:slug" component={PatternDetail} />
                <Route path="/architectures" component={Architectures} />
                <Route path="/languages" component={Languages} />
                <Route path="/favorites" component={Favorites} />
                <Route path="/admin/firebase" component={FirebaseAdmin} />
              </Switch>
            </TooltipProvider>
          </FavoritesProvider>
        </FilterProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}

export default App;
