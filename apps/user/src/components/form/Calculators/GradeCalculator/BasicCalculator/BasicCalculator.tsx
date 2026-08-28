import { flex } from '@maru/utils';
import styled from '@emotion/styled';
import BasicCalculatorHeader from './BasicCalculatorHeader/BasicCalculatorHeader';
import BasicCalculatorItem from './BasicCalculatorItem/BasicCalculatorItem';
import InformationFirstGrade from './InformationFirstGrade/InformationFirstGrade';
import { useSetFormStore, useSubjectListValueStore } from '@/stores';
import { useEffect } from 'react';

interface BasicCalculatorProps {
  subjectError?: boolean[];
}

const ACHIEVEMENT_LEVELS = ['미이수', 'A', 'B', 'C', 'D', 'E'];

const BasicCalculator = ({ subjectError }: BasicCalculatorProps) => {
  const subjectList = useSubjectListValueStore();
  const setForm = useSetFormStore();

  useEffect(() => {
    const studentSubjectList = subjectList.map(({ ...rest }) => rest);

    setForm((prev) => ({
      ...prev,
      grade: { ...prev.grade, subjectList: studentSubjectList },
    }));
  }, [setForm, subjectList]);

  return (
    <StyledBasicCalculator>
      <BasicCalculatorHeader />
      {subjectList.map(({ id }) => (
        <BasicCalculatorItem
          id={id}
          key={`subject ${id}`}
          achievementLevels={ACHIEVEMENT_LEVELS}
          isError={subjectError}
        />
      ))}
      <InformationFirstGrade achievementLevels={ACHIEVEMENT_LEVELS} />
    </StyledBasicCalculator>
  );
};

export default BasicCalculator;

const StyledBasicCalculator = styled.div`
  ${flex({ flexDirection: 'column' })};
  width: 100%;
  height: 100%;
`;
