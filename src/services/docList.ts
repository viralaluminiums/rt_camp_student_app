import axios from 'axios';

interface FrappeListParams {
  doc: string;
  filters?: string[][];
  limit_start?: number;
  fields?: string[];
  order_by?: string;
  limit?: number;
}

export const docList = async ({
  doc,
  filters,
  limit_start,
  fields,
  order_by,
  limit,
}: FrappeListParams) => {
  return (
    await axios.get(`/api/resource/${doc}`, {
      params: {
        ...(filters && {filters: JSON.stringify(filters)}),
        ...(limit_start && {limit_start: JSON.stringify(limit_start)}),
        ...(fields && {fields: JSON.stringify(fields)}),
        ...(order_by && {order_by: order_by}),
        ...(limit && {limit: JSON.stringify(limit)}),
      },
    })
  ).data;
};
