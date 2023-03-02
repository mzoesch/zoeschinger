import { useState } from 'react';

export default function MyPage() {
  const [backgroundColor, setBackgroundColor] = useState<string>('white');
  const [translate, setTranslate] = useState<string>('0%0%');

  function handleButtonClick() {
    setBackgroundColor('blue');
    setTranslate('0%35%');
  }

  return (
    <div style={{ translate }}>
      <h1>My Page</h1>
      <p>This is my page content.</p>
      <button onClick={handleButtonClick}>Change color to blue</button>
    </div>
  );
}
