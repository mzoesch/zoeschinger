import Head from 'next/head';
import Layout from '@c/layouts/projectsLayout';
import Zoeschinger from '@c/Projects/Zoeschinger';

const Page = () => {
  return (
    <>
      <>
        <Head>
          <title>Zoeschinger - Zoeschinger</title>
          <meta name='description' content='Projects of Magnus Zoeschinger' />
          <meta name='viewport' content='width=device-width, initial-scale=1' />
          <link rel='icon' href='/favicon.ico' />
        </Head>

        <Zoeschinger />
      </>
    </>
  );
};

Page.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default Page;
