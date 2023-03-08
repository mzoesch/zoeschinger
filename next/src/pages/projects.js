import Head from 'next/head';
import Layout from '@c/layouts/stdLayout';
import Projects from '@c/Projects';

const Page = () => {
  return (
    <>
      <>
        <Head>
          <title>zoeschingers projects</title>
          <meta name='description' content='Projects of Magnus Zoeschinger' />
          <meta name='viewport' content='width=device-width, initial-scale=1' />
          <link rel='icon' href='/favicon.ico' />
        </Head>

        <Projects />
      </>
    </>
  );
};

Page.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default Page;
