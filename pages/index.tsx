import React from 'react';
import { NextPage } from 'next';
import Link from 'next/link';

const Home: NextPage = () => {
  return (
    <main>
      <h1>SSR Demo</h1>
      <Link href="/ssr">SSR</Link>

      <h1>SPA Demo</h1>
      <Link href="/spa">SPA</Link>
    </main>
  );
};

export default Home;
