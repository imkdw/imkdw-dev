import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ArticleDetail from "./pages/ArticleDetail";
import WriteArticle from "./pages/WriteArticle";
import EditArticle from "./pages/EditArticle";
import Profile from "./pages/Profile";
import Notifications from "./pages/Notifications";
import Series from "./pages/Series";
import SeriesDetail from "./pages/SeriesDetail";
import Articles from "./pages/Articles";
import Terminal from "./pages/Terminal";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="dark" storageKey="tech-blog-theme">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/articles/:slug" element={<ArticleDetail />} />
            <Route path="/write" element={<WriteArticle />} />
            <Route path="/edit/:slug" element={<EditArticle />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/series" element={<Series />} />
            <Route path="/series/:slug" element={<SeriesDetail />} />
            <Route path="/articles" element={<Articles />} />
            <Route path="/terminal" element={<Terminal />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
