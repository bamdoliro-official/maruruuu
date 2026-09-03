import { useSaveFormMutation } from '@/services/form/mutations';
import { useFormValueStore, useSetFormGradeStepStore } from '@/stores';
import { useFormStep } from '@/utils';

export const useCTAButton = () => {
  const form = useFormValueStore();
  const setFormGradeStep = useSetFormGradeStepStore();
  const { saveFormMutate } = useSaveFormMutation();
  const { run: FormStep } = useFormStep();

  const handleNextStep = () => {
    FormStep({
      nextStep: '자기소개서',
    });
  };

  const handlePreviousStep = () => {
    setFormGradeStep('봉사시간');
    saveFormMutate(form);
  };

  return { handleNextStep, handlePreviousStep };
};
