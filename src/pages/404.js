import Head from 'next/head';
import Layout from '@c/layouts/stdLayout';
import Four0Four from '@c/four0four';

const Page = () => {
  return (
    <>
      <Head>
        <title>forOfor</title>
        <meta name='description' content='zoeschinger 404 Page' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Four0Four />
    </>
  );
};

Page.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default Page;
