const Home = () => {
  return (
    <>
      <div className='relative flex min-h-screen justify-center items-center bg-gray-900'>
        <div
          aria-hidden='true'
          className='absolute inset-y-16 inset-x-0 w-16 rounded-full rotate-45 bg-gradient-to-b from-pink-500 to-purple-600 blur-3xl mx-auto scale-y-150 opacity-75'
        />
        <h1 className='relative text-9xl font-bold text-white'>Home Page</h1>
      </div>
    </>
  );
};

export default Home;
