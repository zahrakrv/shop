import { ReactNode } from 'react';
import HeaderSite from './../components/header';
import Footer from './../components/footer';

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <HeaderSite />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
