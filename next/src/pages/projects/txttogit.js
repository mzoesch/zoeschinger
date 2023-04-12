import Head from 'next/head';
import Layout from '@c/layouts/projectsLayout';
import TxtToGit from '@c/Projects/TxtToGit';

const Page = () => {
  return (
    <>
      <>
        <Head>
          <title>Text to Git - Zoeschinger</title>
          <meta name='description' content='Projects of Magnus Zoeschinger' />
          <meta name='viewport' content='width=device-width, initial-scale=1' />
          <link rel='icon' href='/favicon.ico' />
        </Head>

        <TxtToGit />
      </>
    </>
  );
};

Page.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default Page;
