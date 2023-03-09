const getServerJSON = async () => {
  const res = await fetch('http://localhost:8000/api/v1/users');
  const json = await res.json();

  return json[0].first_name;
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
