import Head from 'next/head';
import Layout from '@c/layouts/stdLayout';
import Demo from '@c/Projects/Check24hc/Demo';

const Page = () => {
  return (
    <>
      <Head>
        <title>Check 24 Holiday Challenge Demo - Zoeschinger</title>
        <meta
          name='description'
          content='Check 24 Holiday Challenge Demo from Magnus Zoeschinger'
        />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Demo />
    </>
  );
};

export default Page;
