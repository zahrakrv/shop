import { ReactNode } from 'react';
import HeaderSite from './../components/header';
import Footer from './../components/footer2';
import NavBar from '@/components/NavBar';

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    // min-[320px]:w-max max-[600px]:w-max
    <div className="w-max ">
      <HeaderSite />
      <NavBar />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
