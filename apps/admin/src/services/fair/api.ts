import { maruAdmin } from '@/apis/instance/instance';
import { authorization } from '@/apis/token';
import type { Fair } from '@/types/fair/client';
import type { GetFairListRes, GetFairDetailRes } from '@/types/fair/remote';

export const getFairList = async () => {
  const { data } = await maruAdmin.get<GetFairListRes>(`/fairs`);

  return data;
};

export const getFairDetail = async (id: number) => {
  const { data } = await maruAdmin.get<GetFairDetailRes>(`/fairs/${id}`, authorization());

  return data;
};

export const getFairExportExcel = async (id: number) => {
  const { data } = await maruAdmin.get(`/fair/${id}/export`, {
    ...authorization(),
    responseType: 'blob',
  });

  return data;
};

export const postFairReq = async (fairData: Fair) => {
  const { data } = await maruAdmin.post(`/fairs`, fairData, authorization());

  return data;
};
