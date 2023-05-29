// import Image from 'next/image';
// import { Inter } from 'next/font/google';
import Header from '../components/header';
import NavBar from './../components/NavBar';

// const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <>
      <main>
        <Header />
        <NavBar />
      </main>
    </>
  );
}
