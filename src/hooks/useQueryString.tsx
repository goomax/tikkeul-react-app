import { QueryParamKey } from '@/constants/key';
import { useSearchParams } from 'react-router-dom';

const useQueryString = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const getParams = (key: QueryParamKey) => searchParams.get(key);

  const addParams = (key: QueryParamKey, value: string) => {
    searchParams.append(key, value);
    setSearchParams(searchParams);
  };

  const setParams = (key: QueryParamKey, value: string) => {
    searchParams.set(key, value);
    setSearchParams(searchParams);
  };

  const deleteAllParams = () => {
    setSearchParams('');
  };

  return {
    getParams,
    addParams,
    setParams,
    deleteAllParams,
    searchParams,
  };
};

export default useQueryString;
