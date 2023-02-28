import Head from 'next/head';
import Home from '@c/Home';

const Page = () => {
  return (
    <>
      <Head>
        <title>zoeschinger</title>
        <meta
          name='description'
          content='Information about Magnus Zoeschinger'
        />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Home />
    </>
  );
};

export default Page;
