import { color, font } from '@maru/design-system';
import { CheckBox, Dropdown, Td } from '@maru/ui';
import { flex } from '@maru/utils';
import styled from '@emotion/styled';
import { useInformationFirstGrade } from './InformationFirstGrade.hook';

interface InformationFirstGradeProps {
  achievementLevels: string[];
}

const SEMESTERS = [
  { key: 'achievementLevel11', label: '1학기' },
  { key: 'achievementLevel12', label: '2학기' },
] as const;

const InformationFirstGrade = ({ achievementLevels }: InformationFirstGradeProps) => {
  const { isOpen, informationSubject, handleToggleChange, handleAchievementLevelChange } =
    useInformationFirstGrade();

  const getDisplayValue = (achievementLevel?: string) => {
    if (achievementLevel === 'F') return '미이수';
    return achievementLevel ?? '-';
  };

  return (
    <>
      <ToggleFooter $isOpen={isOpen}>
        <ToggleLabel>
          <CheckBox checked={isOpen} onChange={handleToggleChange} />
          1학년에도 정보 교과 성적이 있어요
        </ToggleLabel>
      </ToggleFooter>
      {isOpen && (
        <SemesterRow>
          <Td styleType="SECONDARY" width="25%" height={64} borderBottomLeftRadius={12}>
            1학년 정보
          </Td>
          {SEMESTERS.map(({ key, label }, index) => (
            <Td
              key={key}
              width="37.5%"
              height={64}
              borderBottomRightRadius={index === SEMESTERS.length - 1 ? 12 : 0}
            >
              <Semester>
                <SemesterLabel>{label}</SemesterLabel>
                <Dropdown
                  value={getDisplayValue(informationSubject?.[key])}
                  size="SMALL"
                  data={achievementLevels}
                  width={80}
                  name={key}
                  onChange={handleAchievementLevelChange}
                />
              </Semester>
            </Td>
          ))}
        </SemesterRow>
      )}
    </>
  );
};

export default InformationFirstGrade;

const ToggleFooter = styled.div<{ $isOpen: boolean }>`
  ${flex({ alignItems: 'center', justifyContent: 'center' })}
  width: 100%;
  height: 64px;
  background-color: ${color.gray100};
  border: 1px dashed ${color.gray300};
  border-top: none;
  border-radius: ${(props) => (props.$isOpen ? '0' : '0px 0px 12px 12px')};
`;

const ToggleLabel = styled.label`
  ${flex({ alignItems: 'center' })}
  gap: 12px;
  color: ${color.gray900};
  ${font.H6}
  cursor: pointer;

  input {
    width: 22px;
    height: 22px;
  }
`;

const SemesterRow = styled.div`
  ${flex({ alignItems: 'center' })}
  width: 100%;
`;

const Semester = styled.div`
  ${flex({ alignItems: 'center' })}
  gap: 8px;
`;

const SemesterLabel = styled.p`
  color: ${color.gray700};
  ${font.p2}
`;
