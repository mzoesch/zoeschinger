import Head from 'next/head';
import Layout from '@c/layouts/projectsLayout';
import Jafg from '@c/Projects/Jafg';

const Page = () => {
  return (
    <>
      <>
        <Head>
          <title>Jafg - Zoeschinger</title>
          <meta name='description' content='Projects of Magnus Zoeschinger' />
          <meta name='viewport' content='width=device-width, initial-scale=1' />
          <link rel='icon' href='/favicon.ico' />
        </Head>

        <Jafg />
      </>
    </>
  );
};

Page.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default Page;
