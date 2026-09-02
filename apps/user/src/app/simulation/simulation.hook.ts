import { useFormValueStore } from '@/stores';
import { useState } from 'react';

export const useNavigationClick = () => {
  const form = useFormValueStore();
  const [currentStep, setCurrentStep] = useState('성적 입력');

  const handleMoveStep = (step: string) => {
    const qualificationExam =
      form.education.graduationType === 'QUALIFICATION_EXAMINATION';

    if (qualificationExam && step === '출결상황') {
      alert('검정고시 합격자는 출결상황 기본 점수가 부여돼요.');
      return;
    }
    setCurrentStep(step);
  };

  return { handleMoveStep, currentStep };
};
