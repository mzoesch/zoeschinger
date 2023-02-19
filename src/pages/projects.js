import Head from 'next/head';
import Layout from '@c/layouts/stdLayout';
import Projects from '@c/Projects';

const Project = () => {
  return (
    <>
      <Head>
        <title>zoeschinger projects</title>
        <meta
          name='description'
          content='List of projects from Magnus Zoeschinger'
        />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Projects />
    </>
  );
};

Project.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default Project;
