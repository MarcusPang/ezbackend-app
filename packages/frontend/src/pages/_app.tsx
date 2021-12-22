import { AppProps } from 'next/app';
import 'react-loading-skeleton/dist/skeleton.css';
import '../styles/globals.css';

export default function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
