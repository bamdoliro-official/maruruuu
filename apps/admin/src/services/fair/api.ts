import { maru, maruAdmin } from '@/apis/instance/instance';
import type { Fair } from '@/types/fair/client';
import type { GetFairListRes, GetFairDetailRes } from '@/types/fair/remote';

export const getFairList = async () => {
  const { data } = await maru.get<GetFairListRes>(`/fairs`);

  return data;
};

export const getFairDetail = async (id: number) => {
  const { data } = await maruAdmin.get<GetFairDetailRes>(`/fairs/${id}`);

  return data;
};

export const getFairExportExcel = async (id: number) => {
  const { data } = await maruAdmin.get(`/fairs/${id}/export`, {
    responseType: 'blob',
  });

  return data;
};

export const postFairReq = async (fairData: Fair) => {
  const { data } = await maruAdmin.post(`/fairs`, fairData);

  return data;
};
