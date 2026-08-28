import {
  INFORMATION_FIRST_GRADE_KEYS,
  INFORMATION_SUBJECT,
} from '@/constants/form/constants';
import { useSubjectListStore } from '@/stores';
import type { AchievementLevel, Subject } from '@/types/form/client';
import { useState } from 'react';

type InformationFirstGradeKey = (typeof INFORMATION_FIRST_GRADE_KEYS)[number];

export const useInformationFirstGrade = () => {
  const [subjectList, setSubjectList] = useSubjectListStore();
  const [isChecked, setIsChecked] = useState(false);

  const informationSubject = subjectList.find(
    ({ subjectName }) => subjectName === INFORMATION_SUBJECT,
  );

  // 임시저장을 불러와 1학년 성적이 채워진 경우에도 열린 상태로 보여준다.
  const hasFirstGradeScore = INFORMATION_FIRST_GRADE_KEYS.some((key) => {
    const achievementLevel = informationSubject?.[key];
    return achievementLevel !== undefined && achievementLevel !== '-';
  });

  const isOpen = isChecked || hasFirstGradeScore;

  const updateInformationSubject = (updatedSubject: Partial<Subject>) => {
    setSubjectList((prev) =>
      prev.map((subject) =>
        subject.subjectName === INFORMATION_SUBJECT
          ? { ...subject, ...updatedSubject }
          : subject,
      ),
    );
  };

  const handleToggleChange = () => {
    if (isOpen) {
      setIsChecked(false);
      updateInformationSubject({ achievementLevel11: '-', achievementLevel12: '-' });
      return;
    }

    setIsChecked(true);
  };

  const handleAchievementLevelChange = (data: string, name: string) => {
    const achievementLevel = (data === '미이수' ? 'F' : data) as AchievementLevel;

    updateInformationSubject({ [name as InformationFirstGradeKey]: achievementLevel });
  };

  return {
    isOpen,
    informationSubject,
    handleToggleChange,
    handleAchievementLevelChange,
  };
};
