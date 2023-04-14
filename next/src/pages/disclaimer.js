import Head from 'next/head';
import Layout from '@c/layouts/stdLayout';
import Disclaimer from '@c/Disclaimer';

const Page = () => {
  return (
    <>
      <>
        <Head>
          <title>About - Zoeschinger</title>
          <meta name='description' content='About page of Magnus Zoeschinger' />
          <meta name='viewport' content='width=device-width, initial-scale=1' />
          <link rel='icon' href='/favicon.ico' />
        </Head>

        <Disclaimer />
      </>
    </>
  );
};

Page.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default Page;