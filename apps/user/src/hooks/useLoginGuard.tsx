import { NeedLoginModal } from '@/components/common';
import { ROUTES } from '@/constants/common/constants';
import { useAuthState } from '@maru/hooks';
import { useOverlay } from '@toss/use-overlay';
import { useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';

const useLoginGuard = () => {
  const router = useRouter();
  const overlay = useOverlay();
  const { isLoggedIn } = useAuthState();
  const initialIsLoggedIn = useRef(isLoggedIn);

  useEffect(() => {
    if (!initialIsLoggedIn.current) {
      overlay.open(({ close, isOpen }) => (
        <NeedLoginModal
          isOpen={isOpen}
          onClose={() => {
            router.replace(ROUTES.MAIN);
            close();
          }}
          onConfirm={() => {
            router.replace(ROUTES.LOGIN);
            close();
          }}
        />
      ));
    }
  }, [overlay, router]);
};

export default useLoginGuard;
