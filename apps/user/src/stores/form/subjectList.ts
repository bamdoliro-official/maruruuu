import { SUBJECT_LIST } from '@/constants/form/data';
import type { Subject } from '@/types/form/client';
import { atom, useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

const subjectListAtomState = atom<Subject[]>({
  key: 'subject-list',
  default: SUBJECT_LIST,
});

export const useSubjectListStore = () => useRecoilState(subjectListAtomState);
export const useSubjectListValueStore = () => useRecoilValue(subjectListAtomState);
export const useSetSubjectListStore = () => useSetRecoilState(subjectListAtomState);
