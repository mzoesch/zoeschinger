import Head from 'next/head';
import Layout from '@c/layouts/projectsLayout';
import SpaceInv from '@c/Projects/SpaceInv';

const Page = () => {
  return (
    <>
      <>
        <Head>
          <title>SpaceInv - Zoeschinger</title>
          <meta name='description' content='Projects of Magnus Zoeschinger' />
          <meta name='viewport' content='width=device-width, initial-scale=1' />
          <link rel='icon' href='/favicon.ico' />
        </Head>

        <SpaceInv />
      </>
    </>
  );
};

Page.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default Page;
