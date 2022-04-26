import { useEffect } from 'react';

export const useBeforeunload = (callback) => {
  useEffect(() => {
    const handleBeforeunload = (e) => {
      e.preventDefault();
      e.returnValue = '';
      callback();
    };

    window.addEventListener('beforeunload', handleBeforeunload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeunload);
    };
  }, [callback]);
};
