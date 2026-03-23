import { maruAdmin } from '@/apis/instance/instance';
import { authorization } from '@/apis/token';
import type {
  PostSendMessageByStatusRequest,
  PostSendMessageByTypeRequest,
  PostSendMessageToAllRequest,
} from '@/types/message/remote';

export const postMessageByStatus = async (params: PostSendMessageByStatusRequest) => {
  const { data } = await maruAdmin.post('/messages/status', params, authorization());
  return data;
};

export const postMessageByType = async (params: PostSendMessageByTypeRequest) => {
  const { data } = await maruAdmin.post('/messages/type', params, authorization());
  return data;
};

export const postMessageToAll = async (params: PostSendMessageToAllRequest) => {
  const { data } = await maruAdmin.post('/messages/all', params, authorization());
  return data;
};
