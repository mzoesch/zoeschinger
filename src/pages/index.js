import Head from 'next/head';
import Layout from '@c/layouts/stdLayout';
import Home from '@c/Home';

const Page = () => {
  return (
    <>
      <Head>
        <title>zoeschinger home</title>
        <meta name='description' content='zoeschinger index.html' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Home />
    </>
  );
};

Page.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default Page;
