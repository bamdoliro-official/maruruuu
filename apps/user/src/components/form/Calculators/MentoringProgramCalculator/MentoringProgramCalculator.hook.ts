import { useSetFormStore } from '@/stores';
import type { ChangeEventHandler } from 'react';

export const useInput = () => {
  const setForm = useSetFormStore();

  const handleMentoringProgramChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { checked } = e.target;

    setForm((prev) => ({
      ...prev,
      grade: {
        ...prev.grade,
        mentoringProgram: checked,
      },
    }));
  };

  return { handleMentoringProgramChange };
};
