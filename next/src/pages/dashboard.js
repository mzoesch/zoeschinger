import Head from 'next/head';
import Layout from '@c/layouts/stdLayout';
import Dashboard from '@c/Dashboard';

const Page = () => {
  return (
    <>
      <>
        <Head>
          <title>Dashboard - Zoeschinger</title>
          <meta name='description' content='Dashboard of Magnus Zoeschinger' />
          <meta name='viewport' content='width=device-width, initial-scale=1' />
          <link rel='icon' href='/favicon.ico' />
        </Head>

        <Dashboard />
      </>
    </>
  );
};

// TODO: Create different layout
// Page.getLayout = function getLayout(page) {
//   return <Layout>{page}</Layout>;
// };

export default Page;
