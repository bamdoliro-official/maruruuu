import { useSaveFormMutation } from '@/services/form/mutations';
import { useFormValueStore, useSetFormGradeStepStore } from '@/stores';

export const useCTAButton = () => {
  const form = useFormValueStore();
  const setFormGradeStep = useSetFormGradeStepStore();
  const { saveFormMutate } = useSaveFormMutation();

  const handleNextStep = () => {
    setFormGradeStep('가산점');
    saveFormMutate(form);
  };

  const handlePreviousStep = () => {
    setFormGradeStep('출결상황');
    saveFormMutate(form);
  };

  return { handleNextStep, handlePreviousStep };
};
