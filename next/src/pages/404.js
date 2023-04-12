import Head from 'next/head';
import FourZeroFour from '@c/FourZeroFour';
import Layout from '@c/layouts/stdLayout';

const Page = () => {
  return (
    <>
      <Head>
        <title>404 - Zoeschinger</title>
        <meta name='description' content='zoeschinger 404 Page' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <FourZeroFour />
    </>
  );
};

Page.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default Page;
