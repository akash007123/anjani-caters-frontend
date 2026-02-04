import { ReactNode, useEffect } from 'react';
import PreHeader from './PreHeader';
import Header from './Header';
import Footer from './Footer';
import FloatingWhatsApp from '../FloatingWhatsApp';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  // Restore scroll position on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col theme-transition">
      <PreHeader />
      <Header />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
};

export default Layout;
