import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import AboutPage from "./pages/AboutPage";
import ProgramsPage from "./pages/ProgramsPage";
import HowToHelpPage from "./pages/HowToHelpPage";
import ContactPage from "./pages/ContactPage";
import DonatePage from "./pages/DonatePage";
import VolunteerPage from "./pages/VolunteerPage";
import FAQPage from "./pages/FAQPage";
import BlogPage from "./pages/BlogPage";
import BlogPostPage from "./pages/BlogPostPage";
import ForumPage from "./pages/ForumPage";
import CreateBlogPostPage from "./pages/admin/CreateBlogPostPage";
import EditBlogPostPage from "./pages/admin/EditBlogPostPage";
import AdminDashboardPage from "./pages/admin/AdminDashboardPage";
import ProfilePage from "./pages/ProfilePage";
import { ThemeProvider } from "./components/theme-provider";
import { useGA4 } from "./hooks/useGA4";

const queryClient = new QueryClient();

// Componente wrapper para rastrear vistas de página
const AppWithTracking = () => {
  const location = useLocation();
  const { trackPageView } = useGA4();

  // Rastrear cada cambio de ruta como una vista de página
  React.useEffect(() => {
    trackPageView(location.pathname + location.search);
  }, [location, trackPageView]);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/programs" element={<ProgramsPage />} />
              <Route path="/how-to-help" element={<HowToHelpPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/donate" element={<DonatePage />} />
              <Route path="/volunteer" element={<VolunteerPage />} />
              <Route path="/faq" element={<FAQPage />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/blog/:id" element={<BlogPostPage />} />
              <Route path="/forum" element={<ForumPage />} />
              <Route path="/admin/blog/new" element={<CreateBlogPostPage />} />
              <Route path="/admin/blog/edit/:id" element={<EditBlogPostPage />} />
              <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

const App = () => (
  <AppWithTracking />
);

export default App;