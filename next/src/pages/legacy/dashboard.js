import Head from 'next/head';
import Layout from '@c/layouts/stdLayout';
// import Dashboard from '@c/Dashboard';
import DashboardDesktop from '@c/Dashboard/legacy/DashboardDesktop';
import DashboardMobile from '@c/Dashboard/legacy/DashboardMobile';
import { useEffect, useState } from 'react';

const Page = () => {
  const [mediaQuery, setMediaQuery] = useState(null);

  useEffect(() => {
    const CheckMediaQuery = () => {
      const mediaQuery = window.matchMedia('(max-width: 640px)');
      setMediaQuery(mediaQuery.matches);
    };

    CheckMediaQuery();

    window.addEventListener('resize', CheckMediaQuery);

    return () => {
      window.removeEventListener('resize', CheckMediaQuery);
    };
  }, []);

  return (
    <>
      <>
        <Head>
          <title>Dashboard - Zoeschinger</title>
          <meta name='description' content='Dashboard of Magnus Zoeschinger' />
          <meta name='viewport' content='width=device-width, initial-scale=1' />
          <link rel='icon' href='/favicon.ico' />
        </Head>

        {mediaQuery ? <DashboardMobile /> : <DashboardDesktop />}
      </>
    </>
  );
};

// TODO: Create different layout
// Page.getLayout = function getLayout(page) {
//   return <Layout>{page}</Layout>;
// };

export default Page;
