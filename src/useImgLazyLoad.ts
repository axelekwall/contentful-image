import { useState, useEffect, useCallback } from 'react';

const useImgLazyLoad = (url: string) => {
  const [loaded, setLoaded] = useState(false);
  const [preloaded, setPreloaded] = useState(false);
  const onLoaded = useCallback(() => {
    setLoaded(true);
  }, [setLoaded]);
  useEffect(() => {
    const lowImg = new Image();
    lowImg.src = url;
    lowImg.onload = () => {
      setPreloaded(true);
    };
  }, [url, setPreloaded]);
  return { loaded, preloaded, onLoaded };
};

export default useImgLazyLoad;
