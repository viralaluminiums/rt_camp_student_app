import axios from 'axios';
import {Params} from '../types/index';

export const useMethodService = async (
  method: string,
  params?: Params | FormData | any
) => {
  if (params) {
    return await axios.post(`/api/method/${method}`, params);
  }

  return await axios.get(`/api/method/${method}`);
};
