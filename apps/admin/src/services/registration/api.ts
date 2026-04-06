import { maruAdmin } from '@/apis/instance/instance';
import type { GetFormListRes } from '@/types/form/remote';
import type { GetRegistrationListRes } from '@/types/registration/remote';

export const getRegistrationList = async () => {
  const { data } = await maruAdmin.get<GetFormListRes>('forms?status=PASSED');

  const idList = data.dataList.map((item) => item.id).join(',');
  const encodedIdList = encodeURIComponent(idList);

  const { data: returnData } = await maruAdmin.get<GetRegistrationListRes>(
    `/forms/admission-and-pledges?id-list=${encodedIdList}`,
  );

  return returnData;
};
