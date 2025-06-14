import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/contexts/theme-context";
import { FilterProvider } from "@/contexts/filter-context";
import { FavoritesProvider } from "@/contexts/favorites-context";
import { Home } from "@/pages/home";
import { PatternDetail } from "@/pages/pattern-detail";
import { Architectures } from "@/pages/architectures";
import { Languages } from "@/pages/languages";
import { Creational } from "@/pages/creational";
import { Structural } from "@/pages/structural";
import { Behavioral } from "@/pages/behavioral";
import { Architectural } from "@/pages/architectural";

import { Favorites } from "@/pages/favorites";
import NotFound from "@/pages/not-found";

function Router() {
  return (
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
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <FilterProvider>
          <FavoritesProvider>
            <TooltipProvider>
              <Toaster />
              <Router />
            </TooltipProvider>
          </FavoritesProvider>
        </FilterProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
