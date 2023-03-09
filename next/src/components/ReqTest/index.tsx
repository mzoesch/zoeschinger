const getServerJSON = async () => {
  const ip = process.env.PRIVATE_API_ADDRESS;
  const api = ip + 'api/v1/users';
  console.log(api);

  const res = await fetch('https://jsonplaceholder.typicode.com/posts');
  const json = await res.json();

  return json[0].body;
};

const ReqTest = () => {
  const handlePOST = () => {
    console.log('POST');
  };

  const handleGET = () => {
    getServerJSON().then((json) => {
      console.log(json);
    });
  };

  return (
    <>
      <div>
        <button onClick={handlePOST}>POST</button>
        <button onClick={handleGET}>GET</button>
      </div>
    </>
  );
};

export default ReqTest;
