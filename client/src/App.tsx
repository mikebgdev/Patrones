import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/contexts/theme-context";
import { FilterProvider } from "@/contexts/filter-context";
import { Home } from "@/pages/home";
import { PatternDetail } from "@/pages/pattern-detail";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/pattern/:slug" component={PatternDetail} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <FilterProvider>
          <TooltipProvider>
            <Toaster />
            <Router />
          </TooltipProvider>
        </FilterProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
