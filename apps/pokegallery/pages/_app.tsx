import React from 'react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import Image from "next/image";
import './styles.css';

function PokeGalleryApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>pokeGallery!</title>
      </Head>
      <div className="app">
        <header className="">
          <Image src="/images/pokemon.png" width="3445" height="1261" layout={"responsive"} />
          <br /><br />
          <h1>yo! pokeGallery!</h1>
        </header>
        <main>
          <Component {...pageProps} />
        </main>
      </div>
    </>
  );
}

export default PokeGalleryApp;
