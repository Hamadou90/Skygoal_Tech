import '../styles/globals.css'
import { useState, useEffect } from "react";
import Footer from '../components/Footer';
import { useRouter } from 'next/router';
import LoadingBar from 'react-top-loading-bar';


function MyApp({ Component, pageProps }) {

  const [user, setUser] = useState({ value: null });
  const [key, setKey] = useState();
  const [progress, setProgress] = useState(0);
  const router = useRouter();

  useEffect(() => {
    router.events.on('routeChangeComplete', () => {
      setProgress(100);
    });
    router.events.on('routeChangeStart', () => { 
      setProgress(40);
    });

    const connectedUser = JSON.parse(localStorage.getItem('connectedUser'));
    if (connectedUser) {
      setUser({ value: connectedUser.token, email: connectedUser.email });
      console.log(user);
    }
    setKey(Math.random());

  }, [router.query]);

  return <>
    <LoadingBar
      color='#0004FF'
      progress={progress}
      waitingTime={200}
      onLoaderFinished={() => setProgress(0)}
    />
    <Component user={user} {...pageProps} />
    <Footer />
  </>
}

export default MyApp;
