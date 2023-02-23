import Head from 'next/head';
import Layout from '@c/layouts/stdLayout';
import About from '@c/About';

const Page = () => {
  return (
    <>
      <Head>
        <title>zoeschinger - about</title>
        <meta
          name='description'
          content='Information about Magnus Zoeschinger'
        />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <About />
    </>
  );
};

Page.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default Page;
