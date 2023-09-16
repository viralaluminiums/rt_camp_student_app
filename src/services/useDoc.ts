import axios from 'axios';

export const useDoc = async (doc: string, docName: string) => {
  return (await axios.get(`/api/resource/${doc}/${docName}`)).data;
};
