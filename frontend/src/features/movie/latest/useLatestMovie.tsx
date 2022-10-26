import { useQuery } from 'react-query';
import { getData } from '../../../apis/feed';
import { AxiosError, AxiosResponse } from 'axios';

const useLatestMovie = () => {
    return useQuery<AxiosResponse<any>, AxiosError>('lastmovie', getData);
}

export default useLatestMovie