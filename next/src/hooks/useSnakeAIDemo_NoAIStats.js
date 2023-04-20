import { useEffect, useState } from 'react';

const LOCAL_STORAGE_KEY = 'snake-ai-demo-noai-stats-highscore';

const useSnakeAIDemo_NoAIStats = (initialValue) => {
  const [newScore, setNewScore] = useState(() => {
    try {
      const item = window.localStorage.getItem(LOCAL_STORAGE_KEY);

      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });
  const [highScore, setHighScore] = useState(initialValue);

  const setPotentialNewHighScore = (value) => {
    setNewScore(value);

    return;
  };

  useEffect(() => {
    if (newScore > highScore) setHighScore(newScore);
    return;

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newScore]);

  useEffect(() => {
    try {
      window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(highScore));
    } catch (error) {
      console.log(error);
    }

    return;
  }, [highScore]);

  return [highScore, setPotentialNewHighScore];
};

export default useSnakeAIDemo_NoAIStats;
