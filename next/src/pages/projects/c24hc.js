import Head from 'next/head';
import Layout from '@c/layouts/projectsLayout';
// import C24HC from '@c/projects/C24HC';
import SAlgo from '@c/Projects/SAlgo';

const Page = () => {
  return (
    <>
      <>
        <Head>
          <title>SAlgo - Zoeschinger</title>
          <meta name='description' content='Projects of Magnus Zoeschinger' />
          <meta name='viewport' content='width=device-width, initial-scale=1' />
          <link rel='icon' href='/favicon.ico' />
        </Head>

        <SAlgo />
      </>
    </>
  );
};

Page.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default Page;
