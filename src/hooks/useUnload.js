import { useEffect, useRef } from 'react';

const useUnload = (callback) => {
  const cb = useRef(callback);

  useEffect(() => {
    cb.current = callback;
  }, [callback]);

  useEffect(() => {
    const handleUnload = () => cb.current();

    window.addEventListener('unload', handleUnload);

    return () => {
      window.removeEventListener('unload', handleUnload);
    };
  }, [callback]);
};

export default useUnload;
