import { Link } from 'vike-react/Link';
import { AttributionFooter } from "@/components/AttributionFooter";
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const NotFound = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4 text-primary">404</h1>
          <p className="text-xl text-foreground mb-4">Oops! Page not found</p>
          <Link to="/" className="text-primary hover:underline underline">
            Return to Home
          </Link>
        </div>
      </main>
      <Footer />
      <AttributionFooter />
    </div>
  );
};

export default NotFound;