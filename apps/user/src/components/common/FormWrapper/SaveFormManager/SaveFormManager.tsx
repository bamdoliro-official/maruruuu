import { GED_SUBJECT_LIST, SUBJECT_LIST } from '@/constants/form/data';
import { useSaveFormQuery } from '@/services/form/queries';
import {
  useIsSaveFormLoadedStore,
  useSetFormStore,
  useSetGEDSubjectListStore,
  useSetNewGEDSubjectListStore,
  useSetSubjectListStore,
} from '@/stores';
import { updateSlicedSubjectList } from '@/utils';
import { useEffect } from 'react';

const SaveFormManager = () => {
  const { data: saveFormData } = useSaveFormQuery();
  const [isSaveFormLoaded, setIsSaveFormLoaded] = useIsSaveFormLoadedStore();
  const setForm = useSetFormStore();
  const setSubjectList = useSetSubjectListStore();
  const setGEDSubjectList = useSetGEDSubjectListStore();
  const setNewGEDSubjectList = useSetNewGEDSubjectListStore();

  useEffect(() => {
    if (!saveFormData || isSaveFormLoaded) return;

    const subjectList = saveFormData.grade.subjectList;
    const graduationType = saveFormData.education.graduationType;

    setForm((prev) => ({ ...prev, ...saveFormData }));

    if (subjectList) {
      if (graduationType === 'QUALIFICATION_EXAMINATION') {
        const GEDSubjectCount = GED_SUBJECT_LIST.length;

        setGEDSubjectList(updateSlicedSubjectList(subjectList, 0, GEDSubjectCount));
        setNewGEDSubjectList(updateSlicedSubjectList(subjectList, GEDSubjectCount));
      } else {
        setSubjectList(
          SUBJECT_LIST.map((subject, index) => {
            const savedSubject = subjectList.find(
              ({ subjectName }) => subjectName === subject.subjectName,
            );

            return savedSubject ? { ...savedSubject, id: index } : subject;
          }),
        );
      }
    }

    setIsSaveFormLoaded(true);
  }, [
    isSaveFormLoaded,
    saveFormData,
    setForm,
    setGEDSubjectList,
    setIsSaveFormLoaded,
    setNewGEDSubjectList,
    setSubjectList,
  ]);

  return null;
};

export default SaveFormManager;
