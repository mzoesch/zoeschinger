import Head from 'next/head';
import Layout from '@c/layouts/check24hcLayout';
import Demo from '@c/Projects/Check24hc/OfferInformationView';

const Page = () => {
  return (
    <>
      <Head>
        <title>Check 24 Holiday Challenge Demo - Zoeschinger</title>
        <meta
          name='description'
          content='Check 24 Holiday Challenge Demo from Magnus Zoeschinger'
        />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
        <Demo />
        <div style={{ marginTop: '9rem' }}></div>
      </div>
    </>
  );
};

Page.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default Page;
