import Head from 'next/head';
import Layout from '@c/layouts/projectsLayout';
import SnakeAI from '@c/Projects/SnakeAI';

const Page = () => {
  return (
    <>
      <>
        <Head>
          <title>Snake AI - Zoeschinger</title>
          <meta name='description' content='Snake AI from Magnus Zoeschinger' />
          <meta name='viewport' content='width=device-width, initial-scale=1' />
          <link rel='icon' href='/favicon.ico' />
        </Head>

        <SnakeAI />
      </>
    </>
  );
};

Page.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default Page;
