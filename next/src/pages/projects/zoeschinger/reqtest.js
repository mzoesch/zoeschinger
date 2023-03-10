import Head from 'next/head';
import Layout from '@c/layouts/projectsLayout';
import ReqTest from '@c/ReqTest';

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

        <ReqTest />
      </>
    </>
  );
};

export default Page;
