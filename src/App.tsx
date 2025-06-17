import { Route, Switch } from 'wouter';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { FilterProvider } from '@/contexts/FilterContext';
import { FavoritesProvider } from '@/contexts/FavoritesContext';
import { Home } from '@/pages/home';
import { PatternDetail } from '@/pages/pattern-detail';
import { Architectures } from '@/pages/architectures';
import { Languages } from '@/pages/languages';
import { Creational } from '@/pages/creational';
import { Structural } from '@/pages/structural';
import { Behavioral } from '@/pages/behavioral';
import { Architectural } from '@/pages/architectural';

import { Favorites } from '@/pages/favorites';
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
    const handleErrorEvent = (event: ErrorEvent) => {
      const umami = (window as any).umami;
      if (umami) {
        umami.track('Unhandled Error', {
          message: event.message,
          stack: event.error?.stack,
        });
      }
    };
    const handleRejection = (event: PromiseRejectionEvent) => {
      const umami = (window as any).umami;
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
      <FilterProvider>
        <FavoritesProvider>
          <TooltipProvider>
            <Toaster />

            <Switch>
              <Route path="/" component={Home} />
              <Route path="/pattern/:slug" component={PatternDetail} />
              <Route path="/architectures" component={Architectures} />
              <Route path="/languages" component={Languages} />
              <Route path="/creational" component={Creational} />
              <Route path="/structural" component={Structural} />
              <Route path="/behavioral" component={Behavioral} />
              <Route path="/architectural" component={Architectural} />
              <Route path="/favorites" component={Favorites} />
            </Switch>
          </TooltipProvider>
        </FavoritesProvider>
      </FilterProvider>
    </ThemeProvider>
  );
}

export default App;
