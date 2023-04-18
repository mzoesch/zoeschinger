import Head from 'next/head';
import Demo from '@c/Projects/SnakeAI/demo';

const Page = () => {
  return (
    <>
      <Head>
        <title>Snake AI Demo - Zoeschinger</title>
        <meta
          name='description'
          content='SnakeAI Demo from Magnus Zoeschinger'
        />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Demo />
    </>
  );
};

export default Page;
