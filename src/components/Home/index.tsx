import Head from 'next/head';
import Navbar from '@c/Navbar';

const Home = () => {
  return (
    <>
      <Head>
        <title>Home</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main>
        <Navbar />
        <div className='bg-green-400 dark:bg-green-800'>Hello World</div>
      </main>
    </>
  );
};

export default Home;
