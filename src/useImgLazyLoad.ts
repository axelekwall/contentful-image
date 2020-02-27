import { useState, useEffect, useCallback } from 'react';

const useImgLazyLoad = (url: string) => {
  const [loaded, setLoaded] = useState(false);
  const [preloaded, setPreloaded] = useState(false);
  useEffect(() => {
    const lowImg = new Image();
    lowImg.src = url;
    lowImg.onload = () => {
      setPreloaded(true);
    };
  }, [url, setPreloaded]);
  const onLoaded = useCallback(() => {
    setLoaded(true);
  }, [setLoaded]);
  return { loaded, preloaded, preloadedUrl: url, onLoaded };
};

export default useImgLazyLoad;
