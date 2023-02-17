import Head from 'next/head';
import Navbar from '@c/Navbar';

const Project = () => {
  return (
    <>
      <Head>
        <title>projects</title>
        <meta
          name='description'
          content='List of projects from Magnus Zoeschinger'
        />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main>
        <Navbar />
      </main>
    </>
  );
};

export default Project;
