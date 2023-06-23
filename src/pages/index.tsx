// import Image from 'next/image';
// import { Inter } from 'next/font/google';
import Layout from '@/layout/layout';
import Header from '../components/header';
import NavBar from './../components/NavBar';
import Slider from './slider';
// import MainContent from './../components/MainContent';
import MainContent2 from './../components/MainContent2';

// const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <>
      <Layout>
        <main>
          {/* <MainContent /> */}
          <Slider />
          <MainContent2 />
          {/* <NavBar /> */}
        </main>
      </Layout>
    </>
  );
}
