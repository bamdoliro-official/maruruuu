import Provider from '@/components/Provider';
import GoogleAnalytics from '@/lib/GoogleAnalytics';
import StyledComponentRegistry from '@/lib/registry';
import QueryClientProvider from '@/services/QueryClientProvider';
import { cookies } from 'next/headers';
import type { ReactNode } from 'react';

export const metadata = {
  title: '부산소프트웨어마이스터고 입학전형 | 마루',
  description: '부산소프트웨어마이스터고등학교 입학전형 시스템 마루입니다.',
};

interface Props {
  children: ReactNode;
}

const RootLayout = ({ children }: Props) => {
  const cookieStore = cookies();
  const initialLoggedIn =
    cookieStore.has('accessToken') || cookieStore.has('refreshToken');

  return (
    <html lang="ko">
      <body>
        {process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS ? (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS} />
        ) : null}
        <StyledComponentRegistry>
          <QueryClientProvider>
            <Provider initialLoggedIn={initialLoggedIn}>{children}</Provider>
          </QueryClientProvider>
        </StyledComponentRegistry>
      </body>
    </html>
  );
};

export default RootLayout;
