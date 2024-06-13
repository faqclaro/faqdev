// pages/_app.js

import '../styles/globals.css';
import Footer from '../components/Footer';
import Banner from '../components/Banner';

import { useEffect } from 'react';

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    if (typeof window !== "undefined") {
      const { StoryblokBridge } = require("storyblok-js-client");
      if (typeof StoryblokBridge !== "undefined") {
        const bridge = new StoryblokBridge();
        bridge.on(['input', 'published', 'change'], () => {
          window.location.reload(true);
        });
      }
    }
  }, []);

  return (
    <>
      <Banner />
      <Component {...pageProps} />
      <Footer />
    </>
  );
}

export default MyApp;
