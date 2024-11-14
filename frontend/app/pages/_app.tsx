import '../styles/globals.css';
import type { AppProps } from 'next/app';
import NavBar from '../components/Navbar';
import Header from '../components/Header'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Header />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;