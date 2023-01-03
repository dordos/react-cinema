import { useCallback, useState } from 'react';

const useInput = (inputData: any) => {
  const [value, setValue] = useState(inputData);

  const handler = useCallback((e: any) => {
    setValue(e.target.value);
  }, []);

  return [value, handler, setValue];
};

export default useInput;
